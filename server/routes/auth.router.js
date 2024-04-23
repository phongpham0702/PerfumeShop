const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');
const authValidator = require('../controllers/validators/loginValidator')
const {errorHandler} = require("../helpers/error_handler")

router.route('/').post(authValidator , errorHandler(authController.local_login));

module.exports = router;
