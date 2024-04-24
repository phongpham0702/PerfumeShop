const JWT = require('jsonwebtoken')
const {AuthFailureError, NotFoundError} = require('../helpers/error.response')
const KeyTokenService = require('../services/keyToken.service')

const HEADER = {
    CLIENT_ID:'x-client-id',
    AUTHORIZATION: 'authorization'
}

const authentication = async (req,res,next) => {

    let userId = req.headers[HEADER.CLIENT_ID]

    if(!userId) throw new AuthFailureError('Invalid request')

    let keyStore = await KeyTokenService.findUserKeyById(userId)

    if(!keyStore) throw new NotFoundError('Cannot find user key store')
    

    let accessToken = req.headers[HEADER.AUTHORIZATION]

    if(!accessToken) throw new AuthFailureError('Invalid request')

    try 
    {   
        let decodeToken = await JWT.verify(accessToken, keyStore.publicKey)

        if(userId !== decodeToken.userId) throw new AuthFailureError("Invalid user")

        req.keyStore = keyStore
        
        return next()
    } 
    catch (error) 
    {
        throw new AuthFailureError("Cannot authenticate user")   
    }

}

const verifyJWT = async(token, keySecret) => {
    return await JWT.verify(token,keySecret)
}

module.exports = {
    authentication,
    verifyJWT
}