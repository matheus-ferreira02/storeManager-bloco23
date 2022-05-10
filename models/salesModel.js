const connection = require('./connection');

const getAll = async () => {
  const query = `
  SELECT
    sp.sale_id,
    sa.date,
    sp.product_id,
    sp.quantity
  FROM
    StoreManager.sales_products as sp
  INNER JOIN
    StoreManager.sales as sa on sa.id = sp.sale_id
  `;
  const [response] = await connection.execute(query);

  return response;
};

const getSaleById = async (id) => {
  const query = `
  SELECT
    sp.sale_id,
    sa.date,
    sp.product_id,
    sp.quantity
  FROM
    StoreManager.sales_products as sp
  INNER JOIN
    StoreManager.sales as sa on sa.id = sp.sale_id
  WHERE
    sale_id = ?
  `;
    
  const [response] = await connection.execute(query, [id]);

  return response;
};

module.exports = {
  getAll,
  getSaleById,
};
