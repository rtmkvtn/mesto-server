const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const escape = require('escape-html');
const User = require('../models/user');
const { JWT_SECRET } = require('../config');
const { CustomError } = require('../middlewares/errors');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next)
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id).orFail(new CustomError('Пользователь с данным id не найден.', 404))
    .then((user) => res.send(user))
    .catch(next)
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

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
      if (err.name === 'ValidationError') {
        return next(new CustomError(err.message, 400));
      }
      next(err);
    })
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new CustomError('Неверная почта или пароль.', 401);
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
    .catch(next)
};

module.exports.editUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findOneAndUpdate(req.user._id, { name: `${escape(name)}`, about: `${escape(about)}` })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CustomError(err.message, 400));
      }
      next(err);
    });
};

module.exports.editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findOneAndUpdate(req.user._id, { avatar: `${avatar}` })
    .then((user) => res.send({ user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CustomError(err.message, 400));
      }
      next(err);
    });
};
