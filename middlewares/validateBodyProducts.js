const schemaProducts = require('../joi/schemaProducts');
const createObjError = require('../helpers/createObjError');

const validateBodyProducts = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = schemaProducts.validate({ name, quantity });

  if (error) {
    const { type } = error.details[0];
    const status = type.includes('min') ? 422 : 400;
    next(createObjError(status, error.message));
  }

  next();
};

module.exports = validateBodyProducts;
