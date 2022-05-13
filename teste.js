const { validateProductQuantity } = require('./services/productsService');

const teste = async () => {
  await validateProductQuantity([
    {
      productId: 1,
      quantity: 11,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ]);
};

teste();
