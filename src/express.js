const express = require('express');
const app = express();
const port = 3000;
const { SERVER_PORT } = require('./config/config');

module.exports = () => {
    const { } = config
    app.get('/', (req, res) => res.send('Hello World!'));
    app.listen(SERVER_PORT, () => console.log(`Example app listening on port ${SERVER_PORT}!`));
}
