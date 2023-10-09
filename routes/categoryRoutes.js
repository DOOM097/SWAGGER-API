/**
 * @swagger
 * components:
 *   schemas:
 *       Category:
 *           type: object
 *           required:
 *              - name
 *           properties:
 *               id:
 *                   type: integer
 *               name:
 *                   type: string
 *               example:
 *                   name: RESTful API
 *  
 */

/**
 * @swagger
 * /api/categories:
 *   get:
 *     summary: Retrieve a list of categories.
 *     description: Retrieve a list of categories.
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items: 
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The category ID.
 * 
 */

module.exports=app=>{
    const categories = require("../controllers/categoryController")
    const router = require("express").Router()

    router.post("/", categories.create)

    router.get("/", categories.findAll)

    app.use('/api/categories', router)

}