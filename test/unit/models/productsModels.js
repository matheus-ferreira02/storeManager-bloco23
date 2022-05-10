const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');

describe('Testa se a Model retorna ', () => {
  before(async () => {
    const execute = [[{
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10
    }], []];

    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('todos os produtos', () => {
    it('Em um formato de array', async () => {
      const response = await MoviesModel.getAll();

      expect(response).to.be.an('array');
    });
  })
})