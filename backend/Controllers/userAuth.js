const cloudinary = require("cloudinary");
const User = require("../Schema/userSchema");
const sendJwtToken = require("../utils/SendJwtToken");
const catchAsyncError = require("../utils/Error-Handeling/Catch_Async-Errors");
const AppError = require("../utils/Error-Handeling/Error-Handeling_Class");

// 1)signup
exports.registerUserMain = catchAsyncError(async (req, res, next) => {
  const { name, email, password, confirmPassword, avatar } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  let avatarData;

  if (avatar) {
    try {
      const uploaded = await cloudinary.v2.uploader.upload(avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      avatarData = {
        public_id: uploaded.public_id,
        url: uploaded.secure_url,
      };
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Cloudinary upload failed.", error: err.message });
    }
  } else {
    // Use default avatar (already uploaded to Cloudinary)
    avatarData = {
      public_id: "Profile_f1oysk",
      url: "https://res.cloudinary.com/dgrokfyqp/image/upload/v1751519583/Profile_f1oysk.png",
    };
  }
  const user = await User.create({
    name,
    email,
    password,
    confirmPassword,
    avatar: avatarData,
  });
  sendJwtToken(user, 201, res);
});

// login
exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please enter email and password", 404));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new AppError("Incorrect email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new AppError("Incorrect email or password", 401));
  }

  sendJwtToken(user, 200, res);
});

// logout

exports.logoutUser = (req, res) => {
  res.cookie("jwt", null, {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

// get user details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});
