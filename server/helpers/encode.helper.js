const crypto = require('crypto');

const key = crypto.scryptSync(process.env.ENCODE_KEY, process.env.ENCODE_SALT, 32);
const hash_algorithm = "aes-256-ecb"
class cryptoCipher {

     encrypt =(text)=>  {

        let cipher = crypto.createCipheriv(hash_algorithm, key, null);
        let encrypted = cipher.update(text, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    decrypt = (encryptedText) => {
        let decipher = crypto.createDecipheriv(hash_algorithm, key, null);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted.toString();
    }

}

module.exports = new cryptoCipher()


