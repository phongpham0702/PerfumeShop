const setUIDCookie = (uid,response) =>{
    response.cookie('_uid_', uid,{
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 604800000,
        sign: true
    })
}


const setRTCookie = (RT,response) => {
    response.cookie('uRT', RT,{
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 604800000,
        sign: true
    })
}

module.exports = {
    setUIDCookie,
    setRTCookie
}