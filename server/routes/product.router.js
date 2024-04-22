const express = require('express');
const router = express.Router();
const productController =   require("../controllers/products.controller")
const {errorHandler} = require("../helpers/error_handler")

router.route("/bestseller")
.get(errorHandler(productController.getBestSeller))

router.route("/newarrival")
.get(errorHandler(productController.getNewArrival))

router.route("/detail/:pid")
.get(errorHandler(productController.getProductDetail))

router.route("/search/:value")
.get(errorHandler(productController.searchProduct))

router.route("/:page")
.get(errorHandler(productController.getProduct))

module.exports = router;
