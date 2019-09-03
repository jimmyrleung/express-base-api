const {
    MONGO_HOST,
    MONGO_PORT,
    MONGO_USER,
    MONGO_PASSWORD,
    MONGO_DB,
} = process.env;

module.exports = {
    connectionString:
        `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${parseInt(MONGO_PORT)}/${MONGO_DB}`
};