const express = require('express');
const path = require('path');
const getCardsRouter = require('./routes/cards');
const getUsersRouter = require('./routes/users');
const getUserRouter = require('./routes/user');
const wrongAddress = require('./routes/notFound');
const config = require('./config.js');

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.listen(config.PORT, () => {});
//  routes
app.use('/', getCardsRouter, getUsersRouter, getUserRouter);
app.use('*', wrongAddress);
