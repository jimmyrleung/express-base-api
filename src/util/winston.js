const path = require('path');
const {
  format,
  createLogger,
  transports,
  config,
} = require('winston');
const moment = require('moment');

// add custom logging levels
const levels = {
  ...config.syslog.levels,
  request: Math.max(Object.keys(config.syslog.levels)
    .map(key => config.syslog.levels[key])) + 1,
};

const colors = {
  ...config.syslog.colors,
  request: 'blue',
};

const getCurrentDateLogString = () => moment().format('DD/MM/YYYY HH:mm:ss');
const getCurrentDateFileString = () => moment().format('YYYY-MM-DD');
const logsPath = path.resolve(process.cwd(), 'logs', getCurrentDateFileString());

const logsFormat = format((info) => {
  let message = `${getCurrentDateLogString()} [${info.level.toUpperCase()}] ${info.message || ''}`;

  if (info.level === 'error' && info.stack) {
    message = `${message}\nStack:: ${info.stack}`;
  }

  return { ...info, message };
});

const fileLogOptions = {
  levels,
  colors,
  filename: `${logsPath}/logger.log`,
  json: false,
  // 5MB
  maxsize: 5242880,
  maxFiles: 5,
  colorize: true,
  format: format.combine(
    logsFormat(),
    format.printf(info => info.message),
  ),
};

module.exports = {
  logger: createLogger({
    exceptionHandlers: [
      // Refers to unhandled exceptions throughout the application
      new transports.File({
        filename: `${logsPath}/exceptions.log`,
      }),
    ],
    transports: [
      new transports.File({
        ...fileLogOptions,
        level: 'info',
      }),
    ],
    exitOnError: false,
  }),
};
