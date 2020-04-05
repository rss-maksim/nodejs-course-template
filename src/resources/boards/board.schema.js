const Joi = require('@hapi/joi');

module.exports = Joi.object({
  id: Joi.string(),

  title: Joi.string()
    .min(3)
    .max(30)
    .required(),

  columns: Joi.array().items(
    Joi.object({
      id: Joi.string(),
      title: Joi.string().required(),
      order: Joi.number()
    })
  )
});
