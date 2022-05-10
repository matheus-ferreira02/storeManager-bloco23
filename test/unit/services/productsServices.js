const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('Testa se a Service retorna', () => {
  describe('todos os produtos', () => {
    before(() => {
      const execute = [{
        id: 1,
        name: 'Martelo do Thor',
        quantity: 10
      }];
  
      sinon.stub(productsModel, 'getAll').resolves(execute);
    });
  
    after(() => {
      productsModel.getAll.restore();
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
    it('em um formato de objeto', async () => {
      const response = await productsService.getProductById(1);

      expect(response).to.be.an('object');
    });

    it('com as propriedades corretas', async () => {
      const response = await productsService.getProductById(1);

      expect(response).to.deep.keys('id', 'name', 'quantity');
    });
  });

  describe('um erro, caso não exista um produto', () => {
    before(() => {
      sinon.stub(productsModel, 'getProductById').resolves([]);
    });
  
    after(() => {
      productsModel.getAll.restore();
    });
  
    it('em um formato de objeto', async () => {
      const response = await productsService.getProductById(1);

      expect(response).to.be.an('object');
    });

    it('com a mensagem "Product not found"', async () => {
      const response = await productsService.getProductById(1);

      const err = { status: 404, message: 'Product not found' };

      expect(response).to.throw(err);
    });
  });
});
