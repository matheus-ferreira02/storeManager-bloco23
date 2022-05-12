const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const response = await salesService.getAll();

  return res.status(200).json(response);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.getSaleById(id);

  return res.status(200).json(response);
};

const registerSale = async (req, res) => {
  const salesProducts = req.body;
  const response = await salesService.registerSale(salesProducts);

  res.status(201).json(response);
};

module.exports = {
  getAll,
  getSaleById,
  registerSale,
};
