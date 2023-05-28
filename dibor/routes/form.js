const userController = require('../controllers/form');
const express = require('express');
var router = express.Router();

router.route('/')
    .post(userController.createUser);

router.route('/:username')
    .get(userController.getUserByUsername)


module.exports = router;