const Express = require('express');
const authController = require('../controllers/authController.js');

const router = Express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
