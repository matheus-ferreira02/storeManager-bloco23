const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

describe('Testa se a Service retorna', () => {
  before(async () => {
    const execute = [[{
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10
    }], []];

    sinon.stub(productsModel, 'getAll').resolves(execute);
  });

  after(async () => {
    productsModel.getAll.restore();
  });

  describe('todos os produtos', () => {
    it('Em um formato de array', async () => {
      const response = await productsService.getAll();

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await productsService.getAll();

      expect(response[0]).to.deep.keys('id', 'name', 'quantity');
    });
  })
})