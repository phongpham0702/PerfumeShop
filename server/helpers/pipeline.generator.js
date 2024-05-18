const filterBuilder = require('./Filter/filterBuilder');
const converterHelper = require('./converter.helper');

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

    generate_productPageWithFilter = (productPerPage , currentPage, Filter) => {

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

    generate_getAllBrand = () =>{
        let pipeline =[
            {
                '$group':{
                    '_id': "$productBrand",
                    'productNum': { '$count':{} }
                }
            },
            {
                '$project':{
                    '_id': 0,
                    'brand' : "$_id",
                    'productNum': 1
                }
            },
            {
                '$sort':{
                    'brand': 1
                }
            }
        ]

        return pipeline
    }
}


function generateFilter(filterObj)
{   

    if (filterObj.search) 
    {
        filterBuilder.addSearchFilter(filterObj.search)    
    }

    if(filterObj.brand)
    {
        let brandName = filterObj.brand.replaceAll("-"," ")
        filterBuilder.addBrandFilter(brandName)
    }

    if(filterObj.gender)
    {
        filterBuilder.addGenderFilter(filterObj.gender)
    }

    if(filterObj.price)
    {
        let priceRange = filterObj.price.split("-")
        let minPrice = priceRange[0]
        let maxPrice = priceRange[1]

        filterBuilder.addPriceFilter(minPrice,maxPrice)
    }
    
    if(filterObj.season)
    {   
        filterBuilder.addSeasonFilter(filterObj.season)
    }


    if(filterObj.sort)
    {
        filterBuilder.addSortFilter(filterObj.sort)
    }
    console.log(filterBuilder.filter);
    return filterBuilder.build();
}




module.exports = new PipeLineGenerator()