const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const response = await productsService.getAll();

  res.status(200).json(response);
};

module.exports = {
  getAll,
};
