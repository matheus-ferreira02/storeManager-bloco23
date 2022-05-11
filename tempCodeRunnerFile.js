const req = require('./models/productsModel');

const teste = async () => {
  const response = await req.createProduct('vei', 12);

  console.log(response);
};

teste();
