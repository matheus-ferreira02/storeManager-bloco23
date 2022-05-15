const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const salesModel = require('../../../models/salesModel');

describe('Testa se a Model retorna ', () => {
  describe('todos as vendas', () => {
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
    before(() => {
      const execute = [[{
        date: '2021-09-09T04:54:29.000Z',
        product_id: 1,
        quantity: 2
      }], []];
  
      sinon.stub(connection, 'execute').resolves(execute);
    });
  
    after(() => {
      connection.execute.restore();
    });

    it('em um formato de objeto', async () => {
      const response = await salesModel.getSaleById(1);

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await salesModel.getSaleById(1);

      expect(response[0]).to.deep.keys('date', 'product_id', 'quantity');
    });
  });
});

describe('Testa se a função registerSale da Model retorna', () => {
  before(() => {
    const execute = [{
      insertId: 1
    }, []];
    sinon.stub(connection, 'execute').resolves(execute);
  });

  after(() => {
    connection.execute.restore();
  });

  it('o id da nova venda', async () => {
    const response = await salesModel.registerSale();

    expect(response).to.be.equal(1);
  });
});

describe('Testa se a função registerSaleProduct da Model retorna', () => {
  const saleProduct = {
    productId: 1,
    quantity: 3
  }
  
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  it('um objeto com a venda do produto', async () => {
    const response = await salesModel.registerSaleProduct(1, saleProduct);

    expect(response).that.deep.equals(saleProduct);
  });
});

describe('Testa se a função updateSale da Model retorna', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  });

  const saleUpdate = {
    productId: 1,
    quantity: 10
  }

  it('retorna o produto com os dados atualizados', async () => {
    const response = await salesModel.updateSales(1, saleUpdate);

    expect(response).to.be.an('object');
    expect(response).that.deep.equals(saleProduct);
  });
});
