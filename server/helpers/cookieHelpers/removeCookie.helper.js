const removeUIDCookie = (response) => {
    response.clearCookie('_uid_')
}

const removeRTCookie = (response) => {
    response.clearCookie('uRT')
}

module.exports = {
    removeRTCookie,
    removeUIDCookie
}