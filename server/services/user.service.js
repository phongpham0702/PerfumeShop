const userModel = require("../models/users")
const {BadRequestError, NotAcceptError} = require('../helpers/error.response')
const { getProductList, checkProductIsExist } = require("../models/reposities/product.repo")
const useraddressModel = require("../models/useraddress.model")
const { findUserById } = require("../models/reposities/user.repo")
const bcrypt = require("bcrypt")
const { deleteAddressById, updateAddress } = require("../models/reposities/useraddresses.repo")
const orderModel = require("../models/order.model")
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
            "Addresses",
            "defaultAddress"
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

    changePassword = async(userId, oldPassword, newPassword) => {

        let foundUser = await userModel.findOne({"_id":userId},{
            _id:1,
            Password:1
        })

        let salt = parseInt(process.env.SALT_ROUNDS);
        let checkPassword = bcrypt.compareSync(oldPassword, foundUser.Password)
        
        if(!checkPassword) throw new BadRequestError("Old password is not correct.")

        let hashedPassword = bcrypt.hashSync(newPassword, salt);

        foundUser.Password = hashedPassword

        return await foundUser.save()
    }

    getUserAddressById = async(userId, addressId) => {
        const foundUserAddress = await userModel.findOne({
            "_id": userId,
            "Addresses": addressId
        },{"Addresses.$":1})
        .populate({
            path:"Addresses",
            select:"receiverName receiverPhoneNumber Nation City District Ward addressDetail"
        })
        .lean()
        .exec()
        return {
            userAddress: foundUserAddress.Addresses[0]   
        }   
    }

    addUserAddressList = async(userId, body) => {

        let foundUser = await userModel.findOne({
            _id: userId
        },
        {   
            Addresses:1,
            defaultAddress:1
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
        
        if(!foundUser.defaultAddress) foundUser.defaultAddress = newAddress._id

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

    deleteUserAddress = async(userID, addressID) =>{
        let foundUser = await userModel.findOne({
            _id: userID
        },
        {   
            Addresses:1,
            defaultAddress:1
        })

        if(!foundUser)
        {
            throw new BadRequestError()
        }

        if(foundUser.Addresses.length <= 0)
        {
            throw new NotAcceptError(`You don't have any addresses`)
        }
        
        foundUser.Addresses = foundUser.Addresses.filter((address)=> {
            if(address.toString() !== addressID)
            {   
                return true
            }
            else
            {
                return false
            }

        });

        if(foundUser.defaultAddress.toString() === addressID)
        {
            foundUser.defaultAddress= foundUser.Addresses.length <= 0 ? "" : foundUser.Addresses[0]
        }

        let deleteResult = await deleteAddressById(addressID)

        await foundUser.save()
        return {
            deleteResult,
            currentDefaultAddress: foundUser.defaultAddress
        };
    }

    editUserAddress = async(userID, addressID, addressNewData = {}) => {
        const foundUserAddress = await userModel.findOne({
            _id: userID,
            Addresses : addressID
        },{_id:1}).lean()
        
        if(!foundUserAddress) throw new BadRequestError("Cannot find this address ID in your list")
        
        let updateSet = {
            receiverName: addressNewData.receiverName? addressNewData.receiverName:"",
            receiverPhoneNumber: addressNewData.receiverPhone ? addressNewData.receiverPhone:"",
            Nation: addressNewData.nation ? addressNewData.nation:"",
            City: addressNewData.city ? addressNewData.city:"",
            Ward: addressNewData.ward ? addressNewData.ward:"",
            District: addressNewData.district ? addressNewData.district:"",
            addressDetail: addressNewData.detail ? addressNewData.detail:""
        }
        let updatedAddress = await updateAddress(addressID, updateSet)
        return {
            updatedAddress: updatedAddress? updatedAddress:null
        }
    }

    setDefaultAddress = async(userID,defaultAddressID) => {
        let foundUser = await userModel.findOne({
            _id: userID
        },
        {   
            Addresses:1,
            defaultAddress:1
        })
        if(!foundUser)
        {
            throw new BadRequestError()
        }

        if(foundUser.defaultAddress === defaultAddressID) return {
            newDefaultAddressID: defaultAddressID
        }

        let foundAddress = foundUser.Addresses.find(address =>{
            return address.toString() === defaultAddressID
        })
        if(!foundAddress) throw new BadRequestError("Cannot find this address ID in your list")
        
        foundUser.defaultAddress = foundAddress.toString()
        await foundUser.save()
        return {
            newDefaultAddressID: foundAddress.toString()
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

    getUserOrders = async(userID, page = 1 ,statusQuery = ["confirm","paid","confirmed","in-delivery","complete"]) => {

        const orderPerPage = 5;
        
        const orderAmount = await orderModel.countDocuments({
            ownerId: userID,
            orderStatus:{
                $in:statusQuery
            }
        })
        
        let allUserOrder = await orderModel.find({
            ownerId: userID,
            orderStatus:{
                $in:statusQuery
            }
        },
        {
            orderStatus: 1, 
            total: 1,
            createdAt: 1,
            orderPayment: 1,
            orderProducts: 1})
        .sort({createdAt : -1})
        .skip((orderPerPage * page) - orderPerPage)
        .limit(orderPerPage)    
        .populate({
            path:'orderProducts.productId',
            select:["productName","priceScale"]
        }).lean()

        if(!allUserOrder){
            return{
                orders: []
            }
        }

        let result = allUserOrder.map(({orderProducts, ...rest}) => {
            
            let orderBodyData = orderProducts.map((i) => {
                let itemModel = i.productId.priceScale.find((m) => {
                    return m._id.toString() == i.modelId.toString()
                })

                return{
                    productName: i.productId.productName,
                    productCapacity: itemModel.capacity,
                    unitPrice: itemModel.price,
                    quantity: i.quantity
                }

            })

            return{
                ...rest,
                orderProducts: orderBodyData
            }

        })
        

        return{
            orderPerPage,
            orderAmount,
            currentPage: page,
            orders:result
        }
    }

}


module.exports = new UserService()