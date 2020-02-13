const redis = require('redis');
const { redisConfig } = require('../config');
const { redisConstants } = require('../constants');
const logger = require('./logger');

const REDIS_KEY = Symbol.for(redisConfig.SYMBOL);

const register = () => {
  if (!global[REDIS_KEY]) {
    const client = redis.createClient({
      port: redisConfig.PORT,
      host: redisConfig.HOST,
    });

    global[REDIS_KEY] = {
      client,
    };
  }
};

const get = key => {
  return new Promise((resolve, reject) => {
    const redisClient = global[REDIS_KEY].client;

    redisClient.get(key, (err, value) => {
      if (err) {
        logger.error(redisConstants.GET_VALUE_ERROR, err);
        return reject(err);
      }

      return resolve(value);
    });
  });
};

const set = (key, value) => {
  return new Promise((resolve, reject) => {
    const redisClient = global[REDIS_KEY].client;

    redisClient.set(key, value, (err) => {
      if (err) {
        logger.error(redisConstants.SET_VALUE_ERROR, err);
        return reject(err);
      }
      return resolve();
    });
  });
};

const testConnection = async () => {
  try {
    await set('test-key', 'test');

    await get('test-key');
    console.log(redisConstants.CONNECTION_SUCCEEDED);
    logger.info(redisConstants.CONNECTION_SUCCEEDED);
  } catch (ex) {
    console.log(redisConstants.CONNECTION_FAILED, ex);
    logger.error(redisConstants.CONNECTION_FAILED, ex);
    throw ex;
  }
};

module.exports = {
  get,
  set,
  register,
  testConnection,
};
