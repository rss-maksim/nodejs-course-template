const Joi = require('@hapi/joi');

module.exports = Joi.object({
  id: Joi.string(),

  title: Joi.string()
    .min(3)
    .max(30)
    .required(),

  order: Joi.number().required(),

  description: Joi.string(),

  userId: Joi.string().allow(null),

  boardId: Joi.string().allow(null),

  columnId: Joi.string().allow(null)
});
