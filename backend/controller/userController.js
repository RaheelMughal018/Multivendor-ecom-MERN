const express = require("express");
const path = require("path");
const User = require("../model/userModel");
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const fs = require("fs");
const router = express.Router();
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middlewares/auth");

// create user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      const filename = req.file.filename;
      const filePath = `uploads/${filename}`;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.log("Error deleting file:", err);
          res.status(500).json({
            message: "Error deleting file",
          });
        } else {
          res.json({ message: "File deleted successfully" });
        }
      });
      return next(new ErrorHandler("User already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);
    const user = {
      name: name,
      email: email,
      password: password,
      avatar: {
        public_id: "this is sample id",
        url: fileUrl,
      },
    };

    // Only send activation email if user does not exist
    const activationToken = createActivationToken(user);
    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });

      res.status(201).json({
        status: "success",
        message: `Please check your email: ${user.email} to activate your account!`,
        activation_token: activationToken,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

const createActivationToken = (user) => {
  const activationToken = jwt.sign(user, process.env.JWT_SECRET_KEY, {
    expiresIn: "10m",
  });

  return activationToken;
};

//activate user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(activation_token, process.env.JWT_SECRET_KEY);

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });
      if (user) {
        return next(new ErrorHandler("User already exsist", 400));
      }
      user = await User.create({
        name,
        password,
        email,
        avatar,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
router.post(
  "/login-user",
  catchAsyncError(async (req, res, next) => {
    try {
      // get data from user
      const { email, password } = req.body;

      // require all fields
      if (!(email && password)) {
        return next(new ErrorHandler("Please enter email and password!", 400));
      }
      // find user in DB
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User already exsist!", 400));
      }
      // validation of password
      const isPasswordMatched = await user.comparePasswords(password);

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Incorrect Credentials", 400));
      }

      sendToken(user, 200, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/get-user",
  isAuthenticated,
  catchAsyncError(async (req, res, next) => {
    try {
      // find user in DB
      const user = await User.findById(req.user.id);

      //user doesn't exsist
      if (!user) {
        return next(new ErrorHandler("User doesn't exsist!", 400));
      }
      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
