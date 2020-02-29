const router = require('express').Router();
const {
  getUsers,
  getUser,
  createUser,
  editUserInfo,
  editUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.post('/users', createUser);
router.patch('/users/me', editUserInfo);
router.patch('/users/me/avatar', editUserAvatar);

module.exports = router;
