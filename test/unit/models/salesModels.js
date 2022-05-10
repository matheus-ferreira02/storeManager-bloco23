const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('Testa se a Model retorna ', () => {
  before(() => {
    const execute = [[{
      sale_id: 1,
      date: '2021-09-09T04:54:29.000Z',
      product_id: 1,
      quantity: 2
    }], []];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  describe('todos as vendas', () => {
    it('em um formato de array', async () => {
      const response = await salesModel.getAll();

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await salesModel.getAll();

      expect(response[0]).to.deep.keys('sale_id', 'date', 'product_id', 'quantity');
    });
  });

  describe('apenas uma venda', () => {
    it('em um formato de objeto', async () => {
      const response = await salesModel.getSaleById(1);

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await salesModel.getSaleById(1);

      expect(response[0]).to.deep.keys('sale_id', 'date', 'product_id', 'quantity');
    });
  });
});