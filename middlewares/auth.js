const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/unauthorized-error');

const { AUTH_ERR_MSG } = require('../utils/constants');

const { NODE_ENV, JWT_SECRET } = process.env;
const { secretKey } = require('../utils/config');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(AUTH_ERR_MSG);
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  // попытаемся верифицировать токен
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : secretKey);
  } catch (err) {
    // отправим ошибку, если не получилось
    throw new UnauthorizedError(AUTH_ERR_MSG);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
