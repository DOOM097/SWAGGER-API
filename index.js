const express = require('express')
const app = express();
const swaggerJsdoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')
const categoryRoutes = require('./routes/categoryRoutes');
const authorRoutes = require('./routes/authorRoutes');
const bookRoutes = require('./routes/bookRoutes');


app.use('/api/authors', authorRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/category', categoryRoutes);

// Генерация спецификации Swagger
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Library Example Express API with Swagger',
      version: '0.1.0',
      description: 'This is a simple CRUD API application made with Express and documented with Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000/',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*'], // Путь к вашим файлам маршрутов
};

const specs = swaggerJsdoc(options);

// Роут для документации Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
