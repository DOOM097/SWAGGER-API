var DataTypes = require("sequelize").DataTypes;
var _authors = require("./authors");
var _bookauthor = require("./bookauthor");
var _bookcategory = require("./bookcategory");
var _books = require("./books");
var _categories = require("./categories");

function initModels(sequelize) {
  var authors = _authors(sequelize, DataTypes);
  var bookauthor = _bookauthor(sequelize, DataTypes);
  var bookcategory = _bookcategory(sequelize, DataTypes);
  var books = _books(sequelize, DataTypes);
  var categories = _categories(sequelize, DataTypes);

  authors.belongsToMany(books, { as: 'BookId_books', through: bookauthor, foreignKey: "AuthorId", otherKey: "BookId" });
  books.belongsToMany(authors, { as: 'AuthorId_authors', through: bookauthor, foreignKey: "BookId", otherKey: "AuthorId" });
  books.belongsToMany(categories, { as: 'CategoryId_categories', through: bookcategory, foreignKey: "BookId", otherKey: "CategoryId" });
  categories.belongsToMany(books, { as: 'BookId_books_bookcategories', through: bookcategory, foreignKey: "CategoryId", otherKey: "BookId" });
  bookauthor.belongsTo(authors, { as: "Author", foreignKey: "AuthorId"});
  authors.hasMany(bookauthor, { as: "bookauthors", foreignKey: "AuthorId"});
  bookauthor.belongsTo(books, { as: "Book", foreignKey: "BookId"});
  books.hasMany(bookauthor, { as: "bookauthors", foreignKey: "BookId"});
  bookcategory.belongsTo(books, { as: "Book", foreignKey: "BookId"});
  books.hasMany(bookcategory, { as: "bookcategories", foreignKey: "BookId"});
  bookcategory.belongsTo(categories, { as: "Category", foreignKey: "CategoryId"});
  categories.hasMany(bookcategory, { as: "bookcategories", foreignKey: "CategoryId"});

  return {
    authors,
    bookauthor,
    bookcategory,
    books,
    categories,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
