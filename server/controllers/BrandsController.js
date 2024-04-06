const brandModel = require('../models/brands');
const productModel = require('../models/product');

const brandController = {
  getAllBrands: async (req, res, next) => {
    try {
      let brands = await brandModel.find(
        {},
        {
          _id: 0,
          BID: 1,
          Name: 1,
          Products_num: 1,
          Products_list: 0,
        }
      );

      return res.status(200).json({ brands });
    } catch (error) {
      console.log(error);
      next();
    }
  },

  getBrandProducts: async (req, res, next) => {
    try {
      let brand_id = req.params.bid;
      let pipeLine = [
        {
          $addFields: {
            display_price: { $min: '$priceScale.Price' },
          },
        },
        {
          $lookup: {
            from: 'brands',
            localField: 'Product_brand',
            foreignField: 'BID',
            as: 'brandInfo',
          },
        },
        {
          $project: {
            PID: 1,
            Product_name: 1,
            Brand_Name: { $arrayElemAt: ['$brandInfo.Name', 0] },
            display_price: 1,
            Pictures: 1,
          },
        },
      ];
      console.log(products);
      return res.status(200).json({ m: 'hello' });
    } catch (error) {
      console.log(error);
      next();
    }
  },
};

module.exports = brandController;
