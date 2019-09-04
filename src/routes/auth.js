const { routeConstants } = require('../constants');
const { authController } = require('../domain/auth');

module.exports = (express) => {
  express.route(routeConstants.LOGIN_URL)
    .post(authController.login);
};
