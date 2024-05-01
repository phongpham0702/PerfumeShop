const express = require('express');
const router = express.Router();

const {authentication, protectTokenProvider} = require("../utils/auth.util");
const {errorHandler} = require("../helpers/error_handler");
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const cartController = require('../controllers/cart.controller');




router.route('/gain-access').get(errorHandler(protectTokenProvider), errorHandler(authController.getNewToken))
router.get('/', function(req, res, next) {
  return res.status(200).json({"Message":"Nothing here!"})
});


router.use(errorHandler(authentication));



router.route('/logout')
.get(errorHandler(authController.logout))


router.route('/wishlist')
.get(errorHandler(userController.getWishList))
.post(errorHandler(userController.addWishList))
.delete(errorHandler(userController.removeFromWishList))

router.route('/cart/add')
.post(errorHandler(cartController.addToCart))
module.exports = router;
