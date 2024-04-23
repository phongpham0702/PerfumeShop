const express = require('express');
const router = express.Router();

const {authentication} = require("../utils/auth.util");
const userController = require('../controllers/user.controller');
const authController = require('../controllers/auth.controller');
const {errorHandler} = require("../helpers/error_handler")


router.use(errorHandler(authentication));

router.get('/', function(req, res, next) {
  return res.status(200).json({"Message":"Nothing here!"})
});

router.route('/logout')
.post(errorHandler(authController.logout))


router.route('/wishlist')
.get(errorHandler(userController.getWishList))
.post(errorHandler(userController.addWishList))
.delete(errorHandler(userController.removeFromWishList))
module.exports = router;
