const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.products';
  const [response] = await connection.execute(query);

  return response;
};

const getProductById = async (id) => {
  const query = `
    SELECT * FROM StoreManager.products
    WHERE id = ?`;
    
  const [response] = await connection.execute(query, [id]);

  return response;
};

const createProduct = async (name, quantity) => {
  const query = `
    INSERT INTO
      StoreManager.products (name, quantity)
    VALUES
      (?, ?)
  `;

  const [{ insertId }] = await connection.execute(query, [name, quantity]);

  return {
    id: insertId,
    name,
    quantity,
  };
};

const getProductByName = async (name) => {
  const query = `
      SELECT * FROM StoreManager.products WHERE name = ?`;

  const [response] = await connection.execute(query, [name]);

  return response;
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
  getProductByName,
};
