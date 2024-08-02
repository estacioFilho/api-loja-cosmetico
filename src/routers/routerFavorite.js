const express = require('express');
const FavoriteController = require('../controllers/favoriteController.js');

const routes = express.Router();

routes.get('/favorite', FavoriteController.listProductFavorite);
routes.get('/favorite/:id', FavoriteController.listOneProductFavorite);
routes.post('/favorite', FavoriteController.addProductfavorite);
routes.delete('/favorite/:id', FavoriteController.removeProductfavorite);
routes.delete('/favorite/', FavoriteController.removeAllFavorite);

module.exports = routes;
