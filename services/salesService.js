const createError = require('../helpers/createObjError');
const salesModel = require('../models/salesModel');

const serializeSales = (data) => ({
  saleId: data.sale_id,
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
  const [response] = await salesModel.getSaleById(id);

  if (!response) throw createError(404, 'Sale not found');

  const data = serializeSales(response);

  return data;
};

module.exports = {
  getAll,
  getSaleById,
};
