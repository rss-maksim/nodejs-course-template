const Joi = require('@hapi/joi');

module.exports = Joi.object({
  id: Joi.string(),

  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  login: Joi.string()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@_]{3,30}$'))
});
