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

const updateProduct = async (id, name, quantity) => {
  const query = `
    UPDATE
      StoreManager.products
    SET name = ?,
        quantity = ?
    WHERE id = ?`;
  
  await connection.execute(query, [id, name, quantity]);
};

const getProductByName = async (name) => {
  const query = `
      SELECT * FROM StoreManager.products WHERE name = ?`;

  const [response] = await connection.execute(query, [name]);

  return response;
};

const deleteProduct = async (id) => {
  const query = `
    DELETE FROM
      StoreManager.products
    WHERE id = ?`;

  await connection.execute(query, [id]);
};

module.exports = {
  getAll,
  getProductById,
  createProduct,
  getProductByName,
  updateProduct,
  deleteProduct,
};
