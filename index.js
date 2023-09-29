const express = require('express');
const app = express();
const bookRoutes = require('./routes/bookRoutes'); // Импортируйте маршруты
const swaggerJsdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")
// Настройки Express
app.use(express.json());

// Подключение маршрутов
app.use('/api', bookRoutes); // Указываем префикс для маршрута



const options={
  definition:{
    openapi: "3.0.0",
    info:{
      title: "Library Example Express API with Swagger",
      version:"0.1.0",
      description:
        "This is a simple CRUD API application made wuth Express and documented with Swagger",

    },
    servers:[
      {
        url: "http://localhost:3000/",
        description: 'Development server',
      },
    ],
  },
  apis:["./routes/*"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);










// Запуск сервера
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
