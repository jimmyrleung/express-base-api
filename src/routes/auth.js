const { routes } = require('../constants');
const { authController } = require('../domain/auth');

module.exports = (express) => {
    express.route(routes.LOGIN_URL)
        .post(authController.login);
}