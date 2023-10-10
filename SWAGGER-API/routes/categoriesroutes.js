module.exports = (app) => {
    const categories = require("../controllers/categoryController.js");
    const router = require("express").Router();

    /**
     * @swagger
     * tags:
     *   name: Categories
     *   description: API endpoints for managing categories
     */

    /**
     * @swagger
     * /api/categories:
     *   post:
     *     summary: создает новую категорию
     *     tags: [Categories]
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: имя категории.
     *             required:
     *               - name
     *     responses:
     *       200:
     *         description: The created category.
     *       400:
     *         description: Bad request.
     */
    router.post("/", categories.create);

    /**
     * @swagger
     * /api/categories:
     *   get:
     *     summary: Get all categories
     *     tags: [Categories]
     *     responses:
     *       200:
     *         description: A list of categories.
     */
    router.get("/", categories.findAll);

    /**
     * @swagger
     * /api/categories/{id}:
     *   put:
     *     summary: Update a category by ID
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *           description: The ID of the category to update.
     *         required: true
     *         description: The ID of the category to update.
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               name:
     *                 type: string
     *                 description: The updated name of the category.
     *             required:
     *               - name
     *     responses:
     *       200:
     *         description: The updated category.
     *       400:
     *         description: Bad request.
     *       404:
     *         description: Category not found.
     */
    router.put("/:id", categories.update);

    /**
     * @swagger
     * /api/categories/{id}:
     *   delete:
     *     summary: Delete a category by ID
     *     tags: [Categories]
     *     parameters:
     *       - in: path
     *         name: id
     *         schema:
     *           type: integer
     *           description: The ID of the category to delete.
     *         required: true
     *         description: The ID of the category to delete.
     *     responses:
     *       200:
     *         description: The deleted category.
     *       404:
     *         description: Category not found.
     */
    router.delete("/:id", categories.delete);

    /**
     * @swagger
     * /api/categories/withBookCount:
     *   get:
     *     summary: Показать категории и количество книг в каждой категории
     *     tags: [Categories]
     *     responses:
     *       200:
     *         description: A list of categories with book counts.
     */
    router.get("/withBookCount", categories.getBookCountByCategory);

    app.use("/api/categories", router);
};
