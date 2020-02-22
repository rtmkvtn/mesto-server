/* eslint-disable no-underscore-dangle */
const router = require('express').Router();
const fs = require('fs');
const config = require('../config.js');

router.get('/users/:id', (req, res) => {
  fs.promises.readFile(`${config.dbPath}/users.json`, { encoding: 'utf8' })
    .then((data) => JSON.parse(data))
    .then((json) => {
      const userExist = json.find((user) => user._id === req.params.id);
      if (!userExist) {
        res.status(404).send({ message: 'Нет пользователя с таким id' });
        return;
      }
      res.send(userExist);
    })
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
});

module.exports = router;
