const express = require('express');
const router = express.Router();

const {errorHandler} = require("../helpers/error_handler");
const adminController = require('../controllers/admin.controller');
const uploadUtil = require('../utils/upload.util');
const multer  = require('multer')
const upload = multer({ storage: multer.memoryStorage() });

router.get('/', function(req, res, next) {
  return res.status(200).json({"Message":"Nothing here!"})
});

router.route('/login')
.post( errorHandler(adminController.AdminAuthenticate))

router.route('/product/create')
.post(upload.single('productTh'),errorHandler(adminController.CreateNewProduct))

router.route('/product/:page')
.get(errorHandler(adminController.GetAllProducts))

router.route('/product/detail/:pid')
.get(errorHandler(adminController.GetProductDetail))

module.exports = router;
