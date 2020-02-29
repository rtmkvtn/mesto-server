const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      res.status(404).send({ message: 'Нет пользователя с таким id' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.editUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name: `${name}`, about: `${about}` })
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};

module.exports.editUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar: `${avatar}` })
    .then((user) => res.send({ user }))
    .catch((err) => {
      console.error(err);
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
};