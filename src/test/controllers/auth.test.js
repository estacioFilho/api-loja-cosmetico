const jwt = require('jsonwebtoken');
const User = require('../../models/User.js');
const UserController = require('../../controllers/authController.js');

jest.mock('../../models/User.js');
jest.mock('jsonwebtoken');

describe('UserController', () => {
  describe('register', () => {
    it('Deve retornar a mensagem de erro e o status code 400.', async () => {
      const req = { body: { name: 'Test', email: 'test@example.com', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValueOnce({});

      await UserController.register(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: 'E-mail já em uso.' });
    });

    it('Deve salvar o usuário e retornar o status code 201', async () => {
      const req = { body: { name: 'Test', email: 'test@example.com', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValueOnce(null);
      User.prototype.save = jest.fn().mockResolvedValueOnce({});

      await UserController.register(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(User.prototype.save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Usuário cadastrado com sucesso!' });
    });

    it('Deve retornar status code 400 e tratar o erro', async () => {
      const req = { body: { name: 'Test', email: 'test@example.com', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockRejectedValueOnce(new Error('DB Error'));

      await UserController.register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Erro ao registrar o usuário.',
        error: 'DB Error',
      });
    });
  });

  describe('login', () => {
    it('Deve retornar mensagem de erro caso e-mail não exista 401', async () => {
      const req = { body: { email: 'test@example.com', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockResolvedValueOnce(null);

      await UserController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'E-mail ou senha inválidos.' });
    });

    it('Deve retornar mensagem de erro caso a senha não exista ou não seja igual 401', async () => {
      const req = { body: { email: 'test@example.com', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const user = { comparePassword: jest.fn().mockResolvedValueOnce(false) };
      User.findOne.mockResolvedValueOnce(user);

      await UserController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(user.comparePassword).toHaveBeenCalledWith('password');
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'E-mail ou senha inválidos.' });
    });

    it('Deve retornar o token caso o e-mail e senha estejam corretos.', async () => {
      const req = { body: { email: 'test@example.com', password: 'password' } };
      const res = {
        json: jest.fn(),
      };

      const user = { _id: 'userId', comparePassword: jest.fn().mockResolvedValueOnce(true) };
      User.findOne.mockResolvedValueOnce(user);
      jwt.sign.mockReturnValueOnce('token');

      await UserController.login(req, res);

      expect(User.findOne).toHaveBeenCalledWith({ email: 'test@example.com' });
      expect(user.comparePassword).toHaveBeenCalledWith('password');
      expect(jwt.sign).toHaveBeenCalledWith({ id: 'userId' }, process.env.JWT_SECRET, { expiresIn: '1h' });
      expect(res.json).toHaveBeenCalledWith({ token: 'token' });
    });

    it('Deve retornar status code 400 e tratar o erro', async () => {
      const req = { body: { email: 'test@example.com', password: 'password' } };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      User.findOne.mockRejectedValueOnce(new Error('DB Error'));

      await UserController.login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Não foi possível efetuar a requisição.',
        error: 'DB Error',
      });
    });
  });
});
