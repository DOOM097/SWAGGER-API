const swaggerAutogen = require('swagger-autogen-doc')();

const outputFile = './swagger-output.json'; // Путь к файлу, в который будет сохранена спецификация Swagger

// Массив маршрутов Express, которые нужно анализировать для генерации документации
const endpoints = ['./routes/bookRoutes.js'];

// Настройки документации Swagger
const settings = {
  info: {
    title: 'API Documentation',
    version: '1.0.0',
    description: 'API documentation for your application',
  },
  host: 'localhost:3000', // Хост, на котором работает ваше приложение
  schemes: ['http'], // Протоколы, которые используются (например, 'http', 'https')
};

// Генерация спецификации Swagger и сохранение ее в файл
swaggerAutogen(outputFile, endpoints, settings);
