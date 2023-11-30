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
 *     Inventario:
 *       type: object
 *       properties:
 *         productname:
 *           type: string
 *           description: Nombre del producto
 *         productcode:
 *           type: string
 *           description: Código del producto
 *         currentExistence:
 *           type: number
 *           description: Existencia actual del producto
 *         minimumReplacementQuantity:
 *           type: number
 *           description: Cantidad mínima de reposición
 *         storageLocation:
 *           type: string
 *           description: Ubicación del producto
 *       required:
 *         - productname
 *         - productcode
 *         - currentExistence
 *         - minimumReplacementQuantity
 *         - storageLocation
 *       example:
 *         productname: Zapatos de correr
 *         productcode: ABC123
 *         currentExistence: 50
 *         minimumReplacementQuantity: 10
 *         storageLocation: Estanteria F-5
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
 * /api/inventarios/{id}:
 *   get:
 *     summary: Lista el inventario por su ID
 *     tags:
 *       - Inventarios
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del inventario a buscar
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
router.get("/inventarios/:id", (req, res) => {
  const { id } = req.params;
  inventariosModel
    .findById(id)
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
 * /api/inventarios/{id}:
 *   put:
 *     summary: Actualizar el inventario por su ID
 *     tags:
 *       - Inventarios
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del Inventario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 $ref: '#components/schemas/Inventarios'
 *     responses:
 *       200:
 *         description: Inventario actualizado
 *       404:
 *         description: Inventario no encontrado
 */
//put actualisar registro
router.put("/inventarios/:id", (req, res) => {
  const { id } = req.params;
  const {
    productname,
    productcode,
    currentExistence,
    miniumReplacementQuantity,
    storageLocation,
  } = req.body;
  inventariosModel
    .updateOne(
      { _id: id },
      {
        $set: {
          productname,
          productcode,
          currentExistence,
          miniumReplacementQuantity,
          storageLocation,
        },
      }
    )
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion delete con swagger
/**
 * @swagger
 * /api/inventarios/{id}:
 *   delete:
 *     summary: Elimina inventario por su ID
 *     tags:
 *       - Inventarios
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del Inventario a eliminar
 *     responses:
 *       200:
 *         description: Inventario eliminado
 *       404:
 *         description: Inventario no encontrado
 */
//DELETE
router.delete("/inventarios/:id", (req, res) => {
  const { id } = req.params;
  inventariosModel
    .deleteOne({ _id: id })
    .then((data) => res.json({ mensaje: "Objeto eliminado" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
