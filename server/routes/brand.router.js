const express = require('express');
const router = express.Router();

const brandController = require('../controllers/brand.controller');
const {errorHandler} = require("../helpers/error_handler")

router.route('/').get(errorHandler(brandController.getBrands));

module.exports = router;
