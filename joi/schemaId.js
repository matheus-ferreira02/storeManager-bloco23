const Joi = require('joi');

const schemaId = Joi.number().required();

module.exports = schemaId;
