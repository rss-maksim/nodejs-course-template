const usersService = require('./user.service');
const { options } = require('../../common/schemaConfig');
const { NotFoundError, ValidationError } = require('../../common/errors');

// function errorResponse(schemaErrors) {
//   const errors = schemaErrors.map(error => {
//     const { path, message } = error;
//     return { path, message };
//   });
//   return {
//     status: 'error',
//     errors
//   };
// }

function validateSchema(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, options);
    if (error && error.isJoi) {
      throw new ValidationError(error.details);
    }
    next();
  };
}

async function validateUnique(req, res, next) {
  const isUnique = await usersService.isUnique(req.body);
  if (!isUnique) {
    return res
      .status(400)
      .json({ status: 'error', message: 'This user has already registered' });
  }
  next();
}

async function validateExistence(req, res, next) {
  const { id } = req.params;
  const user = await usersService.getOne(id);
  if (!user) {
    throw new NotFoundError('Not found');
  }
  next();
}

module.exports = { validateSchema, validateExistence, validateUnique };
