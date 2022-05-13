const sinon = require('sinon');
const { expect } = require('chai');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');


describe('Testa se a Service dos Products retorna', () => {
  describe('um erro, caso não exista um produto', () => {
    before(async () => {
      const execute = [];
  
      sinon.stub(productsModel, 'getProductById').resolves(execute);
    });
  
    after(() => {
      productsModel.getProductById.restore();
    });
  
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

  describe('todos os produtos', () => {
    before(async () => {
      const execute = [{
        id: 1,
        name: 'Martelo do Thor',
        quantity: 10
      }];
  
      sinon.stub(productsModel, 'getAll').resolves(execute);
      sinon.stub(productsModel, 'getProductById').resolves(execute);
    });
  
    after(() => {
      productsModel.getAll.restore();
      productsModel.getProductById.restore();
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
    before(async () => {
      const execute = [{
        id: 1,
        name: 'Martelo do Thor',
        quantity: 10
      }];
  
      sinon.stub(productsModel, 'getAll').resolves(execute);
      sinon.stub(productsModel, 'getProductById').resolves(execute);
    });
  
    after(() => {
      productsModel.getAll.restore();
      productsModel.getProductById.restore();
    });

    it('em um formato de objeto', async () => {
      const response = await productsService.getProductById(1);

      expect(response).to.be.an('object');
    });

    it('com as propriedades corretas', async () => {
      const response = await productsService.getProductById(1);

      expect(response).to.deep.keys('id', 'name', 'quantity');
    });
  });
});

describe('Testa se a createProduct da Service retorna ', () => {
  describe('quando cadastrar um produto', () => {
    before(() => {
      const execute = {
        id: 1,
        name: 'Manopla do Thanos',
        quantity: 12
      };

      sinon.stub(productsModel, 'createProduct').resolves(execute);
      sinon.stub(productsModel, 'getProductByName').resolves([]);
    });

    after(() => {
      productsModel.createProduct.restore();
      productsModel.getProductByName.restore();
    });

    const name = 'Martelo do Thor';
    const quantity = 12;

    it('um objeto', async () => {
      const response = await productsService.createProduct(name, quantity);

      expect(response).to.be.an('object');
    });

    it('um objeto com o id do produto e seus valores', async () => {
      const response = await productsService.createProduct(name, quantity);

      expect(response).to.deep.keys('id', 'name', 'quantity');
    });
  });

  describe('um erro ao cadastrar', () => {
    const execute = [{
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10
    }];

    before(() => {
      sinon.stub(productsModel, 'getProductByName').resolves(execute);
    });

    after(() => {
      productsModel.getProductByName.restore();
    });

    it('um produto já existente', async () => {
      try {
        await productsService.createProduct(execute.name, execute.quantity);
      } catch (error) {
        expect(error.message).to.be.equals('Product already exists');
        expect(error.status).to.be.equals(409);
      }
    })
  });
});

describe('Testa se a função updateProduct da camada de Service retorna', () => {
  describe('um erro caso', () => {
    before(() => {  
      sinon.stub(productsModel, 'getProductById').resolves([]);
      sinon.stub(productsModel, 'updateProduct').resolves();
    });
  
    after(() => {
      productsModel.getProductById.restore();
      productsModel.updateProduct.restore();
    });

    it('não exista o produto', async () => {
      try {
        await productsService.updateProduct();
      } catch (error) {
        expect(error.message).to.be.equals('Product not found');
        expect(error.status).to.be.equals(404);
      }
    });
  });

  describe('com sucesso', () => {
    before(() => { 
      const execute = [{
        id: 1,
        name: 'Martelo do Thor',
        quantity: 10
      }];

      sinon.stub(productsModel, 'getProductById').resolves(execute);
      sinon.stub(productsModel, 'updateProduct').resolves();
    });
  
    after(() => {
      productsModel.getProductById.restore();
      productsModel.updateProduct.restore();
    });

    const updatedProduct = {
      id: 1,
      name: 'Manopla do Thanos',
      quantity: 15
    }

    it('um objeto com os dados atualizados', async () => {
      const response = await productsService.updateProduct(1, updatedProduct.name, updatedProduct.quantity);

      expect(response).to.be.an('object');
      expect(response).to.deep.keys('id', 'name', 'quantity');
      expect(response).that.deep.equals(updatedProduct);
    });
  });
});

describe('Testa se a função deleteProduct da camada de services', () => {
  describe('um erro caso', () => {
    const execute = [{
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10
    }];

    before(() => {
      sinon.stub(productsModel, 'getProductById').resolves([]);
      sinon.stub(productsModel, 'deleteProduct').resolves();
    });

    after(() => {
      productsModel.getProductById.restore();
      productsModel.deleteProduct.restore();
    });

    it('o produto não exista', async () => {
      try {
        await productsService.deleteProduct(1);
      } catch (error) {
        expect(error.message).to.be.equal('Product not found');
        expect(error.status).to.be.equal(404);
      }
    });
  });

  describe('deleta um produto', () => {
    const execute = [{
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10
    }];

    before(() => {
      sinon.stub(productsModel, 'getProductById').resolves(execute);
      sinon.stub(productsModel, 'deleteProduct').resolves();
    });

    after(() => {
      productsModel.getProductById.restore();
      productsModel.deleteProduct.restore();
    });

    it('com sucesso', async () => {
      await productsService.deleteProduct(1);
      expect(productsModel.deleteProduct.calledWith(1)).to.be.equal(true);
    });
  });
});

describe('Testa a função validateProductQuantity', () => {
  const mockProducts = [
    {
      productId: 1,
      quantity: 20
    },
    {
      productId: 2,
      quantity: 5
    }
  ];

  const execute = [{
    id: 1,
    name: 'Martelo do Thor',
    quantity: 10
  }];

  before(() => {
    sinon.stub(productsModel, 'getProductById').resolves(execute);
  });

  after(() => {
    productsModel.getProductById.restore();
  });

  it('retorna erro caso a quantidade de produtos esteja abaixo da venda', async () => {
    try {
      await productsService.validateProductQuantity(mockProducts);
    } catch (error) {
      expect(error.message).to.be.equal('Such amount is not permitted to sell');
      expect(error.status).to.be.equal(422);
    }
  });
});
