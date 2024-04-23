// const brandModel = require('../models/brands');
// const {ServerError} = require('../helpers/error.response')
// class BrandService{

//     static getAllBrands = async() => {
//         try {
//             let brands = await brandModel
//               .find({})
//               .select(['BID', 'Name', 'Products_num'])
//               .lean();
      
//             return {
//                 brands
//             };
//         } catch (error) {
//             throw new ServerError()
//         }
//     }

// }


// module.exports = BrandService