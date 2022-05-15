const sinon = require('sinon');
const { expect } = require('chai');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('Testa se a Controller de Sales retorna', () => {
  const req = {};
  const res = {};

  const execute = [{
    saleId: 1,
    date: '2021-09-09T04:54:29.000Z',
    productId: 1,
    quantity: 2
  },];

  before(() => {
    res.status = sinon.stub()
      .returns(res);

    res.json = sinon.stub()
      .returns();

    sinon.stub(salesService, 'getAll').resolves(execute);
    sinon.stub(salesService, 'getSaleById').resolves(execute);
  });

  after(() => {
    salesService.getAll.restore();
    salesService.getSaleById.restore();
  });

  describe('todos as vendas', () => {
    it('em um JSON com o formato correto', async () => {
      await salesController.getAll(req, res);

      expect(res.json.calledWith(execute)).to.be.equal(true);
    });

    it('com o status 200 na resposta', async () => {
      await salesController.getAll(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });

  describe('apenas uma venda', () => {
    before(() => {
      req.params = { id: 1 }
    });

    it('em um JSON com o formato correto', async () => {
      await salesController.getSaleById(req, res);

      expect(res.json.calledWith(execute)).to.be.equal(true);
    });

    it('com o status 200 na resposta', async () => {
      await salesController.getSaleById(req, res);

      expect(res.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe('Testa se a função registerSale da Controller responde', () => {
  const mockSaleProducts = [
    {
      productId: 1,
      quantity: 3
    },
    {
      productId: 2,
      quantity: 5
    },
  ]

  const execute = {
    id: 1,
    itemsSold: [
      ...mockSaleProducts,
    ],
  };

  req = {
    body: mockSaleProducts,
  };
  res = {};
  
  before(() => {
    res.status = sinon.stub()
      .returns(res);

    res.json = sinon.stub()
    .returns(execute);

    sinon.stub(salesService, 'registerSale').resolves(execute);
  });

  after(() => {
    salesService.registerSale.restore();
  });

  it('com o status 201', async () => {
    await salesController.registerSale(req, res);

    expect(res.status.calledWith(201)).to.be.equal(true);
    expect(res.json.calledWith(execute)).to.be.equal(true);
  });

  it('em um JSON no formato correto', async () => {
    await salesController.registerSale(req, res);

    expect(res.json.calledWith(execute)).to.be.equal(true);
  });
});

describe('Testa se a função updateSale da Controller responde', () => {
  const saleUpdate = [{
    productId: 1,
    quantity: 10
  }];

  const execute = {
    saleId: 1,
    itemsUpdated: [
      ...saleUpdate,
    ],
  };

  req = {
    body: saleUpdate,
  };
  res = {};
  
  before(() => {
    res.status = sinon.stub()
      .returns(res);

    res.json = sinon.stub()
    .returns();

    sinon.stub(salesService, 'updateSale').resolves(execute);
  });

  after(() => {
    salesService.registerSale.restore();
  });

  it('com o status 200', async () => {
    await salesController.updateSale(req, res);

    expect(res.status.calledWith(200)).to.be.equal(true);
    expect(res.json.calledWith(execute)).to.be.equal(true);
  });
});
