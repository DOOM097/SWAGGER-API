/**
 * @swagger
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         name:
 *           type: string
 */

/**
 * @swagger
 * /api/authors:
 *   get:
 *     summary: Получить список авторов.
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Author'
 */


module.exports=app=>{
    const authors = require("../controllers/authorController")
    const router = require("express").Router()

    router.post("/", authors.create)

    router.get("/", authors.findAll)

    app.use('/api/authors', router)

}   