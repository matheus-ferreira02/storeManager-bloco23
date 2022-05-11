const validateBody = (req, _res, next) => {
  const { name, quantity } = req.body;

  const { error } = schemaBody.validate({ name, quantity });

  if (error) console.log(error);

  next();
};

module.exports = validateBody;
