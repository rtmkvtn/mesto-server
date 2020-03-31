const escape = require('escape-html');
const Card = require('../models/card');
const NotFoundError = require('../errorsModules/NotFoundError');
const NoRightsError = require('../errorsModules/NoRightsError');
const BadRequestError = require('../errorsModules/BadRequestError');
const constants = require('../constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name: escape(name), link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId).orFail(new NotFoundError(constants.errors.NO_CARD))
    .then((card) => {
      if (!card.owner._id.equals(req.user._id)) {
        throw new NoRightsError(constants.errors.NO_RIGHTS_CARD);
      }
      Card.remove(card)
        .then(() => res.send({
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
        throw new NotFoundError(constants.errors.NO_CARD);
      }
      res.send(card);
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .populate('owner')
    .then((card) => {
      if (!card) {
        throw new NotFoundError(constants.errors.NO_CARD);
      }
      res.send(card);
    })
    .catch(next);
};
