const amqp = require('amqplib/callback_api');
const { amqpConfig } = require('../config');
const { amqpConstants } = require('../constants');
const logger = require('./logger');

const connect = () => new Promise((resolve, reject) => {
  amqp.connect(amqpConfig, (err, connection) => {
    if (err) {
      console.log(amqpConstants.CONNECTION_FAILED, err);
      logger.error(amqpConstants.CONNECTION_FAILED, err);
      return reject(err);
    }

    logger.info(amqpConstants.CONNECTION_SUCCEEDED);
    console.log(amqpConstants.CONNECTION_SUCCEEDED);
    return resolve(connection);
  });
});

module.exports = {
  connect,
};
