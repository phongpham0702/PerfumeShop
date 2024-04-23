const userModel = require("../models/users")
const ProductService = require("./products.service")
const {BadRequestError} = require('../helpers/error.response')
const {Types} = require('mongoose')
class UserService{

    findByEmail = async(email,select = {
        'Email': 1 ,'FullName': 1,'Password': 1, 'isVerify': 1,'isAdmin': 1, 
    }) => {

        return await userModel.findOne({"Email": email}).select(select).lean()

    }

    getUserWishList = async(userID) =>{

        let user_wish_list = await userModel.findOne(
            {
                '_id' : userID
            },
            {
                '_id': 0,
                'WishList': 1
            }
        ).lean()

        if(!user_wish_list) {throw new BadRequestError("Cannot find user wish list")}

        let wish_list_detail = await ProductService.getProductsById(user_wish_list['WishList'])

        return {wish_list_detail}
    }

    addWishList = async (userID, productID) => {

        let checkProduct = await ProductService.checkProduct(productID)

        if(!checkProduct) throw new BadRequestError("This product id is not invalid")

        let userWishList = await userModel.findOne({'_id':new Types.ObjectId(userID)}).select(["_id","WishList"])
        let isContain = userWishList['WishList'].includes(productID)

        if(isContain) throw new BadRequestError("This product is already in your wish list")

        userWishList['WishList'].push(productID)
        await userWishList.save()

        return {
            'message' : `Add to wishlist success`
        }
    }

    removeFromWishList = async(userID, productID) => {

        let checkProduct = await ProductService.checkProduct(productID)

        if(!checkProduct) throw new BadRequestError("This product id is not invalid")

        let removeResult  = await userModel.updateOne({'_id':new Types.ObjectId(userID)},{
            "$pull": {WishList: productID}
        })

        return {
            'message' : `Remove from wishlist success`
        }

    }

}


module.exports = new UserService()