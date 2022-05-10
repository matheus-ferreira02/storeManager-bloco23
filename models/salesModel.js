const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.sales';
  const [response] = await connection.execute(query);

  return response;
};

const getSaleById = async (id) => {
  const query = `
  select
    sp.sale_id,
    sa.date,
    sp.product_id,
    sp.quantity
  from
    StoreManager.sales_products as sp
  inner join
    StoreManager.sales as sa on sa.id = sp.sale_id;`;
    
  const [response] = await connection.execute(query, [id]);

  return response;
};

module.exports = {
  getAll,
  getSaleById,
};