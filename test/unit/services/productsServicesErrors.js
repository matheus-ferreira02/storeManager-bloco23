const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');


describe('Testa se a Service retorna', () => {
  before(async () => {
    const execute = [];

    sinon.stub(productsModel, 'getProductById').resolves(execute);
  });

  after(() => {
    productsModel.getProductById.restore();
  });

  describe('um erro, caso não exista um produto', () => {
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
});
