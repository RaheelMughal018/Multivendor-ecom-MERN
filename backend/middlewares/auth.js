const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncError = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  // grab token from cookie
  const { token } = req.cookies;

  //token isn't available
  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }
  //verify token
  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = await User.findById(decodedData.id);
  // console.log("User is Authenticated");
  next();
});
