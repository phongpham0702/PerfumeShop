const removeTokenIDCookie = (response) => {
    response.clearCookie('token_id')
}

module.exports = {
    removeTokenIDCookie
}