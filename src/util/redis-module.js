const redis = require('redis'),
    { redisConfig } = require('../config'),
    REDIS_KEY = Symbol.for(redisConfig.SYMBOL),
    client = redis.createClient({ port: redisConfig.PORT });

const register = () => {
    if (!global[REDIS_KEY]) {
        global[REDIS_KEY] = {
            client
        };
    }
}

const get = (key) => {
    return new Promise((resolve, reject) => {
        const redisClient = global[REDIS_KEY].client;

        redisClient.get(key, (err, value) => {
            if (err) return reject(err);
            resolve(value);
        });
    });
}

const set = (key, value) => {
    return new Promise((resolve, reject) => {
        const redisClient = global[REDIS_KEY].client;

        redisClient.set(key, value, (err) => {
            if (err) return reject(err);
            resolve();
        });
    });
}

const testConnection = async () => {
    try {
        await set('test-key', 'test');

        const testValue = await get('test-key');
        console.log(testValue);
    }
    catch (ex) {
        console.log(`Couldn't test redis connection: ${ex}`);
        throw ex;
    }
}

module.exports = {
    get,
    set,
    register,
    testConnection,
};