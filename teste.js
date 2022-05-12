const saleRegister = require('./services/salesService');

const teste = async () => {
  const testafe = [
    {
      productId: 1,
      quantity: 3,
    },

    {
      productId: 2,
      quantity: 6,
    },
  ];
  const ola = await saleRegister.registerSale(testafe);
  console.log(ola);
};

teste();