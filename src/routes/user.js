const { routes } = require('../constants');
const { userController } = require('../domain/users');

module.exports = (express) => {
    express.route(routes.USERS_URL)
        .post(userController.create);
}