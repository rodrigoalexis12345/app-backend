//LLamamos al paquete Express
const express = require("express");
//Esto nos ayuda a configurar las rutas
const router = express.Router();
//Llamamos a la coleccion creada en Models
const productosModel = require("../models/productos");
//Swagger documentacion apis
/**
 * @swagger
 * components:
 *   schemas:
 *     Productos:
 *       type: object
 *       properties:
 *         Productname:
 *           type: string
 *           description: Nombre del producto
 *         colors:
 *           type: array
 *           description: Colores disponibles
 *           items:
 *             type: string
 *         stock:
 *           type: number
 *           description: Cantidad en stock
 *         sizes:
 *           type: array
 *           description: Tallas disponibles
 *           items:
 *             type: number
 *         Productstatus:
 *           type: string
 *           description: Estado del producto
 *       required:
 *         - Productname
 *         - colors
 *         - stock
 *         - sizes
 *         - Productstatus
 *       example:
 *         Productname: Zapatos de correr
 *         colors: ["verde", "rojo", "azul"]
 *         stock: 30
 *         sizes: [38, 39, 40, 41]
 *         Productstatus: Seminuevo
 */
//operaciones GET swagger Productos
/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Lista todas los productos
 *     tags:
 *       - Productos
 *     responses:
 *       200:
 *         description: Productos mostrados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Productos'
 */
//GET
router.get("/productos", (req, res) => {
  productosModel
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion get con ID swagger
/**
 * @swagger
 * /api/productos/{id}:
 *   get:
 *     summary: Lista un producto por su ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a buscar
 *     responses:
 *       200:
 *         description: Producto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Productos'
 *       404:
 *         description:El producto consultado no existe
 */
//GET CON ID
router.get("/productos/:id", (req, res) => {
  const { id } = req.params;
  productosModel
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion Post con  swagger Productos
/**
 * @swagger
 * /api/productos:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags:
 *       - Productos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Productos'
 *     responses:
 *       200:
 *         description: Producto guardado
 */
//post
router.post("/productos", (req, res) => {
  const productos = productosModel(req.body);
  productos
    .save()
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion put en swagger productos
/**
 * @swagger
 * /api/productos/{id}:
 *   put:
 *     summary: Actualizar el producto por su ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 $ref: '#components/schemas/Productos'
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
//put actualisar registro
router.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  const { Productname, colors, stock, sizes, Productstatus } = req.body;
  productosModel
    .updateOne(
      { _id: id },
      {
        $set: {
          Productname,
          colors,
          stock,
          sizes,
          Productstatus,
        },
      }
    )
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion delete con swagger productos
/**
 * @swagger
 * /api/productos/{id}:
 *   delete:
 *     summary: Elimina un producto por su ID
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del Producto a eliminar
 *     responses:
 *       200:
 *         description:  Producto eliminado
 *       404:
 *         description:  Producto no encontrado
 */
//DELETE
router.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  productosModel
    .deleteOne({ _id: id })
    .then((data) => res.json({ mensaje: "Objeto eliminado" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
