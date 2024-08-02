const mongoose = require('mongoose');
const product = require('../models/Products.js');

class ProductController {
  static async listProducts(_req, res) {
    try {
      const listProducts = await product.find({});
      return res.status(200).json(listProducts);
    } catch (error) {
      if (error) {
        return res.status(401).json({
          error: 'Nenhum produto encontrado.',
        });
      }
      return res.status(500).json({
        error: 'Erro ao listar os produtos.',
      });
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
    try {
      const { id } = req.params;
      const { amount } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(
          { error: 'ID inválido' },
        );
      }
      const updateProduct = await product.findByIdAndUpdate(id, req.body, { new: true });

      if (!updateProduct) {
        return res.status(404).json({
          error: 'Produto não existe.',
          product: updateProduct,
        });
      }

      return res.status(200).json({
        message: 'Quantidade atualizada',
        product: updateProduct,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro no servidor.',
        details: error.message,
      });
    }
  }

  static async removeProduct(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(
          { error: 'ID inválido' },
        );
      }
      const deleteProduct = await product.findByIdAndDelete(id);
      if (!deleteProduct) {
        return res.status(404).json({
          error: 'Produto não existe.',
        });
      }
      return res.status(200).json({
        message: 'Produco deletado com sucesso.',
      });
    } catch (error) {
      return res.status(500).json({
        erro: 'Erro no servidor.',
      });
    }
  }
}

module.exports = ProductController;
