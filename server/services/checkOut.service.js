const { findCartById } = require("../models/reposities/cart.repo")
const { BadRequestError } = require('../helpers/error.response');
class CheckoutService {

    /* 
        payload:{
            userId,
            cartId,
            voucherId: []
        }
    */


    static async Review(userId, cartId, vouchers){

        const foundCart = await findCartById(cartId)

        if(!foundCart)
        {
            throw new BadRequestError('Cannot find your cart')
        }
        
        

        const order = {
            totalPrice: 0,
            totalDiscount:0,
            total: 0
        }
    }

}


module.exports = CheckoutService