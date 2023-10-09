/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         isbn:
 *           type: string
 *         pageCount:
 *           type: integer
 *         publishedDate:
 *           type: string
 *           format: date
 *         shortDescription:
 *           type: string
 *         longDescription:
 *           type: string
 *         status:
 *           type: string
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Retrieve a list of books.
 *     description: Retrieve a list of books.
 *     responses:
 *       200:
 *         description: A list of books.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 */

const express = require('express');
const router = express.Router(); // Создаем экземпляр Router

// Определение маршрутов
router.post("/", (req, res) => {
  // Обработка запроса POST
});

router.get("/", (req, res) => {
  // Обработка запроса GET
});

module.exports = router; // Экспортируем router, а не app
