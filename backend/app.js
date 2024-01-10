const express = require("express");
const ErrorMiddleWare = require("./middlewares/error.js");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use("/", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//imports
const user = require("./controller/userController");
const shop = require("./controller/shopController.js");

app.use("/api/v2/user", user);
app.use("/api/v2/shop", shop);

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}
// error handler
app.use(ErrorMiddleWare);
module.exports = app;
