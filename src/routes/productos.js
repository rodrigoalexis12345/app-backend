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
 *           type: string
 *           description: Colores disponibles
 *         stock:
 *           type: number
 *           description: Cantidad en stock
 *         sizes:
 *           type: string
 *           description: Tallas disponibles
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
 *         colors: verde , rojo , azul
 *         stock: 30
 *         sizes: Desde 40 a 43
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
 * /api/productos/{Productname}:
 *   get:
 *     summary: Lista un producto por su nombre y apellido
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: Productname
 *         schema:
 *           type: string
 *         required: true
 *         description: Productname del producto a buscar
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
 *         description: El producto consultado no existe
 */
//GET CON ID
router.get("/productos/:Productname", (req, res) => {
  const { Productname } = req.params;
  productosModel
    .findOne({ Productname }) // Buscar por productname en lugar de _id
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
//Operacion put en swagger
/**
 * @swagger
 * /api/productos/{Productname}:
 *   put:
 *     summary: Actualiza un producto existente pos su Productname
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: Productname
 *         required: true
 *         description: Productname del producto a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Productos'
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */

//put actualisar registro
router.put("/productos/:Productname", (req, res) => {
  const { Productname } = req.params;
  const { Productname:new_Productname, colors, stock, sizes, Productstatus } = req.body;
  productosModel
    .updateOne(
      { Productname },
      {
        $set: {
          Productname:new_Productname,
          colors,
          stock,
          sizes,
          Productstatus,
        },
      }
    )
    .then((data) => res.json({ mensaje: "Producto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion delete con swagger productos
/**
 * @swagger
 * /api/productos/{Productname}:
 *   delete:
 *     summary: Elimina un producto por su Productname
 *     tags:
 *       - Productos
 *     parameters:
 *       - in: path
 *         name: Productname
 *         schema:
 *           type: string
 *         required: true
 *         description: Productname del Producto a eliminar
 *     responses:
 *       200:
 *         description:  Producto eliminado
 *       404:
 *         description:  Producto no encontrado
 */
//DELETE
router.delete("/productos/:Productname", (req, res) => {
  const { Productname } = req.params;
  productosModel
    .deleteOne({ Productname })
    .then((data) => res.json({ mensaje: "Objeto eliminado" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
