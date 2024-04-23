const {Types} = require('mongoose')
const seasonAcceptRate = 0.65;
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
                    '$project':
                    {   
                        '_id':1,
                        'productName': 1,
                        'productGender':1,
                        'productBrand': 1,
                        'displayPrice': {$min:"$priceScale.price"},
                        'productThumbnail': 1,
                    }
                },
        ]
    }

    generate_productDetail = ()=> {
        return [
   
            {
                '$project': {
                    '_id': 1,
                    'productName': 1,
                    'productBrand': 1,
                    'productGender':1,
                    'priceScale': 1,
                    'productFeatures':1,
                    'productScent':1,
                    'seasonRate':1,
                    'dayNightRate':1,
                    'productThumbnail': 1,
                    'productDescription':1,
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
                    displayPrice:{ $min: "$priceScale.price" }
                }   
            },
        ].concat(generateFilter(Filter))
        
        let pagePipeline = filterPipeLine.concat([

            {$skip : (productPerPage * currentPage) - productPerPage },
            {$limit : productPerPage},
            {
                $project:{
                    '_id': 1,
                    'productName': 1,
                    'productGender':1,
                    'productBrand': 1,
                    'displayPrice': 1,
                    'productThumbnail': 1,
                }
            }
        ])
        
        return {pagePipeline,filterPipeLine}

    }

    generate_bestSeller = (limit)=> {
        let bestSeller_PipeLine =[
                                
            {
                $sort :{"sold": -1}
            },
            {
                '$project':
                {   
                    '_id':1,
                    'productName': 1,
                    'productGender':1,
                    'productBrand': 1,
                    'displayPrice': {$min:"$priceScale.price"},
                    'productThumbnail': 1,
                }
            },
            {
                $group:{
                    _id: "$productGender",
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
                        'FullName': { $concat: ["$productBrand"," ","$productName"] }
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
                    _id:{$in: id_list}
                }
            },             
            {
                '$project':{
                    _id: 1,
                    productName: 1,
                    productBrand: 1,
                    displayPrice: {$min: "$priceScale.price"},
                    productThumbnail: 1,
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
            '$match': {'productBrand' : brandName}
        })
    }

    if((filterObj.gender) && (typeof(filterObj.gender) === "string"))
    {
        filterQuery.push({
            '$match': {'productGender' : filterObj.gender}
        })
    }

    if((filterObj.gender) && (typeof(filterObj.gender) === "object"))
    {
        filterQuery.push({
            '$match': {'productGender' :{'$in':[...filterObj.gender]} }
        })
    }

    if(filterObj.price)
    {
        let priceRange = filterObj.price.split("-")
        let minPrice = priceRange[0]
        let maxPrice = priceRange[1]

        filterQuery.push({
            '$match': {
                'displayPrice':{
                    '$gte': parseInt(minPrice),
                    '$lte': parseInt(maxPrice)
                }
            }
        })
    }
    
    if(filterObj.season)
    {   
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
            seasonFilterQuery[query_prop] = {'$gte': seasonAcceptRate}
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
                    "$sort": {'displayPrice' : 1}    
               })
                break;
            case 'price_desc':
                filterQuery.push({      
                    "$sort": {'displayPrice' : -1}    
               })
                break;
            case 'az':
                filterQuery.push({      
                    "$sort": {'productName' : 1}    
               })
                break;
            case 'za':
                filterQuery.push({      
                    "$sort": {'productName' : -1}    
               })
                break;
        }
    }

    return filterQuery;
}




module.exports = new PipeLineGenerator()