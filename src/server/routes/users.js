const router = require('express').Router();
const users = require('../../data/users.json');


router.get('/users', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'plain/text',
  });
  res.send(users);
});

module.exports = router;
