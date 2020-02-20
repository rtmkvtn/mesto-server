/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const fs = require('fs');
const config = require('../config.js');

router.get('/users/:id', (req, res) => {
  const reader = fs.createReadStream(`${config.dbPath}/users.json`, { encoding: 'utf8' });
  reader.on('data', (data) => {
    const users = JSON.parse(data);
    const userExist = users.find((user) => user._id === req.params.id);
    if (!userExist) {
      res.status(404).send({ message: 'Нет пользователя с таким id' });
      return;
    }
    res.send(userExist);
  });
});

module.exports = router;
