const { INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { errorLogger } = require('./logger');

// eslint-disable-next-line no-process-exit
const exit = () => process.exit(1);

const handleError = label => error =>
  errorLogger.error(
    {
      text: error.message,
      label,
      statusCode: INTERNAL_SERVER_ERROR
    },
    exit
  );

process
  .on('unhandledRejection', handleError('Unhandled Rejection'))
  .on('uncaughtException', handleError('Uncaught Exception'));

const { PORT } = require('./common/config');
const app = require('./app');
const connect = require('./db/db.client');

connect(() => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
});
