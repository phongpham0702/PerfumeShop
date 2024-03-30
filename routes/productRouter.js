const express = require('express');
const router = express.Router();
const productController =   require("../controllers/ProductsController")
const productModel = require("../models/product")
router.route("/:pid")
.get(productController.getProductPage)

router.route("/detail/:pid")
.get(productController.getProductDetail)

module.exports = router;
