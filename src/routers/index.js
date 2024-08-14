const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const authRoutes = require('./auth.js');
const productRoutes = require('./product.js');

const routes = (app) => {
  app.route('/').get((_req, res) => res.status(200).send({
    name: 'Api Druss',
    endPoints: {
      produtos: 'http://localhost:3001/product',
      sacola: 'http://localhost:3001/bag',
      favoritos: 'http://localhost:3001/favorite',
    },
  }));

  app.use(express.json(), productRoutes);
  app.use(express.json(), authRoutes);

  app.use('/api/auth', authRoutes);

  app.get('/api/protected', authMiddleware);
};

module.exports = routes;
