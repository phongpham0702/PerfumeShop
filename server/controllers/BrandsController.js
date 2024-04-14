const brandModel = require('../models/brands');
const productModel = require('../models/product');

const brandController = {
  getAllBrands: async (req, res, next) => {
    try {
      let brands = await brandModel
        .find({})
        .select(['BID', 'Name', 'Products_num']);

      return res.status(200).json({ brands });
    } catch (error) {
      console.error(error);
      next();
    }
  },

};

module.exports = brandController;
