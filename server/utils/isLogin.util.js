const JWT = require('jsonwebtoken')
const {AuthFailureError, LockedError} = require('../helpers/error.response')
const { findKeyById} = require('../models/reposities/keystore.repo')
const converterHelper = require('../helpers/converter.helper')
const httpStatusCode = require('../helpers/httpStatusCode/httpStatusCode')

const HEADER = {
    AUTHORIZATION: 'authorization',
}

const isLogin = async (req,res,next) => {
    try 
    {  
        const token_id = req.signedCookies.token_id
        const accessToken = req.headers[HEADER.AUTHORIZATION]

        if(!token_id || !accessToken)
        {
            throw new AuthFailureError()
        }

        
        const keyStore = await findKeyById(token_id)
        
        if(!keyStore)
        {
            throw new AuthFailureError()
        }
    
        let decodedToken = await JWT.verify(accessToken, keyStore.publicKey,(err,decode) => {
            if(err)
            {   
                throw err
            }

            return decode
        })

        if(keyStore.userId.toString() !== decodedToken.userId) throw new AuthFailureError()

        req.userid = converterHelper.toObjectIdMongo(decodedToken.userId)

        return next()
    } 
    catch (error) 
    {   
        console.log(error.name);
        if(error.name === "TokenExpiredError" || error.name === "JsonWebTokenError") {
            req.checkLoginCode = httpStatusCode.StatusCodes.LOCKED
            throw new LockedError("Your provided token is not valid")
        }
        else{
            req.checkLoginCode = httpStatusCode.StatusCodes.UNAUTHORIZED   
        }
        req.userid = null
        return next()
    }

}


module.exports = {
    isLogin
}