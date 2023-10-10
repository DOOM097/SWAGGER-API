/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: API for managing authors
 */

module.exports = (app) => {
    const authors = require("../controllers/authorsControllers.js");
    const router = require("express").Router();
  
    /**
     * @swagger
     * /api/authors:
     *   post:
     *     summary: Create a new author
     *     tags: [Authors]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The name of the author
     *     responses:
     *       '201':
     *         description: Author created successfully
     *       '500':
     *         description: Internal server error
     */
    router.post("/", authors.create);
  
    /**
     * @swagger
     * /api/authors:
     *   get:
     *     summary: Get all authors
     *     tags: [Authors]
     *     responses:
     *       '200':
     *         description: Successfully retrieved authors
     *       '500':
     *         description: Internal server error
     */
    router.get("/", authors.findAll);
  
    /**
     * @swagger
     * /api/authors/{id}:
     *   put:
     *     summary: Update an author by ID
     *     tags: [Authors]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the author to update
     *         schema:
     *           type: integer
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The new name of the author
     *     responses:
     *       '200':
     *         description: Author updated successfully
     *       '404':
     *         description: Author not found
     *       '500':
     *         description: Internal server error
     */
    router.put("/:id", authors.update);
  
    /**
     * @swagger
     * /api/authors/{id}:
     *   delete:
     *     summary: Delete an author by ID
     *     tags: [Authors]
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         description: ID of the author to delete
     *         schema:
     *           type: integer
     *     responses:
     *       '200':
     *         description: Author deleted successfully
     *       '404':
     *         description: Author not found
     *       '500':
     *         description: Internal server error
     */
    router.delete("/:id", authors.delete);
  
    app.use("/api/authors", router);
  };
  