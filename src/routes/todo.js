const { routes } = require('../constants');
const { todoController } = require('../domain/todos');

module.exports = (express) => {
    express.route(routes.TODOS_URL)
        .get(todoController.getAll)
        .post(todoController.create);

    express.route(routes.TODOS_BY_ID_URL)
        .get(todoController.getById)
        .put(todoController.updateById)
        .delete(todoController.deleteById)
}