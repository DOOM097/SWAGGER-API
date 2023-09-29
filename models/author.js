const { DataTypes } = require('sequelize');
const connection = require('../config/database'); 
const Book = require('./book');

const Author = connection.define('Author', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        
        autoIncrement: true, //значение этого столбца должно автоматически увеличиваться при каждой вставке новой записи в таблицу
        field: 'author_id'
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
}, {
    timestamps: false
});

module.exports = Author;
    