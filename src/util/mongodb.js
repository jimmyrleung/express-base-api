const mongoose = require('mongoose');
const { mongoConfig } = require('../config');
const logger = require('./logger');

const connect = async () => {
  const messages = {
    succeeded: 'MongoDB connection succeeded.',
    error: 'Error while trying to connect to the database: ',
  };

  try {
    await mongoose.connect(mongoConfig.connectionString, {
      useNewUrlParser: true,
    });
    logger.info(messages.succeeded);
    console.log(messages.succeeded);
  } catch (err) {
    logger.error(messages.error, err);
    console.log(messages.error, err);
  }
};

module.exports = { connect };
