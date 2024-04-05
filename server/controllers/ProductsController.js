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

    getBestSeller: async (req,res,next) => {
        try {
            const limit_products = 10;
            let bestSeller;

            if(req.session.bestSeller === undefined ||
                req.session.bestSeller === null ||
                req.session.bestSeller === "" )
            {
                
                let bestSeller_PipeLine = [
                    {
                        $addFields:{
                            "display_price":{"$min":"$priceScale.Price"}
                        }
                    },
                    {
                        $lookup:{
                            from: 'brands',
                            localField: 'Product_brand',
                            foreignField: 'BID',
                            as: 'brandInfo'
                        }
                    },
                    {
                        $project:{
                            PID: 1,
                            Product_name: 1,
                            Brand_Name: {$arrayElemAt: ["$brandInfo.Name", 0]},
                            Product_gender: 1,
                            display_price: 1,
                            Pictures:1,
                            Sold: 1,
                        }
                    },
                    {
                        $sort :{"Sold": -1}
                    },
                    {
                        $group:{
                            _id: "$Product_gender",
                            products: {$push: "$$ROOT",},
                        }
                    },
                    {
                        $project:{
                            _id: 1,
                            products: {
                                $slice: ["$products", limit_products],
                            },
                        }
                    }
                ]

                bestSeller = await productModel.aggregate(bestSeller_PipeLine)
                req.session.bestSeller = bestSeller;
                  
            }
            else
            {   
                bestSeller = req.session.bestSeller;
            }

            return res.status(200).json({bestSeller})
        } 
        catch (error) 
        {
            console.log(error);
            next()    
        }
    
    },

    getNewArrival: async (req,res,next) => {
        try {
            const limit_products = 5;
            let newArrival;

            if(req.session.newArrival === undefined ||
                req.session.newArrival === null ||
                req.session.newArrival === "" )
            {
                
                let newArrival_PipeLine = [
                    {
                        $sort: {"createdAt": -1}
                    },
                    {
                        $limit: limit_products
                    },
                    {
                        $addFields:{
                            "display_price":{"$min":"$priceScale.Price"}
                        }
                    },
                    {
                        $lookup:{
                            from: 'brands',
                            localField: 'Product_brand',
                            foreignField: 'BID',
                            as: 'brandInfo'
                        }
                    },
                    {
                        $project:{
                            PID: 1,
                            Product_name: 1,
                            Brand_Name: {$arrayElemAt: ["$brandInfo.Name", 0]},
                            Product_gender: 1,
                            display_price: 1,
                            Pictures:1,
                            Sold: 1,
                        }
                    },
                    
                ]

                newArrival = await productModel.aggregate(newArrival_PipeLine)
                req.session.newArrival = newArrival;
                  
            }
            else
            {   
                newArrival = req.session.newArrival;
            }

            return res.status(200).json({newArrival})
        } 
        catch (error) 
        {
            console.log(error);
            next()    
        }
    },

    searchByName: async (req,res,next) => {
        try 
        {   
            let searchValue = req.params.value
            let pipeLine = [
                {
                    $addFields:{
                        "display_price": {$min: "$priceScale.Price"}
                    }
                },
                {
                    $lookup:{
                        from: 'brands',
                        localField: 'Product_brand',
                        foreignField: 'BID',
                        as: 'brandInfo'
                    }
                },
                {
                    $project:{
                        PID: 1,
                        Product_name: 1,
                        Brand_Name: {$arrayElemAt: ["$brandInfo.Name", 0]},
                        display_price: 1,
                        Pictures:1,
                    }
                },
                {
                    $match:{
                        Product_name: {
                            $regex: searchValue.toString(),
                            $options: "i",
                          },
                        }  
                }
            ]

            let productsByName = await productModel.aggregate(pipeLine)
                
            return res.status(200).json({result: productsByName}) 
        } 
        catch (error) 
        {
            console.log(error);
            next();   
        }
    }
}


module.exports = productController