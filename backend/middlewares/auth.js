const jwt = require('jsonwebtoken');
const UnauthorizedErrorError = require('../errors/UnauthorizedError');

const { SECRET_KEY, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedErrorError('Необходима авторизация');
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? SECRET_KEY : 'mega-very-secret-key');
  } catch (err) {
    throw new UnauthorizedErrorError('Необходима авторизация');
  }

  req.user = payload; // записываем пейлоуд в объект запроса
  next();
};
