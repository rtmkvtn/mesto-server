const express = require('express');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cardsRouter = require('./routes/cards');
const usersRouter = require('./routes/users');
const wrongAddress = require('./routes/notFound');
const config = require('./config.js');

const app = express();
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const skipLogs = (req, res) => res.statusCode < 399;

app.use(morgan('combined', { stream: accessLogStream, skip: skipLogs }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.listen(config.PORT, () => {});
//  routes
app.use((req, res, next) => {
  req.user = {
    _id: '5e58a84d8f54e1e3d84be5ac',
  };
  next();
});
app.use('/', cardsRouter, usersRouter);
app.use('*', wrongAddress);
