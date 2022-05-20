const createError = require('../helpers/createObjError');
const salesModel = require('../models/salesModel');
const productsService = require('./productsService');
const productsModel = require('../models/productsModel');

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

const updateQuantityProduct = async (sale, method) => {
  const product = await productsService.getProductById(sale.productId);
  const newQuantity = method === 'subtract'
    ? product.quantity - sale.quantity
    : product.quantity + sale.quantity;
  
  await productsModel.updateQuantityProduct(sale.productId, newQuantity);
};

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

  const updateQuantityProductsPending = saleProducts
    .map((sale) => updateQuantityProduct(sale, 'subtract'));

  Promise.all(updateQuantityProductsPending);

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

const updateSale = async (saleId, sale) => {
  await productsService.validateProductQuantity(sale);
  const [oldSale] = await getSaleById(saleId);
  await updateQuantityProduct(oldSale, 'add');
  await updateQuantityProduct(sale[0], 'sub');

  const response = await salesModel.updateSale(saleId, sale[0]);

  const updatedSale = {
    saleId,
    itemUpdated: [
      response,
    ],
  };

  return updatedSale;  
};

const deleteSale = async (id) => {
  const [sale] = await getSaleById(id);
  await updateQuantityProduct(sale, 'add');

  await salesModel.deleteSale(id);
};

module.exports = {
  getAll,
  getSaleById,
  registerSale,
  updateSale,
  deleteSale,
};
