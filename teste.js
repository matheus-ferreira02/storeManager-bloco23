const productsModels = require('./models/productsModel');

const teste = async (id) => {
  const response = await productsModels.getProductById(id);

  console.log(response);
};

teste(1);
