const userService = require('../services/form')

const createUser = async (req, res) => {
    const user = await userService.createUser(req.body.username,
        req.body.password,
        req.body.displayName,
        req.body.profilePic);
    if (user === -1) {
        return res.status(409).json({ errors: ['Username already exists'] })
    }
    else {
        res.json(user)
    }
}

const getUserByUsername = async (req, res) => {
    const user = await userService.getUserByUsername(req.params.username);
    if (user == -1) {
        res.status(400).json({ errors: ['Username does not exists'] });
    }
    else {
        res.status(200).send(user);
    }
}


module.exports = { createUser, getUserByUsername }