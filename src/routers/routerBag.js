const express = require('express');
const bagController = require('../controllers/bagController.js');

const routes = express.Router();

routes.get('/bag', bagController.listProductBag);
routes.get('/bag/:id', bagController.listOneProductBag);
routes.post('/bag', bagController.addManyProductsBag);
routes.put('/bag/:id', bagController.updateProductBag);
routes.delete('/bag/:id', bagController.removeProductBag);

module.exports = routes;
