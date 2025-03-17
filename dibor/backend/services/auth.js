const User = require("../models/user");
const bcrypt = require("bcrypt");

const signUp = async (username, displayName, password, profilePic) => {
  // Check if this user already exists
  const isExist = await User.findOne({ username }).lean();

  if (isExist) {
    // If user exists, return error
    throw new Error("Username already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create and save new user
  const user = new User({
    username,
    displayName,
    password: hashedPassword,
    profilePic,
  });
  return await user.save();
};

const login = async (username, password) => {
  const user = await User.findOne({ username });
  //if the user don't exists in the database.
  if (!user) {
    throw new Error("Invalid username or password");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new Error("Invalid username or password");
  }
  return user;
};

module.exports = { login, signUp };
