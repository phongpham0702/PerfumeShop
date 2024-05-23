const userModel = require("../models/users")
const {BadRequestError, NotAcceptError} = require('../helpers/error.response')
const { getProductList, checkProductIsExist } = require("../models/reposities/product.repo")
const useraddressModel = require("../models/useraddress.model")

const addressLimit = 5

class UserService{

    getUserProfile = async(userId) => {
        let foundUser = await userModel.findOne({
            _id: userId
        })
        .select([
            "_id",
            "Email",
            "FullName",
            "DoB",
            "PhoneNumber",
            "Addresses"
        ])
        .populate(
        {
            path:"Addresses",
            select:"receiverName receiverPhoneNumber Nation City District Ward addressDetail"
        })
        .lean()
        .exec()
        
        return {
            userProfile: foundUser
        }
    }

    addUserAddressList = async(userId, body) => {

        let foundUser = await userModel.findOne({
            _id: userId
        },
        {   
            Addresses:1
        })

        if(!foundUser)
        {
            throw new BadRequestError()
        }

        if(foundUser.Addresses.length >= addressLimit)
        {
            throw new NotAcceptError(`You can have only ${addressLimit} address. Please delete one.`)
        }

        let newAddress = await useraddressModel.create({
            addressOwner: foundUser.toJSON()._id,
            receiverName: body.receiverName,
            receiverPhoneNumber: body.receiverPhone,
            Nation: body.nation,
            City: body.city,
            Ward: body.ward,
            District: body.district,
            addressDetail: body.detail
        })
        
        foundUser.Addresses.push(newAddress._id)
        await foundUser.save()

        return {
            addedAddress:{
                addressId: newAddress._id,
                receiverName: newAddress.receiverName,
                receiverPhoneNumber: newAddress.receiverPhoneNumber,
                Nation: newAddress.Nation,
                City: newAddress.City,
                Ward: newAddress.Ward,
                District: newAddress.District,
                addressDetail: newAddress.addressDetail
            }
        }
    }

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