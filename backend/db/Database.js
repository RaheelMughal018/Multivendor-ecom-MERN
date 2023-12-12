const mongoose = require("mongoose");
const { green } = require("colors");
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(
        green(`MongoDB connected with server: ${data.connection.host}`)
      );
    });
};

module.exports = connectDatabase;
