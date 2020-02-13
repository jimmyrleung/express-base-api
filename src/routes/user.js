const { routeConstants } = require('../constants');
const { userController } = require('../domain/users');

module.exports = express => {
  express.route(routeConstants.USERS_URL)
    .post(userController.create);
};
