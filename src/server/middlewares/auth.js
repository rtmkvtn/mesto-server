const jwt = require('jsonwebtoken');

const authErrorHandler = (res) => res.status(401).send({ message: 'Необходима авторизация!' });

function auth(req, res, next) {
  const token = req.cookies.jwt;
  const { NODE_ENV, JWT_SECRET } = process.env;

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
