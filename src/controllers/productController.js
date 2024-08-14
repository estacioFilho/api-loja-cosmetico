const mongoose = require('mongoose');
const product = require('../models/Products.js');

class ProductController {
  static async listProducts(_req, res) {
    try {
      const products = await product.find({});
      if (products.length === 0) {
        return res.status(401).json({ error: 'Nenhum produto encontrado.' });
      }
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar os produtos.' });
    }
  }

  static async addProduct(req, res) {
    try {
      const newProduct = (req.body);
      await product.create(newProduct);
      return res.status(201).json({
        message: 'Produto adicionado no banco com sucesso!',
        product: newProduct,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao adicionar produto no banco!',
      });
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const updateData = req.body;

    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(
          { error: 'ID inválido' },
        );
      }
      const updatedProduct = await product.findByIdAndUpdate(id, updateData, { new: true });
      if (!updatedProduct) {
        return res.status(404).json({ error: 'Produto não existe.' });
      }
      return res.status(200).json({ message: 'Produto alterado com sucesso!', product: updatedProduct });
    } catch (error) {
      return res.status(500).json({ error: 'Erro no servidor.', details: error.message });
    }
  }

  static async removeProduct(req, res) {
    const { id } = req.params;
    try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(
          { error: 'ID inválido' },
        );
      }

      const deletedProduct = await product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return res.status(404).json({ error: 'Produto não existe.' });
      }
      return res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (error) {
      return res.status(500).json({ erro: 'Erro no servidor.' });
    }
  }
}

module.exports = ProductController;
