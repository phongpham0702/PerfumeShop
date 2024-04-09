const productModel = require("../models/product")
const brandModel = require("../models/brands");
const productController = {

    getProductPage: async (req,res,next) => {

        try {

            let queryObj = req.query
            let productPerPage = 20;
            let currentPage = parseInt(req.params.page) || 1; 
            let queryFilter = generateQueryString(queryObj);
            let pipeline = [
                
                {
                    $addFields:
                    {
                        display_price:{ $min: "$priceScale.Price" }
                    }   
                },
                
                {
                    $lookup : {
                        from: 'brands',
                        localField: 'Product_brand',
                        foreignField: 'BID',
                        as: 'brandInfo'
                    }
                },

                { 
                    $project:{
                        _id: 0,
                        PID: 1,
                        Product_name: 1,
                        Brand_Name: {$arrayElemAt:["$brandInfo.Name",0]},
                        display_price: 1,
                        Pictures: 1,
                        Product_gender:1,
                        seasonRate:1
                    }
                }
            ]
            
            pipeline = pipeline.concat(queryFilter)

            pipeline.push(
                {
                    $project:{
                        _id: 0,
                        PID: 1,
                        Product_name: 1,
                        Brand_Name: 1,
                        display_price: 1,
                        Pictures: 1,
                        Product_gender:1
                    }
                }
            
            )
            
            let products = await productModel.aggregate(pipeline);
            let products_num = products.length;

            let page_data = pagination(products,currentPage,productPerPage)
            
            return res.status(200).json({
                products_num,
                productPerPage,
                currentPage,
                Page_nums: Math.ceil(products_num/productPerPage),
                products: page_data,
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
                    Brand_Name: {$arrayElemAt:["$brandInfo.Name",0]},
                    Product_gender:1,
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
            let similarProducts = await findSimilarProduct(product[0])

            return res.status(200).json({
                product_detail: product[0],
                similar_products: similarProducts
            })

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
                            display_price: { $min: "$priceScale.Price" },
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
                            display_price: { $min: "$priceScale.Price" },
                            Pictures:1,
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
            let searchValue = req.params.value.replace(/[+\-_]/g," ")
            //Convert +, -, _ -> space
            let pipeLine = [
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
                        display_price: {$min: "$priceScale.Price"},
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

function generateQueryString(queryObj)
{   
    let filterQuery = []

    if(queryObj.brand)
    {
        let brandName = queryObj.brand.replaceAll("-"," ")
        filterQuery.push({
            '$match': {'Brand_Name' : brandName}
        })
    }

    if((queryObj.gender) && (typeof(queryObj.gender) === "string"))
    {
        filterQuery.push({
            '$match': {'Product_gender' : queryObj.gender}
        })
    }

    if((queryObj.gender) && (typeof(queryObj.gender) === "object"))
    {
        filterQuery.push({
            '$match': {'Product_gender' :{'$in':[...queryObj.gender]} }
        })
    }

    if(queryObj.price)
    {
        let priceRange = queryObj.price.split("-")
        let minPrice = priceRange[0]
        let maxPrice = priceRange[1]

        filterQuery.push({
            '$match': {
                'display_price':{
                    '$gte': parseInt(minPrice),
                    '$lte': parseInt(maxPrice)
                }
            }
        })
    }
    
    if(queryObj.season)
    {   
        const accept_Rate = 0.65;
        let season_filter = []
        if(typeof(queryObj.season) === "string")
        {   
            let query_prop = 'seasonRate.'+queryObj.season;
            season_filter.push(generateSeasonQuery(query_prop))
        }
        else
        {
            for(let s of queryObj.season)
            {
                let query_prop = 'seasonRate.'+s;
                season_filter.push(generateSeasonQuery(query_prop))
            }
        }

        //Closure func
        function generateSeasonQuery(query_prop){
            let seasonFilterQuery = {}
            seasonFilterQuery[query_prop] = {'$gte': accept_Rate}
            return seasonFilterQuery;
        }

        filterQuery.push({
            '$match': {
                '$or' :season_filter 
            }
        })

    }

    if(queryObj.priceOrder)
    {   
        filterQuery.push({      
             "$sort": {'display_price' : parseInt(queryObj.priceOrder)}    
        })
    }

    return filterQuery;
}

function pagination(data,curr_page,item_per_page)
{   
    let start = (item_per_page * curr_page) - item_per_page;
    let end = item_per_page * curr_page;
    let page_data = data.slice(start, end)

    return page_data;
}

async function findSimilarProduct(product)
{   
    const num_of_products = 10;
    let current_product_id = product.PID
    let gender = [product["Product_gender"]];
    let main_scent = product.Scent.Main.join("|")
    let first_scent = product.Scent.First.join("|")
    let middle_scent = product.Scent.Middle.join("|")
    let final_scent = product.Scent.Final.join("|")
    
    if(gender !== "Unisex")
    {
        gender.push("Unisex")
    }

    let pipeLine = [
        {
            "$match":{
                    "PID":{
                        $ne: current_product_id
                    },
                    "Product_gender":{
                        $in: gender
                    },
                    "Scent.Main":{
                      $regex: main_scent,
                      $options: "i",
                    },
                    "Scent.First": {
                      $regex: first_scent,
                      $options: "i",
                    },
                    "Scent.Middle": {
                      $regex: middle_scent,
                      $options: "i",
                    },
                      "Scent.Final": {
                      $regex: final_scent,
                      $options: "i",
                    },   
            }
        },
        {"$sample":{size : num_of_products}},
        {
            $lookup:{
                from: 'brands',
                localField: 'Product_brand',
                foreignField: 'BID',
                as: 'brandInfo'
            }
        },
        {
            "$project":
            {   
                _id:0,
                PID: 1,
                Product_name: 1,
                Brand_Name: {$arrayElemAt:["$brandInfo.Name",0]},
                display_price: {$min:"$priceScale.Price"},
                Pictures: 1,
            }
        }
    ]

    let similarProducts = await productModel.aggregate(pipeLine);

    return similarProducts;
}


module.exports = productController