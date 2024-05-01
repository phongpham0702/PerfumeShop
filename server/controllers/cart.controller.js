const CartService = require("../services/cart.service");
const responseHelper = require("../helpers/success.response");

class CartController {

    addToCart = async(req,res,next) => {


        console.log(req.body);
        new responseHelper.SuccessResponse({
            metadata: "aaaa"
            //await CartService.addToCart(req.userid)
        }).send(res)
    }


}


module.exports = new CartController()
