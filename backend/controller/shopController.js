const express = require("express");
const path = require("path");
const fs = require("fs");
const { upload } = require("../multer");
const router = express.Router();
const sendMail = require("../utils/sendMail");
const jwt = require("jsonwebtoken");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middlewares/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shopModel");
const catchAsyncError = require("../middlewares/catchAsyncError");
const { log } = require("console");

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email, phoneNumber, zipCode, avatar, address, password, name } =
      req.body;
    console.log(
      "🚀 ~ file: shopController.js:73 ~ router.post ~ req.body:",
      req.body
    );
    const isEmailExsist = await Shop.findOne({ email });

    if (isEmailExsist) {
      const filename = req.file.filename;
      const filepath = `upload/${filename}`;

      fs.unlink(filepath, (err) => {
        console.log("Shop Error:", err);
        res.status(500).json({ message: "Error deleting file" });
      });
      return next(new ErrorHandler("Seller already exists", 400));
    }

    const filename = req.file.filename;
    const fileUrl = path.join(filename);

    const shop = {
      name,
      email,
      password,
      avatar: {
        public_id: "this is sample id",
        url: fileUrl,
      },
      phoneNumber,
      zipCode,
      address,
    };

    // Only send activation email if user does not exist
    const activationToken = createActivationToken(shop);

    const activationUrl = `http://localhost:3000/seller/activation/${activationToken}`;
    console.log("Go to Activation Route");

    try {
      await sendMail({
        email: shop.email,
        subject: "Activate your Shop",
        message: `Hello ${shop.name}, please click on the link to activate your account: ${activationUrl}`,
      });

      res.status(201).json({
        status: "success",
        message: `Please check your email: ${shop.email} to activate your shop!`,
        activation_token: activationToken,
      });
    } catch (error) {
      console.log("Send Mail Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (err) {
    console.log("Create Shop Error:", err.message);
    return next(new ErrorHandler(err.message, 400));
  }
});

//create activation token
const createActivationToken = (shop) => {
  const activationToken = jwt.sign(shop, process.env.JWT_SECRET_KEY, {
    expiresIn: "10m",
  });

  return activationToken;
};
//activate user
router.post(
  "/activation",
  catchAsyncError(async (req, res, next) => {
    console.log("inside activation route");
    try {
      const { activation_token } = req.body;
      console.log("activation token: ", req.body);

      const newShop = jwt.verify(activation_token, process.env.JWT_SECRET_KEY);
      console.log(
        "🚀 ~ file: shopController.js:98 ~ catchAsyncError ~ newShop:",
        newShop
      );

      if (!newShop) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newShop;
      console.log(
        "🚀 ~ file: shopController.js:124 ~ catchAsyncError ~ newShop:",
        newShop
      );

      let exists = await Shop.findOne({ email });

      if (exists) {
        return next(new ErrorHandler("Seller already exists", 400));
      }

      const shop = await Shop.create({
        name,
        email,
        password,
        avatar,
        zipCode,
        address,
        phoneNumber,
      });
      console.log(
        "🚀 ~ file: shopController.js:118 ~ catchAsyncError ~ shop:",
        shop
      );

      sendToken(shop, 201, res);
    } catch (error) {
      console.log("Activation Error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
