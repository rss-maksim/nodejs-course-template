const { options } = require('../../common/schemaConfig');

function errorResponse(schemaErrors) {
  const errors = schemaErrors.map(error => {
    const { path, message } = error;
    return { path, message };
  });
  return {
    status: 'error',
    errors
  };
}

function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, options);
    if (error && error.isJoi) {
      return res.status(400).json(errorResponse(error.details));
    }
    next();
  };
}

module.exports = { validateSchema };
