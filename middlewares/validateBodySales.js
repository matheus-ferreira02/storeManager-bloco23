const schemaSales = require('../joi/schemaSales');
const createObjError = require('../helpers/createObjError');

const validateBodySales = (req, _res, next) => {
  req.body.forEach(({ productId, quantity }) => {
    const { error } = schemaSales.validate({ productId, quantity });

    if (error) {
      const { type } = error.details[0];
      const status = type.includes('min') ? 422 : 400;
      next(createObjError(status, error.message));
    }
  });

  next();
};

module.exports = validateBodySales;
