const crypto = require('crypto-js');

module.exports.encryptAES = (data) => {
    return crypto.AES.encrypt(JSON.stringify(data), process.env.ENCODE_KEY).toString();
}

module.exports.decryptAES = (encode, secretKey) => {
    let bytes = crypto.AES.decrypt(encode, process.env.ENCODE_KEY);
    return JSON.parse(bytes.toString(crypto.enc.Utf8));
}
