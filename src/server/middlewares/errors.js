class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

function errorsHandler(err, req, res, next) {
  const { statusCode = 500, message } = err;
  const { url } = req;

  if (err.name === 'CastError') {
    res.status(400).send({ message: 'Запрос не может быть понят сервером из-за некорректного синтаксиса. Проверьте правильность id.' });
  } else {
    res
    .status(statusCode)
    .send({
      message: statusCode === 500
      ? 'Произошла ошибка на сервере'
      : message
    })
  }
}

module.exports = {
  CustomError,
  errorsHandler,
};
