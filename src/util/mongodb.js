const mongoose = require('mongoose');
const { mongoConfig } = require('../config');
const { mongoConstants } = require('../constants');
const logger = require('./logger');

const connect = async () => {
  try {
    await mongoose.connect(mongoConfig.connectionString, {
      useNewUrlParser: true,
    });
    logger.info(mongoConstants.CONNECTION_SUCCEEDED);
    console.log(mongoConstants.CONNECTION_SUCCEEDED);
  } catch (err) {
    logger.error(mongoConstants.CONNECTION_FAILED, err);
    console.log(mongoConstants.CONNECTION_FAILED, err);
  }
};

module.exports = { connect };
