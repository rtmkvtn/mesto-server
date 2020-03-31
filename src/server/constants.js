const constants = {
  errors: {
    NO_USER: 'Пользователь с данным id не найден.',
    NO_CARD: 'Карточка с данным id не найдена.',
    DUPL_EMAIL: 'Пользователь с таким email уже зарегистрирован.',
    AUTHORIZATION_ERROR: 'Неправильная почта или пароль.',
    NO_RIGHTS_CARD: 'У вас нет прав на изменение данной карточки.',
    NOT_FOUND: 'Запрашиваемый ресурс не найден.',
    NO_AUTH: 'Необходима авторизация!',
  },
};

module.exports = Object.freeze(constants);
