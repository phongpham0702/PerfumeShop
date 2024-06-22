const { randomBytes } = require("crypto")
const { decrypt } = require("../utils/encrypt.util")
const {v4: uuidv4} = require("uuid")

class GuestService{
    
    static CreateNewCart = (productId, modelId, quantity) => {
        let newCart = {
            cartId: uuidv4(),
            cartProductCount: quantity,
            cartBody: [
                {
                    productId,
                    modelId,
                    quantity
                }
            ]
        }

        return newCart;
    }

    static AddToCart = async (cartHash,productId, modelId, quantity) => {       
        if(!cartHash)
        {
            let newCart = this.CreateNewCart(productId,modelId,quantity);
            return newCart;
        }
        else
        {
            let userCart = decrypt(cartHash)
            console.log(userCart);
            return "abc";
        }
       
        /* let isContainsProduct = false
        for (const item in newCart.cartBody) {

        } */


    }
}

module.exports = GuestService