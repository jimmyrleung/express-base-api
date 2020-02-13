const jwt = require('jsonwebtoken');
const { serverConfig } = require('../config');
const logger = require('./logger');

/**
 * @param {Object} payload The JWT payload
 * @param {Number} expiration The token expiration (in days)
 */
const generate = (payload = {}, expiration = 1) => (
  jwt.sign(payload, serverConfig.JWT_SECRET, {
    expiresIn: expiration * 24 * 60 * 60,
  })
);

const verify = token => {
  try {
    const decoded = jwt.verify(token, serverConfig.JWT_SECRET);
    return { valid: true, decoded };
  } catch (err) {
    logger.error(`Error while trying to verify the token ${token}`, err);
    return { valid: false, decoded: null };
  }
};

const decode = token => {
  try {
    return jwt.decode(token);
  } catch (err) {
    logger.error(`Error while trying to decode the token ${token}`, err);
    return null;
  }
};

module.exports = {
  generate,
  verify,
  decode,
};
