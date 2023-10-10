const Sequelize = require('sequelize');
const sequelize = require('../config/database');

module.exports = sequelize.define('categories', {
  id: {
    autoIncrement: true,
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'categories',
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
