const init = require('./src/express'),
    { register, set, get } = require('./src/util/redis-module');

register();

async function testRedis() {
    await set('test-key', 'test');

    const testValue = await get('test-key');
    console.log(testValue);
}

testRedis();

init();
