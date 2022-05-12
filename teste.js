const connection = require('./models/connection');

const teste = async () => {
  const query = `insert INTO
  StoreManager.sales_products (sale_id, product_id, quantity)
VALUES
  (2, 1, 10)`;

  const response = await connection.execute(query);

  console.log(response);
};

teste();