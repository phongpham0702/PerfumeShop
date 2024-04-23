const express = require('express');
const router = express.Router();

//const brandController = require('../controllers/brand.controller');
const {errorHandler} = require("../helpers/error_handler")

//router.route('/').get(errorHandler(brandController.getBrands));

router.get('/', async function (req, res, next) {

    return res.status(200).json({ Message: 'Này đang update rồi :)))' });
});

module.exports = router;
