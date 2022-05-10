const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT * FROM StorageManager.products';
  const [response] = await connection.execute(query);

  return response;
};

module.exports = {
  getAll,
};
