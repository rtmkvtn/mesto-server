const escape = require('escape-html');
const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send(cards))
    .catch((err) => {
      next(err);
    });
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name: escape(name), link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).orFail(new Error('no such card'))
    .then((cardCheck) => {
      if (cardCheck.owner._id.toString() !== req.user._id) {
        res.status(403).send({ message: 'У вас нет прав на изменение данной карточки.' });
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
    .catch((err) => {
      next(err);
    });
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .populate('likes')
    .then((card) => {
      if (!card) {
        throw new Error('no such card');
      }
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new Error('no such card');
      }
      res.send(card);
    })
    .catch((err) => {
      next(err);
    });
};
