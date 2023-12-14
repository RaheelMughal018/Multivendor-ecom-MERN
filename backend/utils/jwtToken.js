// create  token and saving it in cookies

const sendToken = (user, statusCode, res) => {
  const token = user.getJwtToken();

  // options for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  res.status(statusCode).cookie("token", token, options).json({
    success: "true",
    user,
  });
};

module.exports = sendToken;
