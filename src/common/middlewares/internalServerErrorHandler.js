const { INTERNAL_SERVER_ERROR } = require('http-status-codes');

const { errorLogger } = require('../../logger');

// eslint-disable-next-line
const handleInternalServerError = (err, req, res, next) => {
  const text = err.message || err.text;

  errorLogger.error({
    label: 'Internal Server Error',
    statusCode: INTERNAL_SERVER_ERROR,
    text
  });
  res.status(INTERNAL_SERVER_ERROR).json({
    status: 'error',
    code: INTERNAL_SERVER_ERROR,
    error: 'Internal Server Error',
    description: text
  });
};

module.exports = handleInternalServerError;
