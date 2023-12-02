//LLamamos al paquete Express
const express = require("express");
//Esto nos ayuda a configurar las rutas
const router = express.Router();
//Llamamos a la coleccion creada en Models
const inventariosModel = require("../models/inventarios");
//Swagger documentacion apis
/**
 * @swagger
 * components:
 *   schemas:
 *     Inventarios:
 *       type: object
 *       properties:
 *         productname:
 *           type: string
 *           description: Nombre del producto
 *         productcode:
 *           type: string
 *           description: Codigo del producto
 *         currentExistence:
 *           type: number
 *           description: Existencia actual del producto
 *         minimumReplacementQuantity:
 *           type: number
 *           description: Cantida minima de repocision
 *         storageLocation1:
 *           type: string
 *           description: Lugar de Ubicacion del producto
 *       required:
 *         - productname
 *         - productcode
 *         - currentExistence
 *         - minimumReplacementQuantity
 *         - storageLocation1
 *       example:
 *         productname: sandalias hawainas
 *         productcode: ZC62S0
 *         currentExistence: 50
 *         minimumReplacementQuantity: 50
 *         workinghours: 9 AM - 5 PM
 *         storageLocation1: Estanteria F-6
 */

//operaciones GET swagger Inventarios
/**
 * @swagger
 * /api/inventarios:
 *   get:
 *     summary: Lista todo los que esta en inventarios
 *     tags:
 *       - Inventarios
 *     responses:
 *       200:
 *         description: Inventario mostrado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Inventario'
 */
//GET
router.get("/inventarios", (req, res) => {
  inventariosModel
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion get con ID swagger inventario
/**
 * @swagger
 * /api/inventarios/{productname}:
 *   get:
 *     summary: Lista el inventario por su productname
 *     tags:
 *       - Inventarios
 *     parameters:
 *       - in: path
 *         name: productname
 *         schema:
 *           type: string
 *         required: true
 *         description: productname del inventario a buscar
 *     responses:
 *       200:
 *         description: Inventario encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Inventarios'
 *       404:
 *         description: El inventario consultado no existe
 */

//GET CON ID
router.get("/inventarios/:productname", (req, res) => {
  const { productname } = req.params;
  inventariosModel
    .findOne({ productname }) // Buscar por productname en lugar de _id
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion Post con  swagger Inventarios
/**
 * @swagger
 * /api/inventarios:
 *   post:
 *     summary: Crea un nuevo inventario
 *     tags:
 *       - Inventarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Inventarios'
 *     responses:
 *       200:
 *         description: Inventario guardado
 */
//post
router.post("/inventarios", (req, res) => {
  const inventarios = inventariosModel(req.body);
  inventarios
    .save()
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion put en swagger
/**
 * @swagger
 * /api/inventarios/{productname}:
 *   put:
 *     summary: Actualiza un Inventario existente
 *     tags:
 *       - Inventarios
 *     parameters:
 *       - in: path
 *         name: productname
 *         required: true
 *         description: productname del Inventario a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Inventarios'
 *     responses:
 *       200:
 *         description: Inventario actualizado correctamente
 *       404:
 *         description: Inventario no encontrado
 *       500:
 *         description: Inventario interno del servidor
 */

//put actualisar registro
router.put("/inventarios/:productname", (req, res) => {
  const { productname } = req.params;
  const {
    productname: new_productname,
    productcode,
    currentExistence,
    minimumReplacementQuantity,
    storageLocation1,
  } = req.body;
  inventariosModel
    .updateOne(
      { productname },
      {
        $set: {
          productname: new_productname,
          productcode,
          currentExistence,
          minimumReplacementQuantity,
          storageLocation1,
        },
      }
    )
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion delete con swagger
/**
 * @swagger
 * /api/inventarios/{productname}:
 *   delete:
 *     summary: Elimina inventario por su productname
 *     tags:
 *       - Inventarios
 *     parameters:
 *       - in: path
 *         name: productname
 *         schema:
 *           type: string
 *         required: true
 *         description: productname del Inventario a eliminar
 *     responses:
 *       200:
 *         description: Inventario eliminado
 *       404:
 *         description: Inventario no encontrado
 */
//DELETE
router.delete("/inventarios/:productname", (req, res) => {
  const { productname } = req.params;
  inventariosModel
    .deleteOne({ productname })
    .then((data) => res.json({ mensaje: "Objeto eliminado" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
