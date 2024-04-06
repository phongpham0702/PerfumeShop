const express = require('express');
const router = express.Router();

const brandController = require('../controllers/BrandsController');

router.route('/').get(brandController.getAllBrands);

router.route('/:bid').get(brandController.getBrandProducts);

module.exports = router;
