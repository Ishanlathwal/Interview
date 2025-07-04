const express = require("express");

const globalErrorHAndler = require("./utils/Error-Handeling/Error-Controller.js");
const AppError = require("./utils/Error-Handeling/Error-Handeling_Class.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

///////////////////////////////////////////////
// Uncaught exceptions Error handling
process.on("uncaughtException", (err) => {
  console.log(err);
  console.log("Uncaught Exception Sync Method");

  process.exit(1);
});

const app = express();
app.set("query parser", "extended");

// app.use(cors());
const allowedOrigins = [
  "http://localhost:5173",
  "https://interview-fjkj.onrender.com",
  "http://localhost:3000",
  "http://localhost:3000/api/v1",
];
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookieParser());

// profile pic
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

console.log(__dirname);
// route imports
const userRoute = require("./Routes/userRoutes.js");

app.use("/api/v1", userRoute);

// To run both front end and backend using one server
app.use(express.static(path.join(__dirname, "../frontend/dist")));

app.get("/{*any}", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

// 1) invalid url

app.all("/{*any}", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// 2) Global error handler
app.use(globalErrorHAndler);
module.exports = app;
