require('dotenv').config();

const init = require('./src/express'),
    redisModule = require('./src/util/redis-module');

redisModule.register();
redisModule.testConnection();
init();
