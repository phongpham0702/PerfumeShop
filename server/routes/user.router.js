const express = require('express');
const router = express.Router();

const auth = require("../middlewares/auth_user");
const userController = require('../controllers/userController');


router.use(auth);

router.get('/', function(req, res, next) {
  return res.status(200).json({"Message":"Nothing here!"})
});

router.route('/wishlist')
.get(userController.getWishList)
.post(userController.addWishList)

module.exports = router;
