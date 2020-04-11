const { NOT_FOUND } = require('http-status-codes');

class NotFoundError extends Error {
  constructor(message) {
    super();
    this.status = 'error';
    this.statusCode = NOT_FOUND;
    this.message = message;
  }
}

module.exports = NotFoundError;
