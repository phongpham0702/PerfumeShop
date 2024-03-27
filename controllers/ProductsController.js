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
        
    },

    getProductDetail: async (req,res,next) => {
        try 
        {
            let pid = req.params.pid
            let product = await productModel.findOne({"PID":pid},{
                _id:0,
                PID: 1,
                Product_name: 1,
                Product_brand: 1,
                Product_gender: 1,
                priceScale: 1,
                Features: 1,
                Scent: 1,
                seasonRate: 1,
                dayNightRate: 1,
                Pictures: 1,
                Description: 1
                
            })

            let brand_name = await brandModel
            .findOne({"BID":product["Product_brand"]})
            .select(["Name"]);

            product.Product_brand = brand_name.Name;
            
            return res.status(200).json({
                PID: product.PID,
                Product_name: product.Product_name,
                Product_brand: product.Product_brand ,
                Product_gender: product.Product_gender,
                priceScale: product.priceScale,
                Features: product.Features,
                Scent: product.Scent,
                seasonRate: product.seasonRate,
                dayNightRate: product.dayNightRate,
                Pictures: product.Pictures,
                Description: product.Description,
            })
        } 
        catch (error) 
        {
            console.log(error);
            return res.status(400).json({"Message":"Cannot find this product"})
        }
       
    },
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