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

// create user
router.post("/create-user", upload.single("file"), async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      console.log("User with email already exists:", email);

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

    console.log("Creating user:", name, email);

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

      console.log("Activation email sent to:", user.email);

      res.status(201).json({
        status: "success",
        message: `Please check your email: ${user.email} to activate your account!`,
        activation_token: activationToken,
      });
    } catch (error) {
      console.error("Error sending activation email:", error.message);
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return next(new ErrorHandler(error.message, 400));
  }
});

const createActivationToken = (user) => {
  const activationToken = jwt.sign(user, process.env.ACTIVATION_SECRET, {
    expiresIn: "10m",
  });
  console.log("Activation token:", activationToken);
  console.log("Activation secret:", process.env.ACTIVATION_SECRET);
  return activationToken;
};

//activate user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      console.log("Received activation token:", activation_token);

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );
      console.log(
        "🚀 ~ file: userController.js:96 ~ catchAsyncError ~ activation_token,:",
        activation_token
      );

      if (!newUser) {
        console.log("Invalid activation token:", activation_token);
        return next(new ErrorHandler("Invalid token", 400));
      }
      const { name, email, password, avatar } = newUser;
      console.log("Activating user:", name, email);
      let user = await User.findOne({ email });
      if (user) {
        console.log("User already exists during activation:", email);
        return next(new ErrorHandler("User already exsist", 400));
      }
      user = await User.create({
        name,
        password,
        email,
        avatar,
      });
      console.log("User activated and created in the database:", user);

      sendToken(user, 201, res);
    } catch (error) {
      console.error("Error activating user:", error.message);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
