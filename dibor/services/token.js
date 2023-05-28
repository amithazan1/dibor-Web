const User = require('../models/form')

const login = async (username, password) => {
    try {
        const user = await User.find({ username: username, password: password });
        //if the user exists in the database.
        if (user.length !== 0) {
            return true;
        } else {
            return false;
            
        }
    } catch (error) {
        console.error('Error occurred while finding user:', error);
    }
}

module.exports = {login};