const path = require('path');

const { PORT = 3000 } = process.env;
const dbPath = path.join(__dirname, '../data');

module.exports = {
  PORT,
  dbPath,
};
