/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const users = require('../../data/users.json');

const userExistance = (req, res, next) => {
  const user = users.filter((el) => el._id === req.params.id).join('');
  if (!user) {
    res.status(404).send({ message: 'Нет пользователя с таким id' });
    return;
  }
  next();
};
const sendUser = (req, res, next) => {
  res.send(users.filter((user) => user._id === req.params.id));
  next();
};

router.get('/users/:id', userExistance);
router.get('/users/:id', sendUser);

module.exports = router;
