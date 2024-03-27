const brandModel = require("../models/brands")
const productModel = require("../models/product")

const brandController = {
    getAllBrands : async (req,res,next) => {

        try 
        {   
            let brands = await brandModel.find({},{
                _id:0,
                BID:1,
                Name:1,
                Products_num:1,
                Products_list:1
            })
            
            return res.status(200).json({brands});
        } 
        catch (error) {
            console.log(error);
            next();    
        }

    }
}

module.exports = brandController