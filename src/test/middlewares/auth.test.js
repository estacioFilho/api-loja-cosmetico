const jwt = require('jsonwebtoken');
const authMiddleware = require('../../middlewares/authMiddleware');

jest.mock('jsonwebtoken');

describe('authMiddleware', () => {
  it('Deve retornar 401 se nenhum token for fornecido', () => {
    const req = {
      header: jest.fn().mockReturnValue(null),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Acesso negado. Nenhum token fornecido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('Deve retornar 400 se o token for inválido', () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer invalidToken'),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    jwt.verify.mockImplementation(() => { throw new Error('Invalid token'); });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Token inválido.' });
    expect(next).not.toHaveBeenCalled();
  });

  it('Deve passar para o próximo middleware se o token for válido', () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer validToken'),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    jwt.verify.mockReturnValue({ userId: '123' });

    authMiddleware(req, res, next);

    expect(req.user).toEqual({ userId: '123' });
  });

  it('Deve retornar 200 e mensagem "Acesso permitido!" ao usar um token válido', () => {
    const req = {
      header: jest.fn().mockReturnValue('Bearer validToken'),
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    jwt.verify.mockReturnValue({ userId: '123' });

    authMiddleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Acesso permitido!' });
  });
});
