const express = require('express');

const app = express();

const { SERVER_PORT } = require('./config/config');

module.exports = () => {
  app.get('/', (req, res) => res.send('Hello World!'));

  // eslint-disable-next-line no-console
  app.listen(SERVER_PORT, () => console.log(`App listening on port ${SERVER_PORT}.`));
};
