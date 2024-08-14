const Product = require('../../models/Products');
const ProductController = require('../../controllers/productController');

jest.mock('../../models/Products');

describe('ProductController', () => {
  describe('listProducts', () => {
    it('Deve retornar a lista de produtos com status code 200', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const products = [{ name: 'Product 1', amount: 10 }];
      Product.find.mockResolvedValueOnce(products);

      await ProductController.listProducts(req, res);

      expect(Product.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(products);
    });

    it('Deve retornar erro 401 se nenhum produto for encontrado', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Product.find.mockResolvedValueOnce([]);

      await ProductController.listProducts(req, res);

      expect(Product.find).toHaveBeenCalledWith({});
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Nenhum produto encontrado.' });
    });

    it('Deve retornar erro 500 em caso de falha na listagem', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Product.find.mockRejectedValueOnce(new Error('DB Error'));

      await ProductController.listProducts(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao listar os produtos.' });
    });
  });

  describe('addProduct', () => {
    it('Deve adicionar um novo produto e retornar status code 201', async () => {
      const req = { body: { name: 'Product 1', amount: 10 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Product.create.mockResolvedValueOnce(req.body);

      await ProductController.addProduct(req, res);

      expect(Product.create).toHaveBeenCalledWith(req.body);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Produto adicionado no banco com sucesso!',
        product: req.body,
      });
    });

    it('Deve retornar erro 500 ao adicionar produto', async () => {
      const req = { body: { name: 'Product 1', amount: 10 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Product.create.mockRejectedValueOnce(new Error('DB Error'));

      await ProductController.addProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Erro ao adicionar produto no banco!' });
    });
  });

  describe('updateProduct', () => {
    it('Deve atualizar um produto existente e retornar status code 200', async () => {
      const req = { params: { id: '66b8221b350f50cc7ce09e2c' }, body: { amount: 20 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const updatedProduct = { _id: '66b8221b350f50cc7ce09e2c', name: 'Product 1', amount: 20 };
      Product.findByIdAndUpdate.mockResolvedValueOnce(updatedProduct);

      await ProductController.updateProduct(req, res);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('66b8221b350f50cc7ce09e2c', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Quantidade atualizada',
        product: updatedProduct,
      });
    });

    it('Deve retornar erro 400 para ID inválido', async () => {
      const req = { params: { id: 'invalidId' }, body: { amount: 20 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ProductController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'ID inválido' });
    });

    it('Deve retornar erro 404 se o produto não for encontrado', async () => {
      const req = { params: { id: '66b8221b350f50cc7ce09e2c' }, body: { amount: 20 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Product.findByIdAndUpdate.mockResolvedValueOnce(null);

      await ProductController.updateProduct(req, res);

      expect(Product.findByIdAndUpdate).toHaveBeenCalledWith('66b8221b350f50cc7ce09e2c', req.body, { new: true });
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Produto não existe.',
      });
    });

    it('Deve retornar erro 500 caso apresente algum erro no servidor', async () => {
      const req = { params: { id: '66b8221b350f50cc7ce09e2c' }, body: { amount: 20 } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Product.findByIdAndUpdate.mockRejectedValueOnce(new Error('DB Error'));

      await ProductController.updateProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Erro no servidor.',
        details: 'DB Error',
      });
    });
  });

  describe('removeProduct', () => {
    it('Deve remover um produto existente e retornar status code 200', async () => {
      const req = { params: { id: '66b8221b350f50cc7ce09e2c' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Product.findByIdAndDelete.mockResolvedValueOnce({ _id: '66b8221b350f50cc7ce09e2c' });

      await ProductController.removeProduct(req, res);

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith('66b8221b350f50cc7ce09e2c');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Produto deletado com sucesso.',
      });
    });

    it('Deve retornar erro 400 para ID inválido', async () => {
      const req = { params: { id: 'invalidId' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await ProductController.removeProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ error: 'ID inválido' });
    });

    it('Deve retornar erro 404 se o produto não for encontrado', async () => {
      const req = { params: { id: '66b8221b350f50cc7ce09e2c' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Product.findByIdAndDelete.mockResolvedValueOnce(null);

      await ProductController.removeProduct(req, res);

      expect(Product.findByIdAndDelete).toHaveBeenCalledWith('66b8221b350f50cc7ce09e2c');
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        error: 'Produto não existe.',
      });
    });

    it('Deve retornar erro 500 ao remover produto', async () => {
      const req = { params: { id: '66b8221b350f50cc7ce09e2c' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      Product.findByIdAndDelete.mockRejectedValueOnce(new Error('DB Error'));

      await ProductController.removeProduct(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ erro: 'Erro no servidor.' });
    });
  });
});
