/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the book.
 *         title:
 *           type: string
 *           description: The title of the book.
 *         isbn:
 *           type: string
 *           description: The ISBN of the book.
 *         pageCount:
 *           type: integer
 *           description: The number of pages in the book.
 *         publishedDate:
 *           type: string
 *           format: date
 *           description: The published date of the book.
 *         thumbnailUrl:
 *           type: string
 *           description: URL of the book's thumbnail.
 *         shortDescription:
 *           type: string
 *           description: Short description of the book.
 *         longDescription:
 *           type: string
 *           description: Long description of the book.
 *         status:
 *           type: string
 *           description: The status of the book.
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
const router = express.Router();
const bookController = require('../controllers/bookController');


router.get('/books', bookController.getAllBooks);

module.exports = router;
