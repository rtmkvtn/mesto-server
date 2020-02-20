const router = require('express').Router();
const fs = require('fs');
const config = require('../config.js');

router.get('/users', (req, res) => {
  fs.readFile(`${config.dbPath}/users.json`, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      res.send(err);
      return;
    }
    res.send(JSON.parse(data));
  });
});

module.exports = router;
