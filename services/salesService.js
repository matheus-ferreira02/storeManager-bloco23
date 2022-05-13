const createError = require('../helpers/createObjError');
const salesModel = require('../models/salesModel');
const productsService = require('./productsService');

const serializeSales = (data) => ({
  saleId: data.sale_id,
  date: data.date,
  productId: data.product_id,
  quantity: data.quantity,
});

const serializeSalesById = (data) => ({
  date: data.date,
  productId: data.product_id,
  quantity: data.quantity,
});

const getAll = async () => {
  const response = await salesModel.getAll();

  const data = response.map(serializeSales);

  return data;
};

const getSaleById = async (id) => {
  const response = await salesModel.getSaleById(id);

  if (!response.length) throw createError(404, 'Sale not found');

  const data = response.map(serializeSalesById);

  return data;
};

const registerSale = async (saleProducts) => {
  await productsService.validateProductQuantity(saleProducts);
  const idSale = await salesModel.registerSale();

  const salesProductsPending = saleProducts
    .map((sale) => salesModel.registerSaleProduct(idSale, sale));

  const salesProductsResolved = await Promise.all(salesProductsPending);

  const dataSale = {
    id: idSale,
    itemsSold: [
      ...salesProductsResolved,
    ],
  };

  return dataSale;
};

module.exports = {
  getAll,
  getSaleById,
  registerSale,
};
