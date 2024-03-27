const express = require('express');
const router = express.Router();
const productController =   require("../controllers/ProductsController")
const productModel = require("../models/product")
router.route("/")
.get(productController.getProductPage)

router.route("/:pid")
.get(productController.getProductDetail)

module.exports = router;
