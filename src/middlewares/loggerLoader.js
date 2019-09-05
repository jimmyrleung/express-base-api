const { logger } = require('../util');

const loggerLoader = (req, res, next) => {
  req.logger = logger;
  return next();
};

module.exports = loggerLoader;
