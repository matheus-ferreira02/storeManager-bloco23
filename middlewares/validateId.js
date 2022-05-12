const schemaId = require('../joi/schemaSales');
const createObjError = require('../helpers/createObjError');

const validateId = (req, _res, next) => {
  const { error } = schemaId.validate(req.body);
  
  if (error) next(createObjError(400, error.message));

  next();
};

module.exports = validateId;
