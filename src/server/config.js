const { PORT = 3000, NODE_ENV, JWT_SECRET } = process.env;

module.exports = {
  PORT,
  JWT_SECRET: NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
};
