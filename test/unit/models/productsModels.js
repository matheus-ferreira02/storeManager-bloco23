const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Testa se a Model retorna ', () => {
  before(() => {
    const execute = [[{
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10
    }], []];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('todos os produtos', () => {
    it('Em um formato de array', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await productsModel.getAll();

      expect(response[0]).to.deep.keys('id', 'name', 'quantity');
    });
  });

  describe('apenas um produto', () => {
    it('Em um formato de objeto', async () => {
      const response = await productsModel.getProductById();

      expect(response).to.be.an('object');
    });

    it('com as propriedades corretas', async () => {
      const response = await productsModel.getProductById();

      expect(response).to.deep.keys('id', 'name', 'quantity');
    });
  });
});
