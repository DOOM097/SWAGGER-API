module.exports = (app) => {
const express = require("express");
const books = require("../controllers/booksController");
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: API endpoints for managing books
 */


/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the book
 *               isbn:
 *                 type: string
 *                 description: The ISBN of the book
 *               pageCount:
 *                 type: integer
 *                 description: The number of pages in the book
 *               publishedDate:
 *                 type: string
 *                 format: date
 *                 description: The published date of the book in ISO 8601 format
 *               thumbnailUrl:
 *                 type: string
 *                 description: URL of the book's thumbnail image
 *               shortDescription:
 *                 type: string
 *                 description: A short description of the book
 *               longDescription:
 *                 type: string
 *                 description: A long description of the book
 *               status:
 *                 type: string
 *                 enum: [PUBLISH, DRAFT, ARCHIVE]
 *                 description: The status of the book (PUBLISH, DRAFT, or ARCHIVE)
 *               authors:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of author names
 *               categories:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: An array of category names
 *     responses:
 *       '200':
 *         description: Successfully created a new book
 *       '500':
 *         description: Internal server error
 */
router.post("/", books.create);



/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Показать все книги
 *     tags: [Books]
 *     responses:
 *       '200':
 *         description: Successfully retrieved books
 *       '500':
 *         description: Internal server error
 */
router.get("/", books.findAll);

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       '200':
 *         description: Successfully updated the book
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */
router.put("/:id", books.update);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to delete
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Successfully deleted the book
 *       '404':
 *         description: Book not found
 *       '500':
 *         description: Internal server error
 */
router.delete("/:id", books.delete);

/**
 * @swagger
 * /api/books/search:
 *   get:
 *     summary: Показать книги, в названии которых есть искомое слово, например, program
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: searchTerm
 *         required: true
 *         description: Title to search for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved books matching the title
 *       '500':
 *         description: Internal server error
 */
router.get("/search", books.searchByTitle);


/**
 * @swagger
 * /api/books/author/name/{name}:
 *   get:
 *     summary: Показать книги определенного автора
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Name of the author to search for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved books by the author's name
 *       '500':
 *         description: Internal server error
 */
router.get("/author/name/:name", books.findByAuthorName);

/**
 * @swagger
 * /api/books/category/name/{name}:
 *   get:
 *     summary: Показать книги определенной категории, например Java
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: Name of the category to search for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved books by the category name
 *       '500':
 *         description: Internal server error
 */
router.get("/category/name/:name", books.findByCategory);


  app.use("/api/books", router);
};
