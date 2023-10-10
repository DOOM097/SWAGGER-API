const Sequelize = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('books', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  isbn: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  pageCount: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  publishedDate: {
    type: Sequelize.DATE,
    allowNull: true
  },
  thumbnailUrl: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  shortDescription: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  longDescription: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  status: {
    type: Sequelize.STRING(255),
    allowNull: true
  }
}, {
  tableName: 'books',
  timestamps: false,
  indexes: [
    {
      name: "PRIMARY",
      unique: true,
      using: "BTREE",
      fields: [
        { name: "id" },
      ]
    },
  ]
});
