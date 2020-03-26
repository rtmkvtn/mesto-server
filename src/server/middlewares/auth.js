const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

const authErrorHandler = (res) => res.status(401).send({ message: 'Необходима авторизация!' });

function auth(req, res, next) {
  const token = req.cookies.jwt;

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return authErrorHandler(res);
  }
  req.user = payload;
  return next();
}

module.exports = auth;
