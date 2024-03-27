const productModel = require("../models/product")
const brandModel = require("../models/brands")
const productController = {

    getProductPage: async (req,res,next) => {

        try {
            let productPerPage = 20;
            let currentPage = parseInt(req.query.page) || 1;
            let products_num = await productModel.countDocuments()
            
            let products = await productModel.aggregate([
                {$skip : (productPerPage * currentPage) - productPerPage },
                {$limit : productPerPage},
                {$lookup : {
                    from: 'brands',
                    localField: 'Product_brand',
                    foreignField: 'BID',
                    as: 'brandInfo'
                }
            },
                {$project:{
                    _id: 0,
                    PID: 1,
                    Product_name: 1,
                    Product_brand: {$arrayElemAt:["$brandInfo.Name",0]},
                    priceScale: 1,
                    Pictures: 1
                }}
            ])

            for(let p of products)
            {
                p['display_price'] = get_MIn_Price(p.priceScale)
            }

            return res.status(200).json({
                productPerPage,
                currentPage,
                Page_nums: Math.ceil(products_num/productPerPage),
                products
            });
        } 
        catch (error) {

            console.log(error);
            next()
        }
        
    }

}


function  get_MIn_Price(priceScale) 
{  
    let min_price = priceScale[0].Price;

    for(let i = 1 ; i < priceScale.length ; i ++)
    {
        if(priceScale[i].Price < min_price)
        {
            min_price = priceScale[i].Price;
        }
    }
    return min_price
}

module.exports = productController