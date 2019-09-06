if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}

const init = require('./src/express');
const { redisModule, mongodb } = require('./src/util');
const mailer = require('./src/mail/mailer');

redisModule.register();
redisModule.testConnection();
mongodb.connect();
mailer.registerConsumer();
init();
