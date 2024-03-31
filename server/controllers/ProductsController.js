const productModel = require("../models/product")
const brandModel = require("../models/brands")
const productController = {

    getProductPage: async (req,res,next) => {

        try {
            let productPerPage = 20;
            let currentPage = parseInt(req.params.pid) || 1;
            let products_num = await productModel.countDocuments();
            let genderFilter = req.query.gender || null;
            let priceOrder = req.query.priceorder || null;
            
            let pipeline = [

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
                    display_price: 1,
                    Pictures: 1,
                }}
            ]

            if((priceOrder !== undefined) && (priceOrder !== null))
            {   
                 
                if(priceOrder === "desc"){
                    pipeline.unshift({
                        $sort: {display_price : -1}
                    })
                }
                if(priceOrder === "asce"){
                    pipeline.unshift({
                        $sort: {display_price : 1}
                    })
                }
            }

            if((genderFilter !== undefined) && (genderFilter !== null))
            {
                pipeline.unshift({
                    $match: {'Product_gender' : genderFilter}
                })

                products_num = await productModel.countDocuments({"Product_gender": genderFilter});
            }
            
            pipeline.unshift(
                {$addFields: {
                display_price:{ $min: "$priceScale.Price" }
                }
            })

            let products = await productModel.aggregate(pipeline);


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

            let product = await productModel.aggregate([
                {$match : {'PID': pid}},
                {$lookup: {
                    from: 'brands',
                    localField:'Product_brand',
                    foreignField: 'BID',
                    as: 'brandInfo'
                }},
                {$project: {
                    _id: 0,
                    PID: 1,
                    Product_name: 1,
                    Product_brand: {$arrayElemAt:["$brandInfo.Name",0]},
                    priceScale: 1,
                    display_price: { $min: "$priceScale.Price" },
                    Features:1,
                    Scent:1,
                    seasonRate:1,
                    dayNightRate:1,
                    Pictures: 1,
                    Description:1,
                }}

                
            ])
         
            return res.status(200).json({product})

        } 
        catch (error) 
        {
            console.log(error);
            return res.status(400).json({"Message":"Cannot find this product"})
        }
       
    },
}

async function withOutFilter(productPerPage,currentPage)
{   
    try 
    {
        let result = await productModel.aggregate([
            
            {$addFields: {
                display_price:{ $min: "$priceScale.Price" }
            }},
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
                display_price: 1,
                Pictures: 1,
            }}
        ])

        return result;
    } 
    catch (error) 
    {
        console.log(error);
        return null;
    }
    
}





module.exports = productController