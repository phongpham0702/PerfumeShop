const express = require("express");
const router = express.Router();

const voucherController = require("../controllers/voucher.controller");
const { errorHandler } = require("../helpers/error_handler");
const { isLogin } = require("../utils/isLogin.util");


router.route("/check")
.get(isLogin, errorHandler(voucherController.checkVoucher))

module.exports = router;