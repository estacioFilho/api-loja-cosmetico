const mongoose = require('mongoose');
const favorite = require('../models/Favorite');

class FavoriteController {
  static async listProductFavorite(_req, res) {
    try {
      const listProductFavorite = await favorite.find({});
      return res.status(200).json(listProductFavorite);
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao listar os produtos!',
      });
    }
  }

  static async listOneProductFavorite(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(
          { error: 'ID inválido' },
        );
      }
      const listOneProductFavorite = await favorite.findOne({ _id: id });
      return res.status(200).json(listOneProductFavorite);
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

  static async addProductfavorite(req, res) {
    try {
      const newProduct = favorite(req.body);
      await favorite.create(newProduct);
      return res.status(201).json({
        message: 'Produto marcado como favorito!',
        product: newProduct,
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao adicionar produto aos favoritos!',
      });
    }
  }

  static async removeProductfavorite(req, res) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json(
          { error: 'ID inválido' },
        );
      }
      const deleteProductfavorite = await favorite.findByIdAndDelete(id);

      if (!deleteProductfavorite) {
        return res.status(404).json({
          error: 'Produto não existe',
        });
      }
      return res.status(200).json({
        message: 'Produto removido dos favoritos.',
      });
    } catch (error) {
      return res.status(500).json({
        error: 'Erro no servidor.',
      });
    }
  }

  static async removeAllFavorite(_req, res) {
    try {
      const allProducts = await favorite.deleteMany({});
      return res.status(200).json({
        message: 'Todos os favoritos foram removidos.',
        produtos: [allProducts],
      });
    } catch (erro) {
      return res.status(500).json({
        error: `Não foi possível remover os favoritos: ${erro}`,
      });
    }
  }
}

module.exports = FavoriteController;
