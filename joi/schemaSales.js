const Joi = require('joi');

const schemaObjects = Joi.object({
  productId: Joi.number().required().messages({
    'any.required': '"productId" is required',
  }),
  quantity: Joi.number().min(1).required().messages({
    'any.required': '"quantity" is required',
    'number.min': '"quantity" must be greater than or equal to 1',
  }),
});

const schemaSales = Joi.array().items(schemaObjects);

module.exports = schemaSales;
