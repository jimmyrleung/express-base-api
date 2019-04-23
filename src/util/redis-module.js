const redis = require('redis'),
    config = require('../config/config'),
    REDIS_KEY = Symbol.for(config.SYMBOLS.redis),
    client = redis.createClient({ port: config.REDIS_CONFIG.port });

module.exports = {
    register: () => {
        if (!global[REDIS_KEY]) {
            global[REDIS_KEY] = {
                client
            };
        }
    },
    get: (key) => {
        return new Promise((resolve, reject) => {
            const redisClient = global[REDIS_KEY].client;

            redisClient.get(key, (err, value) => {
                if (err) return reject(err);
                resolve(value);
            });
        });
    },

    set: (key, value) => {
        return new Promise((resolve, reject) => {
            const redisClient = global[REDIS_KEY].client;

            redisClient.set(key, value, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    }

};