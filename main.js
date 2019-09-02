require('dotenv').config();

const init = require('./src/express'),
    { register, set, get } = require('./src/util/redis-module');

register();

async function testRedisConnection() {
    try {
        await set('test-key', 'test');

        const testValue = await get('test-key');
        console.log(testValue);
    }
    catch (ex) {
        console.log(`Couldn't test redis connection: ${ex}`);
    }
}

testRedisConnection();

init();
