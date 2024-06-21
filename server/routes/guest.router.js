const express = require('express');
const router = express.Router();

const {errorHandler} = require("../helpers/error_handler");
const { isCartExist } = require('../utils/checkGuestCart.util');
const guestController = require("../controllers/guest.controller")
const cartController = require('../controllers/cart.controller');
const AddToCartValidator = require('../controllers/validators/addCart.validator');
const UpdateCartValidator = require('../controllers/validators/updateCart.validator');



router.get('/', function(req, res, next) {
  return res.status(200).json({"Message":"Nothing here!"})
});

router.route('/cart')
.get(errorHandler(cartController.getUserCart))
.post(isCartExist, AddToCartValidator ,errorHandler(guestController.AddToCart))
.put( UpdateCartValidator,errorHandler(cartController.updateCart))
.delete(errorHandler(cartController.deleteCartItem))

router.route('/clear-cart')
.get(errorHandler(cartController.deleteAllItems))


module.exports = router;
