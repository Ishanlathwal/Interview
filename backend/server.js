const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, ".env") });

const app = require("./app.js");
const cloudinary = require("cloudinary");

// Db connection
const connectDatabase = require("./Configuration/database.js");

// photo upload
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//config connection for server
const server = app.listen(process.env.PORT, () =>
  console.log(`app is running on port${process.env.PORT}`)
);
//// final error catching
process.on("unhandledRejection", (err) => {
  console.log(err.stack);
  console.log("Unhandled Rejection Async Method");

  server.close(() => {
    process.exit(1);
  });
});
