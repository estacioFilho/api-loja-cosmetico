const mongoose = require('mongoose');
const bag = require('../models/Bag.js');

class BagController {
  static async listProductBag(_req, res) {
    try {
      const listProductBag = await bag.find({});
      return res.status(200).json(listProductBag);
    } catch (error) {
      if (error) {
        return res.status(401).json({
          error: 'Nenhum produto encontrado.',
        });
      }
      return res.status(500).json({
        error: 'Erro ao listar os produtos da sacola',
      });
    }
  }

  static async listOneProductBag(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(
          { error: 'ID inválido' },
        );
      }
      const listOneProductBag = await bag.findOne({ _id: id });
      return res.status(200).json(listOneProductBag);
    } catch (error) {
      if (error) {
        return res.status(401).json({
          error: 'Nenhum produto encontradoo.',
        });
      }
      return res.status(500).json({
        error: 'Erro ao listar os produtos da sacola',
      });
    }
  }

  static async addManyProductsBag(req, res) {
    try {
      const newsProducts = await bag.insertMany(req.body);
      return res.status(201).json({
        message: 'Produto adicionado na sacola com sucesso!',
        product: newsProducts,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao adicionar produto na sacola!',
      });
    }
  }

  static async updateProductBag(req, res) {
    try {
      const { id } = req.params;
      const { amount } = req.body;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(
          { error: 'ID inválido' },
        );
      }
      const updateBag = await bag.findByIdAndUpdate(id, { amount }, { new: true });

      if (!updateBag) {
        return res.status(404).json({
          error: 'Produto não existe',
          product: updateBag,
        });
      }

      return res.status(200).json({
        message: 'Quantidade atualizada',
        product: updateBag,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro no servidor.',
        details: error.message,
      });
    }
  }

  static async removeProductBag(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(
          { error: 'ID inválido' },
        );
      }
      const deleteProductBag = await bag.findByIdAndDelete(id);
      if (!deleteProductBag) {
        return res.status(404).json({
          error: 'Produto não existe',
        });
      }
      return res.status(200).json({
        message: 'Produco deletado com sucesso',
      });
    } catch (error) {
      return res.status(500).json({
        erro: 'Erro no servidor.',
      });
    }
  }
}

module.exports = BagController;
