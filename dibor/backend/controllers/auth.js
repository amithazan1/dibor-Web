const authService = require("../services/auth");
const jwtUtils = require("../utils/generateToken");

const signUp = async (req, res) => {
  try {
    const user = await authService.signUp(
      req.body.username,
      req.body.displayName,
      req.body.password,
      req.body.profilePic
    );

    // Set JWT cookie
    jwtUtils.generateTokenAndSetCookie(user, res);

    // Return user data with 201 status
    return res.status(201).json(user);
  } catch (error) {
    const statusCode = error.message === "Username already exists" ? 400 : 500;
    return res.status(statusCode).json({ errors: [error.message] });
  }
};

const login = async (req, res) => {
  try {
    const user = await authService.login(req.body.username, req.body.password);
    // Generate JWT and set it in a cookie
    jwtUtils.generateTokenAndSetCookie(user, res);

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(401).json({ errors: [error.message] });
  }
};

const logout = (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Expire the cookie immediately
    sameSite: "strict",
  });

  res.json({ message: "Logged out successfully" });
};

module.exports = { signUp, login, logout };
