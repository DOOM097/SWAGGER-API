const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('books', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = sequelize;