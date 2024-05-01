const JWT = require('jsonwebtoken')
const {AuthFailureError, NotFoundError, LockedError} = require('../helpers/error.response')
const { findUserKeyById } = require('../models/reposities/keystore.repo')
const { removeUIDCookie, removeRTCookie } = require('../helpers/cookieHelpers/removeCookie.helper')

const HEADER = {
    AUTHORIZATION: 'authorization',
}

const authentication = async (req,res,next) => {

    let userId = req.cookies._uid_

    if(!userId) throw new AuthFailureError()
    
    let keyStore = await findUserKeyById(userId)
    
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

        if(userId !== decodedToken.userId) throw new AuthFailureError('Invalid user ID')

        req.keyStore = keyStore
        req.userid = decodedToken.userId
        return next()
    } 
    catch (error) 
    {   
        if(error.name === "TokenExpiredError") {throw new LockedError("Your token is expired")}
        throw new AuthFailureError("Cannot authenticate user")   
    }

}

const protectTokenProvider = async (req,res,next) => {

    let refreshToken = req.cookies['uRT']

    if(!refreshToken){
        removeUIDCookie(res)
        throw new AuthFailureError("Please login again !")
    }

    let userId = req.cookies['_uid_']
    
    if(!userId){
        removeRTCookie(res)
        throw new AuthFailureError("Please login again !")
    }

    let keyStore = await findUserKeyById(userId)
    
    if(!keyStore) throw new AuthFailureError("Please login again !")

    try 
    {   
        
        let decodedToken = await JWT.verify(refreshToken, keyStore.privateKey,(err,decode) => {
            if(err)
            {   
                throw err
            }

            return decode
        })

        if(userId !== decodedToken.userId) throw new AuthFailureError()

        req.keyStore = keyStore
        req.userid = decodedToken.userId
        req.refreshToken = refreshToken
        return next()
    } 
    catch (error) 
    {   
        throw new AuthFailureError("Please login again !")   
    }


}



module.exports = {
    authentication,
    protectTokenProvider
}