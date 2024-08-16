const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware.js');
const authRoutes = require('./auth.js');
const productRoutes = require('./product.js');

const routes = (app) => {
  app.route('/').get((_req, res) => res.status(200).send({
    name: 'Api Druss',
    endPoints: {
      produtos: `https://api-druss.onrender.com/product`,
    },
  }));

  app.use(express.json(), productRoutes);
  app.use(express.json(), authRoutes);

  app.use('/api/auth', authRoutes);

  app.get('/api/protected', authMiddleware);
};

module.exports = routes;
