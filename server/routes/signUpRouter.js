const express = require("express")
const router = express.Router()

const signUpController = require("../controllers/signUpController")
const signUpValidator = require("../controllers/validators/signupValidator")

router.route("/")
.post(signUpValidator,
        signUpController.signUp)

module.exports = router