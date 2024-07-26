const express = require('express');
const router = express.Router();
const {errorHandler} = require("../helpers/error_handler");
const adminController = require('../controllers/admin.controller');
const CreateVoucherValidator = require("../controllers/validators/createVoucher.validator");
const uploadImage = require('../utils/handleImageUpload.util');

router.get('/', function(req, res, next) {
  return res.status(200).json({"Message":"Nothing here!"})
});

router.route('/login')
.post( errorHandler(adminController.AdminAuthenticate))

router.route('/product/create')
.post(uploadImage.single('productThumbnail'),errorHandler(adminController.CreateNewProduct))

router.route('/product/:page')
.get(errorHandler(adminController.GetProducts))

router.route('/product/detail/:pid')
.get(errorHandler(adminController.GetProductDetail))

router.route('/product/fill-stock') //!!!

router.route('/vouchers')
.get(errorHandler(adminController.GetVoucherList))

router.route('/create/voucher')
.post(CreateVoucherValidator ,errorHandler(adminController.CreateVoucher))

router.route('/orders/:page')
.get(errorHandler(adminController.GetOrders))

router.route('/orders/detail/:orderId')
.get(errorHandler(adminController.GetOrderDetail))

router.route('/orders/mark/confirm')
.post(errorHandler(adminController.ConfirmOrder))

router.route('/orders/mark/reject')
.post(errorHandler(adminController.RejectOrder))

router.route('/orders/mark/delivery')
.post(errorHandler(adminController.deliveryOrder))

router.route('/orders/mark/complete')
.post(errorHandler(adminController.completeOrder))

router.route('/users')//!!!
.get()
 
router.route('/users/detail/:uid')//!!!
.get()

router.get("/data/order-count", adminController.GetOrdersCount)
router.get("/data/sale-data/:year", adminController.GetSaleData)
router.route("/data/out-of-stock")//!!!
module.exports = router;
