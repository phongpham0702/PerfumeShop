class PipeLineGenerator {
    constructor() {
        if (!PipeLineGenerator.instance) {
            PipeLineGenerator.instance = this;
        }
        return PipeLineGenerator.instance;
    }

    generate_productBasic = () =>{
        return [
                {
                    '$lookup':{
                        'from': 'brands',
                        'localField': 'Product_brand',
                        'foreignField': 'BID',
                        'as': 'brandInfo'
                    }
                },
                {
                    '$project':
                    {   
                        '_id':0,
                        'PID': 1,
                        'Product_name': 1,
                        'Product_gender':1,
                        'Brand_Name': {$arrayElemAt:["$brandInfo.Name",0]},
                        'display_price': {$min:"$priceScale.Price"},
                        'Pictures': 1,
                    }
                },
        ]
    }

    generate_productDetail = ()=> {
        return [

            {
                '$lookup': {
                    'from': 'brands',
                    'localField':'Product_brand',
                    'foreignField': 'BID',
                    'as': 'brandInfo'
                }
            },
        
            {
                '$project': {
                    '_id': 0,
                    'PID': 1,
                    'Product_name': 1,
                    'Brand_Name': {$arrayElemAt:["$brandInfo.Name",0]},
                    'Product_gender':1,
                    'priceScale': 1,
                    'display_price': { $min: "$priceScale.Price" },
                    'Features':1,
                    'Scent':1,
                    'seasonRate':1,
                    'dayNightRate':1,
                    'Pictures': 1,
                    'Description':1,
                }
            }
        
        ]
    }

    generate_productPage = (productPerPage, currentPage ) => {
        
        let pipeLine = [
            {$skip : (productPerPage * currentPage) - productPerPage },
            {$limit : productPerPage},
        ].concat(this.generate_productBasic())

        return pipeLine

    }

    generate_productPageFilter = (productPerPage , currentPage, Filter) => {

        let filterPipeLine = [
                
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
                $addFields:{
                    Brand_Name: {$arrayElemAt:["$brandInfo.Name",0]},
                }
            }
        ].concat(generateFilter(Filter))
        
        let pagePipeline = filterPipeLine.concat([

            {$skip : (productPerPage * currentPage) - productPerPage },
            {$limit : productPerPage},
            {
                $project:{
                    _id: 0,
                    'PID': 1,
                    'Product_name': 1,
                    'Product_gender':1,
                    'Brand_Name': 1,
                    'display_price': 1,
                    'Pictures': 1,
                }
            }
        ])
        
        return {pagePipeline,filterPipeLine}

    }

    generate_bestSeller = (limit)=> {
        let bestSeller_PipeLine = this.generate_productBasic().concat(
    [
                                
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
                        _id: 0,
                        gender : "$_id",
                        products: {
                            $slice: ["$products", limit],
                        },
                    }
                }
            ]

        )   
        return bestSeller_PipeLine
         
    }

    generate_newArrival = (limit) => {
        let newArrival_PipeLine = [
            {
                $sort: {"createdAt": -1}
            },
            {
                $limit: limit
            },
            
        ].concat(this.generate_productBasic())

        return newArrival_PipeLine
    }

    generate_searchByName = (searchValue)=> {
        let pipeLine = this.generate_productBasic().concat(
            [
                {
                    $addFields:{
                        'FullName': { $concat: ["$Brand_Name"," ","$Product_name"] }
                    }
                },
                {
                    $match:{
                        "FullName": { $regex: searchValue.toString(), $options: "i" }
                    }  
                },
                {
                    $project:{
                        "FullName":0
                    }
                }
            ]
        )
        return pipeLine
    }

    generate_findProductById = (id_list) => {

        let pipeline = [
            {
                '$match':{
                    PID:{$in: id_list}
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
                '$project':{
                    _id: 0,
                    PID: 1,
                    Product_name: 1,
                    Brand_Name: {$arrayElemAt:["$brandInfo.Name",0]},
                    display_price: {$min: "$priceScale.Price"},
                    Pictures: 1,
                }
            }
        ]
        return pipeline
    }   
}


function generateFilter(filterObj)
{   
    let filterQuery = []

    if(filterObj.brand)
    {
        let brandName = filterObj.brand.replaceAll("-"," ")
        filterQuery.push({
            '$match': {'Brand_Name' : brandName}
        })
    }

    if((filterObj.gender) && (typeof(filterObj.gender) === "string"))
    {
        filterQuery.push({
            '$match': {'Product_gender' : filterObj.gender}
        })
    }

    if((filterObj.gender) && (typeof(filterObj.gender) === "object"))
    {
        filterQuery.push({
            '$match': {'Product_gender' :{'$in':[...filterObj.gender]} }
        })
    }

    if(filterObj.price)
    {
        let priceRange = filterObj.price.split("-")
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
    
    if(filterObj.season)
    {   
        const accept_Rate = 0.65;
        let season_filter = []
        if(typeof(filterObj.season) === "string")
        {   
            let query_prop = 'seasonRate.'+filterObj.season;
            season_filter.push(generateSeasonQuery(query_prop))
        }
        else
        {
            for(let s of filterObj.season)
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


    if(filterObj.sort)
    {
        switch (filterObj.sort) {
            case 'price':
                filterQuery.push({      
                    "$sort": {'display_price' : 1}    
               })
                break;
            case 'price_desc':
                filterQuery.push({      
                    "$sort": {'display_price' : -1}    
               })
                break;
            case 'az':
                filterQuery.push({      
                    "$sort": {'Product_name' : 1}    
               })
                break;
            case 'za':
                filterQuery.push({      
                    "$sort": {'Product_name' : -1}    
               })
                break;
        }
    }

    return filterQuery;
}




module.exports = new PipeLineGenerator()