const createObjError = require('../helpers/createObjError');
const createError = require('../helpers/createObjError');
const productsModel = require('../models/productsModel');

const getAll = async () => {
  const response = await productsModel.getAll();

  return response;
};

const getProductById = async (id) => {
  const [response] = await productsModel.getProductById(id);

  if (!response) throw createError(404, 'Product not found');

  return response;
};

const createProduct = async (name, quantity) => {
  const findProduct = await productsModel.getProductByName(name);

  if (findProduct.length) throw createObjError(409, 'Product already exists');

  const response = await productsModel.createProduct(name, quantity);

  return response;
};

const updateProduct = async (id, name, quantity) => {
  await getProductById(id);
  await productsModel.updateProduct(id, name, quantity);

  return {
    id,
    name,
    quantity,
  };
};

const deleteProduct = async (id) => {
  await getProductById(id);
  await productsModel.deleteProduct(id);
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
