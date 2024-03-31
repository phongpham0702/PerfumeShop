const express = require("express")
const router = express.Router();

const brandController =   require("../controllers/BrandsController")

router.route("/").get(brandController.getAllBrands)

// router.route("/:pid")
// .get(productController.getProductDetail)

module.exports = router;
