const express = require('express');
const router = express.Router();
const productController =   require("../controllers/ProductsController")

router.route("/").get(productController.getProductPage)

module.exports = router;
