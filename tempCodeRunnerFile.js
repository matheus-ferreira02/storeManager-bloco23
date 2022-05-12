const connection = require('./models/connection');

const teste = async () => {
  const response = await connection.execute(`update
  StoreManager.products
set name = 'teste',
    quantity = 222
where id = 1`);

  console.log(response);
};

teste();
