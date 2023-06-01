
const userController = require('../controllers/form');
const authorization = require('../controllers/authorization');
const express = require('express');
var router = express.Router();

router.route('/')
    .post(userController.createUser);

router.route('/:username')
    .get(authorization.verifyToken,userController.getUserByUsername)


module.exports = router;