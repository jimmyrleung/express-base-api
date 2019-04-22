const env = process.env.NODE_ENV.trim() || 'development';

module.exports = require(`./config.${env}`);