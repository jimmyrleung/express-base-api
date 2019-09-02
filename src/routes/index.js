const todoRoutes = require('./todo');

const registerRoutes = (express) => {
    todoRoutes(express);
}

module.exports = { registerRoutes };