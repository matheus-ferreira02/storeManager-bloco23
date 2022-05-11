const schemaSales = require('../joi/schemaSales');
const createObjError = require('../helpers/createObjError');

const validateBodyProducts = (req, _res, next) => {
  const { productId, quantity } = req.body;

  const { error } = schemaSales.validate({ productId, quantity });

  if (error) {
    const { type } = error.details[0];
    const status = type.includes('min') ? 422 : 400;
    next(createObjError(status, error.message));
  }

  next();
};

module.exports = validateBodyProducts;
