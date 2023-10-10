const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes');
const Book = require('./models/book');
app.use(express.json());

// Подключение маршрутов для операций с книгами
app.use('/api', bookRoutes);

// Другие настройки и маршруты вашего приложения

app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});
