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
    const users = await User.find({ username: username });
    if (users.length === 0) {
        return -1;
    } else {
        const { username, displayName, profilePic } = users[0];
        const user = { username, displayName, profilePic };
        return user;
    }
}

module.exports = { createUser, getUserByUsername }