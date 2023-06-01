const tokenService = require('../services/token')
const jwt = require("jsonwebtoken");
const { key } = require('./authorization');



const login = async (req, res) => {
    const userExist = await tokenService.login(req.body.username, req.body.password);
    if (userExist) {
        // Generate the token.
        const data = { UserName: req.body.username }
        const token = jwt.sign(data, key)
        // Return the token to the browser
        res.status(201).send(token);
    }
    else
        res.status(404).json({ errors: ['wrong username or password'] });
};


module.exports = { login };