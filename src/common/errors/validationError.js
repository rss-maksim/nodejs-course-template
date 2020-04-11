const { BAD_REQUEST } = require('http-status-codes');

class ValidationError extends Error {
  constructor(errors) {
    super();
    this.status = 'error';
    this.statusCode = BAD_REQUEST;
    this.errors = errors;
  }
}

module.exports = ValidationError;
