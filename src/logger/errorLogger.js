const { createLogger, format, transports } = require('winston');
const { isEmpty } = require('ramda');

const formatValue = value =>
  Boolean(value) && !isEmpty(value) ? `: ${value}` : '';

const logErrorFormat = format.printf(({ level, message, timestamp }) => {
  const { text, label, statusCode } = message;
  return `[${level}]: [${timestamp}] [${statusCode}] ${label}${formatValue(
    text
  )}`;
});

module.exports = createLogger({
  level: 'error',
  format: format.combine(format.timestamp(), logErrorFormat),
  transports: [
    new transports.Console({
      level: 'error',
      format: format.combine(format.timestamp(), logErrorFormat),
      colorize: true
    }),
    new transports.File({
      filename: 'error.log',
      level: 'error',
      format: format.combine(format.timestamp(), logErrorFormat)
    })
  ]
});
