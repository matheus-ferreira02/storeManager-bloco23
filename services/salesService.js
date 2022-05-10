const createError = require('../helpers/createObjError');
const salesModel = require('../models/salesModel');

const getAll = async () => {
  const response = await salesModel.getAll();

  return response;
};

const getSaleById = async (id) => {
  const [response] = await salesModel.getSaleById(id);

  if (!response) throw createError(404, 'Sale not found');

  return response;
};

module.exports = {
  getAll,
  getSaleById,
};
