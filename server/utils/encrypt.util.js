const crypto = require("crypto");
const encryptAlgorithm = "aes-128-gcm";
const key = crypto.scryptSync(process.env.ENCODE_KEY, process.env.ENCODE_SALT,16);
const iv = crypto.scryptSync(process.env.ENCODE_KEY, process.env.ENCODE_SALT,8)
const encrypt = (text) => {
    const cipher = crypto.createCipheriv(encryptAlgorithm, key, iv);
    let encryptedText = cipher.update(text, "utf-8", "hex");
    encryptedText += cipher.final("hex");
    return encryptedText;
}

const decrypt = (encryptedText) => {
    const decipher = crypto.createDecipheriv(encryptAlgorithm, key ,iv);
    let decrypted = decipher.update(encryptAlgorithm)
    decrypted += decipher.final("utf-8");
    return decrypted.toString();
}

module.exports = {
    encrypt,
    decrypt
}