require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const validationRouter = require('./middlewares/validation');
const wrongAddress = require('./routes/wrongAddress');
const { errorsHandler } = require('./middlewares/errors');
const config = require('./config.js');

const app = express();

app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(config.dbAddress, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .catch((err) => {
    console.error(err);
  });

app.listen(config.PORT, () => {});
//  routes

// crash-test
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// logging all requests to request.loq file
app.use(requestLogger);
// validation of all input
app.use('/', validationRouter);
app.post('/signin', login);
app.post('/signup', createUser);
// authorization to wright token into cookies.jwt
app.use(auth);
app.use('/', cardsRouter, usersRouter);
// logging all errors to error.log file
app.use(errorLogger);
// errors handlers
app.use(errors());
app.use(errorsHandler);
app.use(wrongAddress);
