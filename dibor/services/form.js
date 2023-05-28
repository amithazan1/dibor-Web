const User = require('../models/form')

const createUser = async (username, password, displayName, profilePic) => {
    try {
        const users = await User.find({ username: username });

        if (users.length === 0) {
            const user = new User({ username, password, displayName, profilePic });
            return await user.save();
        } else {
            return -1;
        }
    } catch (error) {
        console.error('Error occurred while finding user:', error);
    }
}

const getUserByUsername = async (username) => {
    return await User.find({ username: username });
}

module.exports = { createUser, getUserByUsername }