const express = require('express');

const app = express();

const { serverConfig } = require('./config');

module.exports = () => {
  app.get('/', (req, res) => res.send('Hello World!'));

  // eslint-disable-next-line no-console
  app.listen(serverConfig.PORT, () => console.log(`App listening on port ${serverConfig.PORT}.`));
};
