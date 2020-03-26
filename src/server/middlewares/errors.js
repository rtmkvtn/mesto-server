/* eslint-disable no-unused-vars */
function errorsHandler(err, req, res, next) {
  const { statusCode = 500, message } = err;

  if (err.name === 'CastError') {
    return res.status(400).send({ message: 'Запрос не может быть понят сервером из-за некорректного синтаксиса. Проверьте правильность id.' });
  }
  return res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Произошла ошибка на сервере'
        : message,
    });
}

module.exports = {
  errorsHandler,
};
