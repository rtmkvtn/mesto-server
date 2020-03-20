const jwt = require('jsonwebtoken');

const authErrorHandler = (res) => res.status(401).send({ message: 'Необходима авторизация!' });
const bearerTokenExtractor = (header) => header.replace('Bearer ', '');

function auth(req, res, next) {
  const { authorization } = req.headers;
  const { NODE_ENV, JWT_SECRET } = process.env;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return authErrorHandler(res);
  }
  const token = bearerTokenExtractor(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return authErrorHandler(res);
  }
  req.user = payload;
  return next();
}

module.exports = auth;
