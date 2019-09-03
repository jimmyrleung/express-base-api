const jwt = require('jsonwebtoken');
const { serverConfig } = require('../config');

/**
 * 
 * @param {Object} payload The JWT payload
 * @param {Number} expiration The token expiration (in days)
 */
const generate = (payload = {}, expiration = 1) => {
    return jwt.sign(payload, serverConfig.JWT_SECRET, {
        expiresIn: expiration * 24 * 60 * 60
    });
}

const verify = (token) => {
    try {
        const decoded = jwt.verify(token, serverConfig.JWT_SECRET);
        return { valid: true, decoded }
    }
    catch (err) {
        return { valid: false, decoded: null }
    }
}

const decode = () => {
    try {
        return jwt.decode(token);
    }
    catch (err) {
        return null;
    }
}

module.exports = {
    generate,
    verify,
    decode
}