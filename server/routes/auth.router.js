const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const authValidator = require('../controllers/validators/loginValidator')

router.route('/').post(authValidator ,authController.local_auth);

module.exports = router;
