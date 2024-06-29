const express = require("express");
const router = express.Router();

const checkOutController = require("../controllers/checkOut.controller");
const { errorHandler } = require("../helpers/error_handler");
const { isLogin } = require("../utils/isLogin.util");
const checkOutValidator = require("../controllers/validators/checkOut.validator");

router.route("/success")
.get(errorHandler(checkOutController.onlinePaymentSuccess))

router.use(errorHandler(isLogin))

router.route("/")
.get(errorHandler(checkOutController.reviewOrder))
.post(checkOutValidator, errorHandler(checkOutController.checkOut))



router.route("/fail")
.get()


module.exports = router;