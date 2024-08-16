const jwt = require('jsonwebtoken');
const User = require('../models/User.js');

class UserController {
  static async register(req, res) {
    const { name, email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Falha ao cadastrar: e-mail já em uso.' });
      }

      const user = new User({ name, email, password });

      await user.save();

      return res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
    } catch (error) {
      return res.status(400).json({
        message: 'Falha ao cadastrar: erro ao registrar o usuário.',

      });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({
          message: 'Falha ao cadastrar: e-mail ou senha inválidos.',
        });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({
          message: 'Falha ao cadastrar: e-mail ou senha inválidos.',

        });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.json({ token });
    } catch (error) {
      return res.status(400).json({
        message: 'Falha ao cadastrar: não foi possível efetuar a requisição.',
      });
    }
  }
}

module.exports = UserController;
