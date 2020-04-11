const { options } = require('../../common/schemaConfig');
const { ValidationError } = require('../../common/errors');

function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, options);
    if (error && error.isJoi) {
      throw new ValidationError(error.details);
    }
    next();
  };
}

module.exports = { validateSchema };
