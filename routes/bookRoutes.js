const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/books', bookController.getBooks);

router.post('/newbooks', bookController.createBook);


router.put('/updbooks/:id', bookController.updateBook); // Используйте /books/:id для обновления книги

router.delete('/delbooks/:id', bookController.deleteBook); // Используйте /books/:id для удаления книги


module.exports = router;
