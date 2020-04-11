const handleError = require('./errorHandler');
const handleInternalServerError = require('./internalServerErrorHandler');
const log = require('./log');

module.exports = { handleError, handleInternalServerError, log };
