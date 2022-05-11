const schemaSales = require('../joi/schemaSales');
const createObjError = require('../helpers/createObjError');

const validateBodySales = (req, _res, next) => {
  const { error } = schemaSales.validate(req.body);
  
  if (error) {
    const { type } = error.details[0];
    const status = type.includes('min') ? 422 : 400;
    next(createObjError(status, error.message));
  }

  next();
};

module.exports = validateBodySales;
