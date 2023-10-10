const Sequelize = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('bookauthor', {
  BookId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'books',
      key: 'id'
    }
  },
  AuthorId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'authors',
      key: 'id'
    }
  }
}, {
  tableName: 'bookauthor',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "BookId" },
        { name: "AuthorId" },
      ]
    },
  ]
});
