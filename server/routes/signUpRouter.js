const express = require("express")
const router = express.Router()

const signUpController = require("../controllers/signUpController")
const userModel = require("../models/users")
router.post("/",(req,res,next)=> {
    
    // let d = req.body
    // let dob = new Date(d.dob)
    // console.log(dob);
    // console.log(dob.getFullYear());
    console.log(req.body);
    

    return res.status(200).json({"msg":"success"})
})


module.exports = router