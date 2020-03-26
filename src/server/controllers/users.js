const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const escape = require('escape-html');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const NotFoundError = require('../errorsModules/NotFoundError');
const BadRequestError = require('../errorsModules/BadRequestError');
const AuthorizationError = require('../errorsModules/AuthorizationError');
const ConflictError = require('../errorsModules/ConflictError');

// avoiding undefined and special symbols in user's input
const noSymbols = (input) => (escape(input) === 'undefined' ? '' : escape(input));

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id).orFail(new NotFoundError('Пользователь с данным id не найден.'))
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const {
    avatar,
    email,
    password,
  } = req.body;
  const name = noSymbols(req.body.name);
  const about = noSymbols(req.body.about);

  bcrypt.hash(password, 10)
    .then((hash) => User.create(
      {
        name: escape(name),
        about: escape(about),
        avatar,
        email,
        password: hash,
      },
    ))
    .then((user) => {
      res.status(201).send({
        _id: user._id,
        email: user.email,
      });
    })
    .catch((err) => {
      if (err.message.includes('unique')) {
        return next(new ConflictError('Пользователь с таким email уже зарегистрирован.'));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new AuthorizationError('Неверная почта или пароль.');
      }
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .cookie('jwt', token, {
          maxAge: 360000,
          httpOnly: true,
          sameSite: true,
        })
        .send({ token });
    })
    .catch(next);
};

module.exports.editUserInfo = (req, res, next) => {
  const name = noSymbols(req.body.name);
  const about = noSymbols(req.body.about);

  User.findOneAndUpdate(req.user._id, { name, about })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

module.exports.editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findOneAndUpdate(req.user._id, { avatar: `${avatar}` })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};
