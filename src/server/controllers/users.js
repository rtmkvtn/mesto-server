const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

module.exports.editUserInfo = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name: `${name}`, about: `${about}` })
    .then((user) => res.send(user))
    .catch((err) => {
      next(err);
    });
};

module.exports.editUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar: `${avatar}` })
    .then((user) => res.send({ user }))
    .catch((err) => {
      next(err);
    });
};
