const User = require("../models/user");

const getAllUsers = async () => {
  return await User.find({}, "displayName profilePic"); // Fetch specific fields only
};

module.exports = { getAllUsers };
