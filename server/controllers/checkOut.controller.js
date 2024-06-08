const responseHelper = require("../helpers/success.response");
const { getCartIdByUserId } = require("../models/reposities/cart.repo");
const CheckoutService = require("../services/checkOut.service")

class CheckoutController{

    reviewOrder = async(req,res,next) => {

        if(!req.userid)
        {
            new responseHelper.OK({
                metadata: "Not available"
            }).send(res)
        }   

        new responseHelper.OK({
            metadata: await CheckoutService.Review(req.userid)
        }).send(res)
    }

}


module.exports = new CheckoutController