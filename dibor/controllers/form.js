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
    res.json(await userService.getUserByUsername(req.params.username))
}


module.exports = { createUser, getUserByUsername }