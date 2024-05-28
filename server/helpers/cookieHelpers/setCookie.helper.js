const setTokenIDCookie = (tokenId, response) => {
    response.cookie("token_id", tokenId, {
        httpOnly: true,
        secure: true,
        sameSite:'none',
        maxAge: process.env.REFRESH_TOKEN_TIME,
        signed: true
    })
}

module.exports = {
    setTokenIDCookie
}

/* res.cookie('_uid_',result.userInfo.userId, 
{ 
    httpOnly: true,
    secure: false,
    sameSite: 'Lax',
    maxAge: 604800000,
    sign: true
}) */

/* res.cookie('uRT', result.refreshToken,{
httpOnly: true,
secure: false,
sameSite: 'Lax',
maxAge: 604800000,
sign: true
}) */