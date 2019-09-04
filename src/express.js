const bodyParser = require('body-parser');
const express = require('express');

const app = express();
const { serverConfig } = require('./config');
const { registerRoutes } = require('./routes');
const { authentication } = require('./middlewares');

app.use(bodyParser.json());
app.all('*', authentication);
registerRoutes(app);

module.exports = () => {
  // eslint-disable-next-line no-console
  app.listen(serverConfig.PORT, () => console.log(`App listening on port ${serverConfig.PORT}.`));
};
