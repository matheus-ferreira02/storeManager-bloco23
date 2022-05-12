const schemaId = require('../joi/schemaSales');
const createObjError = require('../helpers/createObjError');

const validateId = (req, _res, next) => {
  const { id } = req.params;
  const { error } = schemaId.validate(id);
  
  if (error) next(createObjError(400, error.message));

  next();
};

module.exports = validateId;
