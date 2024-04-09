const express = require('express');
const router = express.Router();
const productController =   require("../controllers/ProductsController")
const productModel = require("../models/product")

router.route("/bestseller")
.get(productController.getBestSeller)

router.route("/newarrival")
.get(productController.getNewArrival)

router.route("/detail/:pid")
.get(productController.getProductDetail)

router.route("/search/:value")
.get(productController.searchByName)

router.route("/:page")
.get(productController.getProductPage)

module.exports = router;
