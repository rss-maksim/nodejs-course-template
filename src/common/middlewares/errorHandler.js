const { ValidationError, NotFoundError } = require('../errors');
const { errorLogger } = require('../../logger');

const handleError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const { status, statusCode, errors } = err;
    errorLogger.error({
      label: 'Validation Error',
      statusCode,
      text: JSON.stringify(errors)
    });
    res.status(statusCode).json({ status, statusCode, errors });
    return;
  }
  if (err instanceof NotFoundError) {
    const { status, statusCode, message } = err;
    console.log('handleError NotFoundError', { status, statusCode, message });
    errorLogger.error({ label: 'Not Found', statusCode, text: message });
    res.status(statusCode).json({ status, statusCode, message });
    return;
  }
  next(err);
};

module.exports = handleError;
