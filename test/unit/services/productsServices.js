const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');


describe('Testa se a Service dos Products retorna', () => {
  describe('um erro, caso não exista um produto', () => {
    before(async () => {
      const execute = [];
  
      sinon.stub(productsModel, 'getProductById').resolves(execute);
    });
  
    after(() => {
      productsModel.getProductById.restore();
    });
  
    it('com a mensagem "Product not found"', async () => {
      try {
        await productsService.getProductById(1);
      } catch (err) {
        expect(err.message).to.be.equal('Product not found');
      }
    });

    it('com o status de erro 404', async () => {
      try {
        await productsService.getProductById(1);
      } catch (err) {
        expect(err.status).to.be.equal(404);
      }
    });
  });

  describe('todos os produtos', () => {
    before(async () => {
      const execute = [{
        id: 1,
        name: 'Martelo do Thor',
        quantity: 10
      }];
  
      sinon.stub(productsModel, 'getAll').resolves(execute);
      sinon.stub(productsModel, 'getProductById').resolves(execute);
    });
  
    after(() => {
      productsModel.getAll.restore();
      productsModel.getProductById.restore();
    });

    it('em um formato de array', async () => {
      const response = await productsService.getAll();

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await productsService.getAll();

      expect(response[0]).to.deep.keys('id', 'name', 'quantity');
    });
  });

  describe('apenas um produto', () => {
    before(async () => {
      const execute = [{
        id: 1,
        name: 'Martelo do Thor',
        quantity: 10
      }];
  
      sinon.stub(productsModel, 'getAll').resolves(execute);
      sinon.stub(productsModel, 'getProductById').resolves(execute);
    });
  
    after(() => {
      productsModel.getAll.restore();
      productsModel.getProductById.restore();
    });

    it('em um formato de objeto', async () => {
      const response = await productsService.getProductById(1);

      expect(response).to.be.an('object');
    });

    it('com as propriedades corretas', async () => {
      const response = await productsService.getProductById(1);

      expect(response).to.deep.keys('id', 'name', 'quantity');
    });
  });
});

describe('Testa se a createProduct da Service retorna ', () => {
  describe('quando cadastrar um produto', () => {
    before(() => {
      const execute = {
        id: 1,
        name: 'Manopla do Thanos',
        quantity: 12
      };

      sinon.stub(productsModel, 'createProduct').resolves(execute);
      sinon.stub(productsModel, 'getProductById').resolves([]);
    });

    after(() => {
      productsModel.createProduct.restore();
      productsModel.getProductById.restore();
    });

    const name = 'Martelo do Thor';
    const quantity = 12;

    it('um objeto', async () => {
      const response = await productsService.createProduct(name, quantity);

      expect(response).to.be.an('object');
    });

    it('um objeto com o id do produto e seus valores', async () => {
      const response = await productsService.createProduct(name, quantity);

      expect(response).to.deep.keys('id', 'name', 'quantity');
    });
  });

  describe('um erro ao cadastrar', () => {
    before(() => {
      const execute = [{
        id: 1,
        name: 'Martelo do Thor',
        quantity: 10
      }];

      sinon.stub(productsModel, 'getProductById').resolves(execute);
    });

    after(() => {
      productsModel.getProductById.restore();
    });

    it('um produto já existente', async () => {
      try {
        await productsService.createProduct(execute.name, execute.quantity);
      } catch (error) {
        expect(error.message).to.be.equals('Product already exists');
        expect(error.status).to.be.equals(409);
      }
    })
  });
});
