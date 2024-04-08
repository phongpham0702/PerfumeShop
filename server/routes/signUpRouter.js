const express = require("express")
const router = express.Router()

const signUpController = require("../controllers/signUpController")

router.post("/",(req,res,next)=> {
    
    let d = req.body
    let dob = new Date(d.dob)
    console.log(dob);
    console.log(dob.getFullYear());

    return res.status(200).json({"msg":"success"})
})


module.exports = router