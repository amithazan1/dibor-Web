const jwt = require("jsonwebtoken");

const generateTokenAndSetCookie = (user, res) => {
  // Generate JWT token
  const token = jwt.sign(
    { userId: user._id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "15d",
    }
  );

  // Set the JWT token in a cookie
  res.cookie("token", token, {
    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
    sameSite: "strict",
    maxAge: 15 * 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === "production",
  });
};

module.exports = { generateTokenAndSetCookie };
