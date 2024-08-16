const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'Acesso negado. Nenhum token fornecido.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    res.status(200).json({ message: 'Acesso permitido!' });
    next();
  } catch (error) {
    res.status(400).json({
      message: 'Token inválido.',
      error: error.message
    });
  }
};

module.exports = authMiddleware;
