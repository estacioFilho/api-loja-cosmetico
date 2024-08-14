const express = require('express');
const ProductController = require('../controllers/productController.js');

const routes = express.Router();

routes.get('/product', ProductController.listProducts);
routes.post('/product', ProductController.addProduct);
routes.put('/product/:id', ProductController.updateProduct);
routes.delete('/product/:id', ProductController.removeProduct);

module.exports = routes;
