const router = require('express').Router();
const {
  getUsers,
  getUser,
  editUserInfo,
  editUserAvatar,
} = require('../controllers/users');
const {
  getUserValidation,
  editUserInfoValidation,
  editUserAvatarValidation,
} = require('../middlewares/validation');

router.get('/users', getUsers);
router.get('/users/:id', getUserValidation, getUser);
router.patch('/users/me', editUserInfoValidation, editUserInfo);
router.patch('/users/me/avatar', editUserAvatarValidation, editUserAvatar);

module.exports = router;
