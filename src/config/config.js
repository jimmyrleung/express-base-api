const env = process.env.NODE_ENV.trim() || 'development';

// eslint-disable-next-line import/no-dynamic-require
module.exports = require(`./config.${env}`);
