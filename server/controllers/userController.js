const userModel = require('../models/users');
const productModel = require('../models/product')
const userController = {

    getWishList: async (req,res,next) => {

        try {
            let userID = req.user.UID
            let user_wish_list = await userModel.findOne(
                {
                    '_id' : userID
                },
                {
                    '_id': 0,
                    'WishList': 1
                }
            )

            let pipeline = [
                {
                    '$match':{
                        PID:{$in: user_wish_list.WishList}
                    }
                },             
                {
                    '$lookup' : {
                        from: 'brands',
                        localField: 'Product_brand',
                        foreignField: 'BID',
                        as: 'brandInfo'
                    }
                },

                { 
                    '$addFields':{
                        Brand_Name: {$arrayElemAt:["$brandInfo.Name",0]},
                    }
                },
                {
                    '$project':{
                        _id: 0,
                        PID: 1,
                        Product_name: 1,
                        Brand_Name: 1,
                        display_price: {$min: "$priceScale.Price"},
                        Pictures: 1,
                    }
                }
            ]

            let wishList_productInfo = await productModel.aggregate(pipeline);

            return res.status(200).json({'WishListInfo':wishList_productInfo})
        } 
        catch (error) {
            console.log(error);
            next();
        }

    },

    addWishList: async (req,res,next) => {
        try 
        {   
            let product_id = req.body.PID;
            let userID = req.user.UID;

            let product = await productModel.findOne(
                {
                    'PID' : product_id
                },
                {
                    '_id': 0,
                    'Product_name': 1,
                }
            )

            if(!product)
            {
                return res.status(400).json({"message":"This product does not exist."})
            }
            
            let user_info = await userModel.findOne({'_id':userID}).select(["WishList"]);

            if(!user_info.WishList.includes(product_id))
            {
                user_info.WishList.push(product_id);
                await user_info.save();
                return res.status(200).json({"message":`${product.Product_name} has been added to your wishlist.`})
            }
            else
            {
                return res.status(400).json({"message":`${product.Product_name} has already added to your wishlist.`})
            }
        } 
        catch (error) {
            console.log(error);
            next();
        }
    }

}

module.exports = userController;