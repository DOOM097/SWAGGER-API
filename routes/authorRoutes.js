const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Получить список всех авторов
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/models/author.js'
 */
router.get('/authors', authorController.getAllAuthors);

module.exports = router;
