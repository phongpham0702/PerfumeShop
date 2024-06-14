const express = require("express");
const router = express.Router();

const checkOutController = require("../controllers/checkOut.controller");
const { errorHandler } = require("../helpers/error_handler");
const { isLogin } = require("../utils/isLogin.util");
const checkOutValidator = require("../controllers/validators/checkOut.validator");

router.use(errorHandler(isLogin))

router.route("/")
.get(errorHandler(checkOutController.reviewOrder))
.post(checkOutValidator, errorHandler(checkOutController.checkOut))

router.route("/access-payment")
.get(errorHandler(checkOutController.test_payment))

module.exports = router;