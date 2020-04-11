const { createLogger, format, transports } = require('winston');

const logInfoFormat = format.printf(({ level, message, timestamp }) => {
  const { method, url, body, query, statusCode } = message;
  return `[${level}]: [${timestamp}] ${method} ${url} ${statusCode}${body}${query}`;
});

module.exports = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), logInfoFormat),
  transports: [
    new transports.Console({
      format: format.combine(format.timestamp(), logInfoFormat),
      colorize: true
    }),
    new transports.File({
      filename: 'info.log',
      format: format.combine(format.timestamp(), logInfoFormat)
    })
  ]
});
