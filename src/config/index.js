const redisConfig = require('./redis');
const serverConfig = require('./server');
const mongoConfig = require('./mongodb');
const amqpConfig = require('./amqp');

module.exports = {
  redisConfig,
  serverConfig,
  mongoConfig,
  amqpConfig,
};
