const { findCartById } = require("../models/reposities/cart.repo")
const { BadRequestError, ServerError } = require('../helpers/error.response');
const { getUserCheckOutInfo } = require("../models/reposities/user.repo");
const VoucherService = require("./voucher.service");
const OrderService = require("./orders.service");
const databaseInstance = require("../dbs/init.db");
const OrderModel = require("../models/order.model");
const converterHelper = require("../helpers/converter.helper");
const ProductModel = require("../models/product");


class CheckoutService {

    static async Review(userId){
        const foundCart = await findCartById({userId})
        let totalPrice = 0

        if(!foundCart)
        {
            throw new BadRequestError('Cannot find your cart')
        }

        const foundUser = await getUserCheckOutInfo(userId);
        
        if(!foundUser)
        {
            throw new BadRequestError('Cannot find your information')
        }

        for(let i of foundCart.cartData)
        {
            totalPrice += i.unitPrice * i.quantity
        }
        
        const order = {
            cartId: foundCart.cartId.toString(),
            cartCountProduct: foundCart.cartCountProduct,
            userInfo:{
                userId: foundUser._id,
                fullName: foundUser.FullName,
                email: foundUser.Email,
                phoneNumber: foundUser.PhoneNumber,
                addressList: foundUser.Addresses,
                defaultAddress: foundUser.defaultAddress
            },
            cartData: foundCart.cartData,
            totalPrice,
        }

        return order
    }

    static async CheckOut(ownerId = "", 
        userCart, 
        paymentMethod,
        additionInfo ={receiverInfo ,voucherCode})
    {   

        //calculate cart total & check in-stock quantity
        let cartTotal = 0
        for(let item of userCart.cartData)
        {
            if(item.quantity > item.inStock)
            {
                throw new BadRequestError(`Product ${item.productName} ${item.productCapacity} only have ${item.inStock} left in stock.`)
            } 
            cartTotal += item.quantity * item.unitPrice
        }

        //check voucher
        let checkVoucherResult = null
        if(additionInfo.voucherCode !== "" && additionInfo.voucherCode){
            checkVoucherResult = await VoucherService.checkVoucher(ownerId.toString(), cartTotal, additionInfo.voucherCode, true);
        }
        
        if(checkVoucherResult && !checkVoucherResult.checkResult.isValid){
            throw new BadRequestError(checkVoucherResult.checkResult.checkMessage);
        }   

        //create order
        const transactionSession = await databaseInstance.getMongoClient().startSession();

        try 
        {

            transactionSession.startTransaction();
           
            //Create order
            const order = await OrderService.CreateOrder({
                ownerId: ownerId,
                receiverData: additionInfo.receiverInfo,
                userCartData: userCart,
                voucherData: checkVoucherResult,
                subTotal: cartTotal,
                payment: paymentMethod
            }, transactionSession) 
            //await transactionSession.abortTransaction(); 
            await transactionSession.commitTransaction();
            console.log(`Order ${order[0]._id.toString()} created successfully`);

            return order[0].toObject();
        } 
        catch (error) {
            await transactionSession.abortTransaction();
            console.error('Error creating order:', error.message);

            return null;
        }
        finally{
            transactionSession.endSession();
        }

    }


    static async HandleOnlinePaymentSuccess(orderId ,vid = null){
        let foundOrder = await OrderModel.findOne({
            _id: converterHelper.toObjectIdMongo(orderId)
        })
        .populate({
            path:'orderProducts.productId',
            select: ["productName","productBrand","productThumbnail","priceScale"]
        })

        foundOrder.orderStatus = "paid";
        await foundOrder.save();

        let {ownerType,
            updatedAt, 
            orderStatus, 
            __v, 
            _id, 
            orderProducts ,
            ...metaDataBody } = foundOrder._doc;

        let orderBodyData = orderProducts.map((i) => {
            let itemModel = i.productId.priceScale.find((m)=> {
                return m._id.toString() == i.modelId.toString()
            })
            return {
    
                productId: i.productId._id.toString(),
                modelId: i.modelId.toString(),
                productName: i.productId.productName,
                productBrand: i.productId.productBrand,
                productThumbnail: i.productId.productThumbnail,
                productCapacity: itemModel.capacity,
                unitPrice: itemModel.price,
                quantity: i.quantity
            }
        })

        return {
            orderId: foundOrder._id.toString(),
            orderProducts: orderBodyData,
            ...metaDataBody
        }

    }

    static async HandleOnlinePaymentFail(orderId ,vid = null){
        let foundOrder = await OrderModel.findOneAndDelete({
            _id: converterHelper.toObjectIdMongo(orderId),
            orderStatus: "pay-pending"
        })

        if(!foundOrder) throw new BadRequestError("No order found");

        let bulkOps = foundOrder.orderProducts.map((product) => {
            let productIdMongo = converterHelper.toObjectIdMongo(product.productId)
            let modelIdMongo = converterHelper.toObjectIdMongo(product.modelId)
            return{
                "updateOne":{
                    filter:{"_id": productIdMongo, "priceScale._id": modelIdMongo },
                    update:{ "$inc":{
                            "sold": - product.quantity,
                            "priceScale.$.inStock": product.quantity
                        } 
                    }
                }
            }
        })

        await ProductModel.bulkWrite(bulkOps);

        return {
            cancelResult: "Your order has been cancelled"
        }

        

    }
}


module.exports = CheckoutService