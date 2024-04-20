const express = require("express")
const router = express.Router()

const signUpController = require("../controllers/signUp.controller")
const signUpValidator = require("../controllers/validators/signupValidator")
const {errorHandler} = require("../middlewares/error_handler")

router.route("/")
.post(signUpValidator, errorHandler(signUpController.signUp))

module.exports = router