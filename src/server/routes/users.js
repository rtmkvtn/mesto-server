const router = require('express').Router();
const {
  getUsers,
  getUser,
  editUserInfo,
  editUserAvatar,
} = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.patch('/users/me', editUserInfo);
router.patch('/users/me/avatar', editUserAvatar);

module.exports = router;
