class CheckoutController{

    reviewOrder = async(req,res,next) => {

        new responseHelper.SuccessResponse({
            metadata: await CartService.getCart(req.userid)
        }).send(res)
    }

}


module.exports = new CheckoutController