const schemaBody = require('../joi/schemaBody');
const createObjError = require('../helpers/createObjError');

const validateBody = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = schemaBody.validate({ name, quantity });

  if (error) {
    const { type } = error.details[0];
    const status = type.includes('min') ? 422 : 400;
    next(createObjError(status, error.message));
  }

  next();
};

module.exports = validateBody;
