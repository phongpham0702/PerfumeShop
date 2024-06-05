const express = require('express');
const router = express.Router();

const {authentication, protectTokenProvider} = require("../utils/auth.util");
const {errorHandler} = require("../helpers/error_handler");
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const cartController = require('../controllers/cart.controller');
const AddToCartValidator = require('../controllers/validators/addCart.validator');
const UpdateCartValidator = require('../controllers/validators/updateCart.validator');
const checkOutController = require('../controllers/checkOut.controller');
const AddAddressValidator = require('../controllers/validators/addAddress.validator');
const changePasswordValidator = require('../controllers/validators/changePassword.validator');


router.route('/gain-access').get(errorHandler(protectTokenProvider), errorHandler(authController.getNewToken))
router.get('/', function(req, res, next) {
  return res.status(200).json({"Message":"Nothing here!"})
});


router.use(errorHandler(authentication));



router.route('/logout')
.get(errorHandler(authController.logout))

router.route('/profile')
.get(errorHandler(userController.getUerProfile))

router.route("/change-password")
.post(changePasswordValidator,errorHandler(userController.changePassword))

router.route('/address')
.post(AddAddressValidator ,errorHandler(userController.addUserAddressList))

router.route('/wishlist')
.get(errorHandler(userController.getWishList))
.post(errorHandler(userController.addWishList))
.delete(errorHandler(userController.removeFromWishList))

router.route('/cart')
.get(errorHandler(cartController.getUserCart))
.post( AddToCartValidator ,errorHandler(cartController.addToCart))
.put( UpdateCartValidator,errorHandler(cartController.updateCart))
.delete(errorHandler(cartController.deleteCartItem))

router.route('/clear-cart')
.get(errorHandler(cartController.deleteAllItems))

router.route('/review')
.post(errorHandler(checkOutController.reviewOrder))

module.exports = router;
