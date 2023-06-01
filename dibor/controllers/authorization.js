const jwt = require("jsonwebtoken");
const key = "shhhhhhhhhhhhhhhhh!!!!!";

// Middleware function to verify the token
const verifyToken = (req, res, next) => {
    // If the request has an authorization header
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }
    // Verify the token is valid
    jwt.verify(token, key, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token.' });
        }

        // Attach the decoded user information to the request object
        req.user = decoded;
        return next();
    });
};

module.exports = {verifyToken, key};