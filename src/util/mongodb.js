const mongoose = require('mongoose');
const { mongoConfig } = require('../config');

const connect = async () => {
    try {
        await mongoose.connect(mongoConfig.connectionString, { useNewUrlParser: true });
        console.log("MongoDB connection succeeded.");
    }
    catch (err) {
        console.log("Error while trying to connect to the database: ", err);
    }
}

module.exports = { connect }