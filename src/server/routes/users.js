const router = require('express').Router();
const fs = require('fs');
const config = require('../config.js');

router.get('/users', (req, res) => {
  fs.promises.readFile(`${config.dbPath}/users.json`, { encoding: 'utf8' })
    .then((data) => JSON.parse(data))
    .then((json) => res.send(json))
    .catch((err) => {
      // eslint-disable-next-line no-console
      console.error(err);
      res.status(500).send({ message: 'Произошла ошибка на сервере' });
    });
});

module.exports = router;
