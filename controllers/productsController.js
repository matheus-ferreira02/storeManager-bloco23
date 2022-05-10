const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const response = await productsService.getAll();

  return res.status(200).json(response);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getProductById(id);

  return res.status(200).json(response);
};

module.exports = {
  getAll,
  getProductById,
};
