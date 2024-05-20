const responseHelper = require("../helpers/success.response");
const CheckoutService = require("../services/checkOut.service")

class CheckoutController{

    reviewOrder = async(req,res,next) => {
        new responseHelper.OK({
            metadata: await CheckoutService.Review(req.userid,req.body.cartId)
        }).send(res)
    }

}


module.exports = new CheckoutController