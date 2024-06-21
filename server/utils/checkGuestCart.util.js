const COOKIE_CART_NAME = "cart_hash"

const isCartExist = async(req,res,next) => {
    const guestHashCart = req.signedCookies[COOKIE_CART_NAME]

    req.isCartExist = guestHashCart ? true : false
    req.cartHash = guestHashCart ? guestHashCart : null
    return next();
}


module.exports = {
    isCartExist
}