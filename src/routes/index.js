const todoRoutes = require('./todo');
const authRoutes = require('./auth');
const userRoutes = require('./user');

const registerRoutes = (express) => {
  authRoutes(express);
  userRoutes(express);
  todoRoutes(express);
};

module.exports = { registerRoutes };
