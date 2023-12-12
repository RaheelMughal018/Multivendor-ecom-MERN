const app = require("./app");
const connectDatabase = require("./db/Database");
const { cyan, red } = require("colors");
//handling uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(red(`Shutting down the server for handling uncaught exception`));
});

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/.env" });
}

// connect Database
connectDatabase();
//create server
const server = app.listen(process.env.PORT, () => {
  console.log(
    `Server is running on port ${cyan(`http://localhost:${process.env.PORT}`)}`
  );
});

//unhandle promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(red(`Shutting down the server for unhandle promise rejection`));

  server.close(() => {
    process.exit(1);
  });
});
