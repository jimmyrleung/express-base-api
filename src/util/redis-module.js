const redis = require('redis');
const { redisConfig } = require('../config');
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

const get = (key) => {
  return new Promise((resolve, reject) => {
    const redisClient = global[REDIS_KEY].client;

    redisClient.get(key, (err, value) => {
      if (err) {
        logger.error('Error while trying to get value on Redis: ', err);
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
        logger.error('Error while trying to set value on Redis: ', err);
        return reject(err);
      }
      return resolve();
    });
  });
};

const testConnection = async () => {
  const messages = {
    succeeded: 'Redis connection succeeded.',
    failed: 'Couldn\'t test redis connection: ',
  };

  try {
    await set('test-key', 'test');

    await get('test-key');
    console.log(messages.succeeded);
    logger.info(messages.succeeded);
  } catch (ex) {
    console.log(messages.failed, ex);
    logger.error(messages.failed, ex);
    throw ex;
  }
};

module.exports = {
  get,
  set,
  register,
  testConnection,
};
