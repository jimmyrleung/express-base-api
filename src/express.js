const bodyParser = require('body-parser');
const express = require('express');
const responseTime = require('response-time');

const { serverConfig } = require('./config');
const { registerRoutes } = require('./routes');
const { authentication, loggerLoader, enableCors } = require('./middlewares');

const app = express();

app.use(responseTime((req, res, time) => {
  console.log(`Response time: ${time}`);
}));

app.use(bodyParser.json());
app.use(enableCors);
app.all('*', loggerLoader, authentication);
registerRoutes(app);

module.exports = () => {
  // eslint-disable-next-line no-console
  app.listen(serverConfig.PORT, () => console.log(`App listening on port ${serverConfig.PORT}.`));
};
