const Book = require('../models/book'); // Подключаем модель


exports.getBooks = async (req, res) => {
  try {
    const books = await Book.findAll(); // Извлекаем все книги
    res.status(200).json(books); // Отправляем список книг в виде JSON
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Создание новой книги
exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create({
      title: req.body.title,
      isbn: req.body.isbn,
      pageCount: req.body.pageCount,
      publishedDate: req.body.publishedDate,
      status: req.body.status,
      // Другие поля книги
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновление данных книги
exports.updateBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const updatedRowCount = await Book.updateBook(bookId, req.body);
    res.status(200).json({ updatedRowCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удаление книги
exports.deleteBook = async (req, res) => {
  const bookId = req.params.id;
  try {
    const deletedRowCount = await Book.deleteBook(bookId);
    res.status(200).json({ deletedRowCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
