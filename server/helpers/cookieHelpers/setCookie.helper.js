const setUIDCookie = (uid,response) =>{
    response.cookie('_uid_', uid,{
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 604800000,
        signed: true
    })
}


const setRTCookie = (RT,response) => {
    response.cookie('uRT', RT,{
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: process.env.REFRESH_TOKEN_TIME,
        signed: true
    })
}

module.exports = {
    setUIDCookie,
    setRTCookie
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