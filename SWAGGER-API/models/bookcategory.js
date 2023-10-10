const Sequelize = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('bookcategory', {
  BookId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'books',
      key: 'id'
    }
  },
  CategoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'categories',
      key: 'id'
    }
  }
}, {
  tableName: 'bookcategory',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "BookId" },
        { name: "CategoryId" },
      ]
    },
  ]
});


