class FilterBuilder{

    constructor() {
        this.filter = [];
    }


    addSearchFilter(search)
    {
        this.filter.push(
            {    $addFields:{
                    'fullName': { $concat: ["$productBrand"," ","$productName"] }
                }
            },
            {
                $match:{
                    "fullName": { $regex: search.toString(), $options: "i" }
                }  
            },
            {
                $project:{
                    "fullName":0
                }
            }
        )
    }

    addBrandFilter(brand)
    {
        this.filter.push(
            {
                '$match': {'productBrand' : brand}
            }
        )
    }

    addGenderFilter(gender)
    {
        let genderFormat = Array.isArray(gender) ? gender : [gender] 

        this.filter.push(
            {
                '$match': {'productGender' :{'$in':genderFormat} }
            }
        )

    }

    addPriceFilter(minPrice,maxPrice)
    {
        this.filter.push(
            {
                '$match': {
                    'displayPrice':{
                        '$gte': parseInt(minPrice),
                        '$lte': parseInt(maxPrice)
                    }
                }
            }
        )
    }
    
    addSeasonFilter(season)
    {   
        const seasonAcceptRate = 0.65
        const seasonPath = {
            "Spring": "seasonRate.Spring",
            "Summer": "seasonRate.Summer",
            "Autumn": "seasonRate.Autumn",
            "Winter": "seasonRate.Winter",
        }

        let seasonFormat = Array.isArray(season) ? season : [season] 
        let seasonQuery = seasonFormat.map((s) => {
            let query = {}
            query[seasonPath[s]] = {'$gte': seasonAcceptRate}
            
            return query
        })
       
        this.filter.push({
            '$match': {
                '$and' :seasonQuery
            }
        })
    }


    addSortFilter(sortType)
    {
         switch (sortType) {
            case 'price':
                this.filter.push({
                    "$sort": {'displayPrice' : 1} 
                })
                break;
            case 'price_desc':
                this.filter.push({
                    "$sort": {'displayPrice' : -1} 
                })
                break;
            case 'az':
                this.filter.push({
                    "$sort": {'productName' : 1} 
                })
                break;
            case 'za':
                this.filter.push({
                    "$sort": {'productName' : -1} 
                })
                break;
        }
    }

    reset()
    {
        this.filter = []
    }

    build()
    {   
        let result = this.filter
        this.reset()
        return result
    }
}


module.exports = new FilterBuilder()