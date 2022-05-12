const sinon = require('sinon');
const { expect } = require('chai');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('Testa se a Controller dos Products retorna', () => {
  const req = {};
  const res = {};

  const data = [{
    id: 1,
    name: 'Martelo do Thor',
    quantity: 10
  }];

  before(() => {
    res.status = sinon.stub()
      .returns(res);

    res.json = sinon.stub()
      .returns(data);

    sinon.stub(productsService, 'getAll').resolves(data);
    sinon.stub(productsService, 'getProductById').resolves(data);
  });

  after(() => {
    productsService.getAll.restore();
    productsService.getProductById.restore();
  });

  describe('todos os produtos', () => {
    it('em um JSON com o formato correto', async () => {
      await productsController.getAll(req, res);

      expect(res.json.calledWith(data)).to.be.equal(true);
    });

    it('com o status 200 na resposta', async () => {
      await productsController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('apenas um produto', () => {
    before(() => {
      req.params = { id: 1 }
    });

    it('em um JSON com o formato correto', async () => {
      await productsController.getProductById(req, res);

      expect(res.json.calledWith(data)).to.be.equal(true);
    });

    it('com o status 200 na resposta', async () => {
      await productsController.getProductById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe('Testa se a createProduct da Controller retorna', () => {
  const req = { body: {
    name: 'Manopla do Thanos',
    quantity: 10
  } };
  const res = {};

  const data = {
    id: 1,
    name: 'Manopla do Thanos',
    quantity: 10
  };

  before(() => {
    res.status = sinon.stub()
      .returns(res);

    res.json = sinon.stub()
      .returns(data);

    sinon.stub(productsService, 'createProduct').resolves(data);
  });

  after(() => {
    productsService.createProduct.restore();
  });

  describe('o produto cadastrado', () => {
    it('em um JSON com o formato correto', async () => {
      await productsController.createProduct(req, res);

      expect(res.json.calledWith(data)).to.be.equal(true);
    });

    it('com o status 201 na resposta', async () => {
      await productsController.createProduct(req, res);

      expect(res.status.calledWith(201)).to.be.equal(true);
    });
  });
});

describe('Testa se a updateProduct da Controller retorna', () => {
  req = {
    body: {
      name: 'Manopla do Thanos',
      quantity: 15
    },
    params: {
      id: 1
    }
  }
  res = {};

  const execute = {
    id: 1,
    name: 'Manopla do Thanos',
    quantity: 15
  }

  before(() => {
    sinon.stub(productsService, 'updateProduct').resolves(execute);

    res.status = sinon.stub()
    .returns(res);

    res.json = sinon.stub()
      .returns();
  });

  after(() => {
    productsService.updateProduct.restore();
  });

  it('a resposta com o status 200', async () => {
    await productsController.updateProduct(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
  });

  it('a resposta com o json correto', async () => {
    await productsController.updateProduct(req, res);

    expect(res.json.calledWith(execute)).to.be.equal(true);
  });
});

