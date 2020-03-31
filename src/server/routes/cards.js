const router = require('express').Router();
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');
const {
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  dislikeCardValidation,
} = require('../middlewares/validation');

router.get('/cards', getCards);
router.post('/cards', createCardValidation, createCard);
router.delete('/cards/:cardId', deleteCardValidation, deleteCard);
router.put('/cards/:cardId/likes', likeCardValidation, likeCard);
router.delete('/cards/:cardId/likes', dislikeCardValidation, dislikeCard);

module.exports = router;
