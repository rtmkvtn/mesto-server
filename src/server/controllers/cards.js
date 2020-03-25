const escape = require('escape-html');
const Card = require('../models/card');
const { CustomError } = require('../middlewares/errors')

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send(cards))
    .catch(next)
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name: escape(name), link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new CustomError(err.message, 400));
      }
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).orFail(new CustomError('Карточка с данным id не найдена.', 404))
    .then((cardCheck) => {
      if (cardCheck.owner._id.toString() !== req.user._id) {
        throw new CustomError('У вас нет прав на изменение данной карточки.', 403);
      }
      return cardCheck;
    })
    .then((card) => {
      Card.findByIdAndRemove(card._id)
        .then((removedCard) => res.send({
          removedCard,
          message: 'Карточка удалена.',
        }));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new CustomError('Карточка с данным id не найдена.', 404);
      }
      res.send(card);
    })
    .catch(next)
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new CustomError('Карточка с данным id не найдена.', 404);
      }
      res.send(card);
    })
    .catch(next)
};
