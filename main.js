if (process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

const init = require('./src/express'),
    { redisModule, mongodb } = require('./src/util');

redisModule.register();
redisModule.testConnection();
mongodb.connect();
init();
