const winston = require('./winston');

module.exports = {

  emerg: (message) => {
    winston.logger.emerg(message);
  },
  alert: (message) => {
    winston.logger.alert(message);
  },
  crit: (message) => {
    winston.logger.crit(message);
  },
  error: (message, error = {}) => {
    if (Object.keys(error).length > 0) {
      winston.logger.error(`${message} - `, error);
      return;
    }

    winston.logger.error(message);
  },
  warning: (message) => {
    winston.logger.warning(message);
  },
  info: (message) => {
    winston.logger.info(message);
  },
  debug: (message) => {
    winston.logger.debug(message);
  },
};
