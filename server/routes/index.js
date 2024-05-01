const express = require('express');
const router = express.Router();
const g= require("../dbs/init.redis")
const fs = require('fs');
const axios = require('axios');
const productModel = require("../models/product")
const gen = require('../helpers/pipeline.generator')
/* GET home page. */
router.get('/', async function (req, res, next) {
  //req.co
  // let c = g.getRedis();
  // await c.set('ke22y', 'value3');
  // const value = await c.get('key');
  // console.log(value);
  //let c = g.get_Redis();
  //let a = gen.generate_productWithPageNumber()
  //console.log(a);
  //let p = await productModel.aggregate(a)
  //console.log(p);
  return res.status(200).json({ Message: 'Nothing here!' });
});

module.exports = router;
