const Book = require('../models/book');


// Метод для получения всех книг
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json(books);
  } catch (error) {
    console.error('Ошибка при получении списка книг:', error);
    res.status(500).json({ error: 'Ошибка при получении списка книг' });
  }
};

// Другие методы, такие как createBook, searchBooksByKeyword и др.

module.exports = {
  getAllBooks,
  // Другие методы...
};
