const productsModel = require('../models/productsModel');

const getAll = async () => {
  const response = await productsModel.getAll();

  return response;
};

const getProductById = async (id) => {
  const [response] = await productsModel.getProductById(id);

  const err = { status: 404, message: 'Product not found' };

  if (!response) throw err;

  return response;
};

module.exports = {
  getAll,
  getProductById,
};
