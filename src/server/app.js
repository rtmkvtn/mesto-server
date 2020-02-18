const express = require('express');
const path = require('path');
const getCardsRouter = require('./routes/cards');
const getUsersRouter = require('./routes/users');
const getUserRouter = require('./routes/user');
const wrongAddress = require('./routes/notFound');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.listen(PORT, () => {});
//  routes
app.use('/', getCardsRouter, getUsersRouter);
app.use('/', getUserRouter);
app.use('', wrongAddress);
