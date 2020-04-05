const Joi = require('@hapi/joi');

module.exports = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .required(),

  login: Joi.string()
    .min(3)
    .max(30)
    .required(),

  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
});
