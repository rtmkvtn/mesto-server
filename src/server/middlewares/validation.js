const { celebrate, Joi } = require('celebrate');

const urlRegExp = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i;
// validators vor /users route
const createUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
    avatar: Joi.string().required().regex(urlRegExp).error(new Error('avatar is not a link!')),
  }),
});

const loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(8),
  }),
});

const editUserInfoValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const editUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(urlRegExp).error(new Error('avatar is not a link!')),
  }),
});

const getUserValidation = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().length(24),
  }),
});

// validators for /cards route
const createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegExp).error(new Error('avatar is not a link!')),
  }),
});

const deleteCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const likeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

const dislikeCardValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().alphanum().length(24),
  }),
});

module.exports = {
  createUserValidation,
  loginValidation,
  editUserInfoValidation,
  editUserAvatarValidation,
  getUserValidation,
  createCardValidation,
  deleteCardValidation,
  likeCardValidation,
  dislikeCardValidation,
};
