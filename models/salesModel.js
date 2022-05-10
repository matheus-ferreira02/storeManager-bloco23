const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StoreManager.sales';
  const [response] = await connection.execute(query);

  return response;
};

const getSaleById = async (id) => {
  const query = `
    SELECT * FROM StoreManager.sale
    WHERE id = ?`;
    
  const [response] = await connection.execute(query, [id]);

  return response;
};

module.exports = {
  getAll,
  getSaleById,
};
