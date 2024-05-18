const userModel = require("../models/users")
const ProductService = require("./products.service")
const {BadRequestError} = require('../helpers/error.response')
const { getProductList, checkProductIsExist } = require("../models/reposities/product.repo")

class UserService{

    getUserWishList = async(userID) =>{

        let userWishList = await userModel.findOne(
            {
                '_id' : userID
            },
            {
                '_id': 0,
                'WishList': 1
            }
        ).lean()

        if(!userWishList) {throw new BadRequestError("Cannot find user wish list")}

        let wishListData = {
            'itemAmount': userWishList['WishList'].length,
            'items' : {} 
        }

        if(wishListData['itemAmount'] === 0 ) return {wishListData}

        wishListData['items'] = await getProductList(userWishList['WishList'])

        return {wishListData}
    }

    addWishList = async (userID, productID) => {

        let checkProduct = await checkProductIsExist(productID)

        if(!checkProduct) throw new BadRequestError("This product id is not invalid")

        let userWishList = await userModel.findOne({'_id': userID}).select(["_id","WishList"])
        let isContain = userWishList['WishList'].includes(productID)

        if(isContain) throw new BadRequestError("This product is already in your wish list")

        userWishList['WishList'].push(productID)
        await userWishList.save()

        return {
            'message' : `Add to wishlist success`
        }
    }

    removeFromWishList = async(userID, productID) => {

        let checkProduct = await checkProductIsExist(productID)

        if(!checkProduct) throw new BadRequestError("This product id is not invalid")

        let removeResult  = await userModel.updateOne({'_id':userID},{
            "$pull": {WishList: productID}
        })

        return {
            'message' : `Remove from wishlist success`
        }

    }

}


module.exports = new UserService()