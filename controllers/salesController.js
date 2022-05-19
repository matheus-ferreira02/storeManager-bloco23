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
  const response = await salesService.registerSale(req.body);

  res.status(201).json(response);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const response = await salesService.updateSale(id, req.body);

  return res.status(200).json(response);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;

  await salesService.deleteSale(id);

  return res.status(204).end();
};

module.exports = {
  getAll,
  getSaleById,
  registerSale,
  updateSale,
  deleteSale,
};
