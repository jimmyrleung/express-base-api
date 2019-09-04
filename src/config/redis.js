module.exports = {
  HOST: process.env.REDIS_HOST,
  PORT: parseInt(process.env.REDIS_PORT),
  SYMBOL: process.env.REDIS_KEY_SYMBOL,
};
