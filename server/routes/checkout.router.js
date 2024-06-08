const express = require("express");
const router = express.Router();

const checkOutController = require("../controllers/checkOut.controller");
const { errorHandler } = require("../helpers/error_handler");
const { isLogin } = require("../utils/isLogin.util");

router.use(errorHandler(isLogin))

router.route("/review")
.get(errorHandler(checkOutController.reviewOrder))

module.exports = router;