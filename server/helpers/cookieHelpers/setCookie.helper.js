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
        maxAge: 604800000,
        signed: true
    })
}

module.exports = {
    setUIDCookie,
    setRTCookie
}