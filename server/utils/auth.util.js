const JWT = require('jsonwebtoken')
const {AuthFailureError, NotFoundError, LockedError} = require('../helpers/error.response')
const { findKeyById, deleteKeyById } = require('../models/reposities/keystore.repo')
const converterHelper = require('../helpers/converter.helper')
const { findUserById } = require('../models/reposities/user.repo')

const HEADER = {
    AUTHORIZATION: 'authorization',
}

const authentication = async (req,res,next) => {

    let token_id = req.signedCookies.token_id
    
    if(!token_id) throw new AuthFailureError()
    
    let keyStore = await findKeyById(token_id)
    
    if(!keyStore) throw new NotFoundError()
    
    let accessToken = req.headers[HEADER.AUTHORIZATION]

    if(!accessToken) throw new AuthFailureError()

    try 
    {   
        
        let decodedToken = await JWT.verify(accessToken, keyStore.publicKey,(err,decode) => {
            if(err)
            {   
                throw err
            }

            return decode
        })

        if(keyStore.userId.toString() !== decodedToken.userId) throw new AuthFailureError('Invalid user ID')

        req.keyStore = keyStore
        req.userid = converterHelper.toObjectIdMongo(decodedToken.userId)
        req.tokenid = token_id
        return next()
    } 
    catch (error) 
    {   
        if(error.name === "TokenExpiredError") {throw new LockedError("Your token is expired")}
        throw new AuthFailureError("Cannot authenticate user")   
    }

}

const protectTokenProvider = async (req,res,next) => {

    let token_id = req.signedCookies.token_id

    if(!token_id){ throw new AuthFailureError()}

    let currentAccessToken = req.headers[HEADER.AUTHORIZATION]

    if(!currentAccessToken) throw new AuthFailureError()

    let keyStore = await findKeyById(token_id)
    
    if(!keyStore) throw new AuthFailureError("Your login session is end")

    try 
    {   
        
        let decodedToken = await JWT.verify(keyStore.refreshToken, keyStore.privateKey,(err,decode) => {
            if(err)
            {   
                throw err
            }

            return decode
        })
        if(currentAccessToken != keyStore.activeAccessToken)
        {   
            throw new AuthFailureError()
        } 

        const foundUser = await findUserById(decodedToken.userId,
        {
            "Password":1
        })
        if(decodedToken.userPass != foundUser.Password)
        {
            throw new AuthFailureError()
        }

        req.keyStore = keyStore
        req.refreshData = decodedToken

        return next()
    } 
    catch (error) 
    {    
        deleteKeyById(token_id)
        throw new AuthFailureError("Unable to authenticate user. Please login again !")   
    }


}



module.exports = {
    authentication,
    protectTokenProvider
}