const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller')
const {errorHandler} = require("../helpers/error_handler")

router.route('/').get(errorHandler(productController.getAllBrand));

module.exports = router;
