const express = require('express');
const router = express.Router();

const brandController = require('../controllers/BrandsController');

router.route('/').get(brandController.getAllBrands);

module.exports = router;
