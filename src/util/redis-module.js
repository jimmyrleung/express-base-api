const redis = require('redis');
const { redisConfig } = require('../config');

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
      if (err) return reject(err);
      return resolve(value);
    });
  });
};

const set = (key, value) => {
  return new Promise((resolve, reject) => {
    const redisClient = global[REDIS_KEY].client;

    redisClient.set(key, value, (err) => {
      if (err) return reject(err);
      return resolve();
    });
  });
};

const testConnection = async () => {
  try {
    await set('test-key', 'test');

    const testValue = await get('test-key');
    console.log('Redis connection succeeded.');
  } catch (ex) {
    console.log(`Couldn't test redis connection: ${ex}`);
    throw ex;
  }
};

module.exports = {
  get,
  set,
  register,
  testConnection,
};
