const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../../models/connection');
const productsModel = require('../../../models/productsModel');

describe('Testa se a Model de Products retorna ', () => {
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
    it('em um formato de array', async () => {
      const response = await productsModel.getAll();

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await productsModel.getAll();

      expect(response[0]).to.deep.keys('id', 'name', 'quantity');
    });
  });

  describe('apenas um produto', () => {
    it('em um formato de objeto', async () => {
      const response = await productsModel.getProductById(1);

      expect(response).to.be.an('array');
    });

    it('com as propriedades corretas', async () => {
      const response = await productsModel.getProductById(1);

      expect(response[0]).to.deep.keys('id', 'name', 'quantity');
    });
  });
});

describe('Testa se a createProduct da Model retorna ', () => {
  describe('quando cadastrar um produto', () => {
    before(() => {
      const execute = [{
        insertId: 5
      }, []];

      sinon.stub(connection, 'execute').resolves(execute)
    });

    after(() => {
      connection.execute.restore();
    });


    it('um objeto', async () => {
      const response = await productsModel.createProduct();

      expect(response).to.be.an('object');
    });

    it('um objeto com o id do produto e seus valores', async () => {
      const name = 'Manopla do Thanos';
      const quantity = 12;
      const response = await productsModel.createProduct(name, quantity);

      expect(response).to.deep.keys('id', 'name', 'quantity');
    });
  });
});

describe('Testa se a getProductByName da Model retorna', () => {
  const execute = [[{
    id: 1,
    name: 'Martelo do Thor',
    quantity: 12
  }], []];

  before(() => {
    sinon.stub(connection, 'execute').resolves(execute)
  });

  after(() => {
    connection.execute.restore();
  })

  it('um array', async () => {
    const response = await productsModel.getProductByName(execute.name);

    expect(response).to.be.an('array');
  });

  it('com as propriedades corretas ', async () => {
    const [response] = await productsModel.getProductByName(execute.name);

    expect(response).to.deep.keys('id', 'name', 'quantity');
  });
});

describe('Testa se a updateProduct da Model', () => {
  before(() => {
    sinon.stub(connection, 'execute').resolves();
  });

  after(() => {
    connection.execute.restore();
  })

  it('atualiza o produto', async () => {
    const query = `
    UPDATE
      StoreManager.products
    SET name = ?,
        quantity = ?
    WHERE id = ?`;

    const id = 1;
    const name= 'Thor';
    const quantity = 12;
    await productsModel.updateProduct(id, name, quantity);

    expect(connection.execute.calledWith(query, [id, name, quantity])).to.be.equal(true);
  });
});
