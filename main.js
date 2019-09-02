require('dotenv').config();

const init = require('./src/express'),
    { redisModule } = require('./src/util');

redisModule.register();
redisModule.testConnection();
init();
