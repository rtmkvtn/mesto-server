function errorsHandler(err, req, res, next) {
  const { url } = req;
  const { message } = err;
  if (url.includes('user') || url.includes('sign')) {
    if (message.includes('Cast to ObjectId failed for value')) {
      res.status(404).send({ message: 'Пользователь с данным id не найден.' });
    } else if (message.includes('user validation failed:')) {
      if (message.includes('expected `email` to be unique')) {
        res.status(409).send({ message: 'Пользователь с таким email уже существует.' });
      }
      res.status(422).send({ message: 'Неверно заполнено одно из полей. Пользователь не может быть создан.' });
    } else res.status(500).send({ message: 'Произошла ощибка на сервере' });
  }
  if (url.includes('card')) {
    if (message.includes('Cast to ObjectId failed for value')) {
      res.status(404).send({ message: 'Карточка с данным id не найдена.' });
    } else if (message.includes('card validation failed:')) {
      res.status(422).send({ message: 'Неверно заполнено одно из полей. Карточка не может быть создана.' });
    } else res.status(500).send({ message: 'Произошла ощибка на сервере' });
  }
  return next(err);
}

module.exports = errorsHandler;
