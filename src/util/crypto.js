const crypto = require('crypto');

const generateSalt = (length) => {
    return crypto.randomBytes(128).toString('hex').slice(0, length);
}

const generateHash = (text, salt = null) => {
    const _salt = salt ? salt : generateSalt(10);
    const preHash = crypto.createHmac('sha512', _salt);
    preHash.update(text);
    const hash = preHash.digest('hex');

    return { salt: _salt, hash };
}

module.exports = {
    generateHash, generateSalt
}