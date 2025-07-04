const sendJwtToken = (user, statusCode, res) => {
  const token = user.generateJWT();
  const isProd = process.env.NODE_ENV === "production";
  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),

    secure: isProd,
    httpOnly: true,
    sameSite: isProd ? "None" : "Lax",
  };

  user.password = undefined;

  res.status(statusCode).cookie("jwt", token, options).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendJwtToken;
