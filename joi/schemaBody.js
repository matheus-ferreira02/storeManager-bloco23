const Joi = require('joi');

const schemaBody = Joi.object({
  name: Joi.string().min(5).required().messages({
    'any.required': '"name" is required',
    'string.min': '"name" length must be at least 5 characters long',
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': '"quantity" is required',
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
});

module.exports = schemaBody;
