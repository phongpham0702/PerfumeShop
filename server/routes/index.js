const express = require('express');
const router = express.Router();
//const g= require("../dbs/init.redis")
const fs = require('fs');
const axios = require('axios');
const productModel = require("../models/product")
/* GET home page. */
router.get('/', async function (req, res, next) {
  //req.co
  // let c = g.getRedis();
  // await c.set('ke22y', 'value3');
  // const value = await c.get('key');
  // console.log(value);
 
  return res.status(200).json({ Message: 'Nothing here!' });
});

module.exports = router;
