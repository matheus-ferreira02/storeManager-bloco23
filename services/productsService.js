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

const validateProductQuantity = async (products) => {
  const productsPending = products
    .map(({ productId }) => getProductById(productId));

  const productsResolved = await Promise.all(productsPending);

  const isInvalideQuantity = productsResolved
    .some((productDatabase, index) => productDatabase.quantity < products[index].quantity);

  if (isInvalideQuantity) {
    throw createError(422, 'Such amount is not permitted to sell');
  }
};

const createProduct = async (name, quantity) => {
  const findProduct = await productsModel.getProductByName(name);

  if (findProduct.length) throw createError(409, 'Product already exists');

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
  validateProductQuantity,
};
