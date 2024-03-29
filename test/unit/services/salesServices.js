const sinon = require('sinon');
const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const productsService = require('../../../services/productsService');
const productModel = require('../../../models/productsModel');


describe('Testa se a Service da Sales retorna', () => {
  describe('um erro, caso não exista uma venda', () => {
    before(async () => {
      const execute = [];
  
      sinon.stub(salesModel, 'getSaleById').resolves(execute);
    });
  
    after(() => {
      salesModel.getSaleById.restore();
    });
  
    it('com a mensagem "Sale not found"', async () => {
      try {
        await salesService.getSaleById(1);
      } catch (err) {
        expect(err.message).to.be.equal('Sale not found');
      }
    });

    it('com o status de erro 404', async () => {
      try {
        await salesService.getSaleById(1);
      } catch (err) {
        expect(err.status).to.be.equal(404);
      }
    });
  });

  describe('todos as vendas', () => {
    before(async () => {
      const execute = [{
        sale_id: 1,
        date: '2021-09-09T04:54:29.000Z',
        product_id: 1,
        quantity: 2
      }];
  
      sinon.stub(salesModel, 'getAll').resolves(execute);
      sinon.stub(salesModel, 'getSaleById').resolves(execute);
    });
  
    after(() => {
      salesModel.getAll.restore();
      salesModel.getSaleById.restore();
    });

    it('em um formato de array', async () => {
      const response = await salesService.getAll();

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await salesService.getAll();

      expect(response[0]).to.deep.keys('saleId', 'date', 'productId', 'quantity');
    });
  });

  describe('apenas uma venda', () => {
    before(async () => {
      const execute = [{
        date: '2021-09-09T04:54:29.000Z',
        productId: 1,
        quantity: 2
      }];
  
      sinon.stub(salesModel, 'getAll').resolves(execute);
      sinon.stub(salesModel, 'getSaleById').resolves(execute);
    });
  
    after(() => {
      salesModel.getAll.restore();
      salesModel.getSaleById.restore();
    });

    it('em um formato de objeto', async () => {
      const response = await salesService.getSaleById(1);

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await salesService.getSaleById(1);

      expect(response[0]).to.deep.keys('date', 'productId', 'quantity');
    });
  });
});

describe('Testa se a função registerSaleProduct da Service retorna', () => {
  const saleProduct = {
    productId: 1,
    quantity: 3,
  }

  const mockSaleProducts = [
    {
      productId: 1,
      quantity: 3
    },
    {
      productId: 2,
      quantity: 5
    }
  ];
  
  before(() => {
    sinon.stub(salesModel, 'registerSale').resolves(1);
    sinon.stub(salesModel, 'registerSaleProduct').resolves(saleProduct);
    sinon.stub(productsService, 'validateProductQuantity').resolves();
  });

  after(() => {
    salesModel.registerSale.restore();
    salesModel.registerSaleProduct.restore();
    productsService.validateProductQuantity.restore();
  });

  it('um objeto', async () => {
    const response = await salesService.registerSale(mockSaleProducts);

    expect(response).to.be.an('object');
    expect(response).to.deep.keys('id', 'itemsSold');
  });

  it('com as propriedades corretas', async () => {
    const response = await salesService.registerSale(mockSaleProducts);

    response.itemsSold.map((item, index) => {
      expect(item).to.deep.keys('productId', 'quantity');
    });
  });
});

describe('Testa se a função updateSale da Service retorna', () => {
  const saleUpdate = [{
    productId: 1,
    quantity: 10
  }];

  const mockSale = [
    {
      "date": "2022-05-20T01:07:11.000Z",
      "productId": 3,
      "quantity": 15
    }
  ];

  mockProduct = {
    "id": 3,
    "name": "Escudo do Capitão América",
    "quantity": 30
  }

  before(() => {
    sinon.stub(salesModel, 'updateSale').resolves(saleUpdate[0]);
    sinon.stub(productsService, 'validateProductQuantity').resolves();
    sinon.stub(salesModel, 'getSaleById').resolves(mockSale);
    sinon.stub(productModel, 'updateQuantityProduct').resolves();
    sinon.stub(productsService, 'getProductById').resolves(mockProduct);
  });

  after(() => {
    salesModel.updateSale.restore();
    productsService.validateProductQuantity.restore();
    productModel.updateQuantityProduct.restore();
    productsService.getProductById.restore();
  });

  it('um objeto com a venda atualizada', async () => {
    const response = await salesService.updateSale(1, saleUpdate);

    expect(response).to.be.an('object');
    expect(response).to.deep.keys('saleId', 'itemUpdated');
  });
});
