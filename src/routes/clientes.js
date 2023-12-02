//LLamamos al paquete Express
const express = require("express");
//Esto nos ayuda a configurar las rutas
const router = express.Router();
//Llamamos a la coleccion creada en Models
const clientesModel = require("../models/clientes");
//Swagger documentacion apis
/**
 * @swagger
 * components:
 *   schemas:
 *     Clientes:
 *       type: object
 *       properties:
 *         nameandsurname:
 *           type: string
 *           description: Nombre del cliente
 *         age:
 *           type: number
 *           description: Edad del cliente
 *         phonenumber:
 *           type: number
 *           description: Número del cliente
 *         shippingaddress:
 *           type: string
 *           description: Dirección del cliente
 *         favoriteshoebrand:
 *           type: string
 *           description: Marca preferida del cliente
 *       required:
 *         - nameandsurname
 *         - age
 *         - phonenumber
 *         - shippingaddress
 *         - favoriteshoebrand
 *       example:
 *         nameandsurname: Alexis
 *         age: 15
 *         phonenumber: 152331520
 *         shippingaddress: Jose Galves 111
 *         favoriteshoebrand: Nike
 */
//operaciones GET swagger
/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Lista todas las ventas
 *     tags:
 *       - Clientes
 *     responses:
 *       200:
 *         description: Ventas mostradas correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Clientes'
 */
//GET

router.get("/clientes", (req, res) => {
  clientesModel
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion get con ID swagger
/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Lista un cliente por su ID
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente a buscar
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Clientes'
 *       404:
 *         description: La venta consultada no existe
 */
//GET CON ID
router.get("/clientes/:id", (req, res) => {
  const { id } = req.params;
  clientesModel
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion Post con  swagger
/**
 * @swagger
 * /api/clientes:
 *   post:
 *     summary: Crea un nuevo cliente
 *     tags:
 *       - Clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Clientes'
 *     responses:
 *       200:
 *         description: Venta guardada
 */
//post
router.post("/clientes", (req, res) => {
  const clientes = clientesModel(req.body);
  clientes
    .save()
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion put en swagger
/**
 * @swagger
 * /api/clientes/{id}:
 *   put:
 *     summary: Actualiza un cliente existente
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Clientes'
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */

//put actualisar registro
router.put("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const {
    nameandsurname,
    age,
    phonenumber,
    shippingaddress,
    favoriteshoebrand,
  } = req.body;
  clientesModel
    .updateOne(
      { _id: id },
      {
        $set: {
          nameandsurname,
          age,
          phonenumber,
          shippingaddress,
          favoriteshoebrand,
        },
      }
    )
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion delete con swagger clientes
/**
 * @swagger
 * /api/clientes/{id}:
 *   delete:
 *     summary: Elimina un cliente por su ID
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado
 *       404:
 *         description: Cliente no encontrado
 */
//DELETE
router.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;
  clientesModel
    .deleteOne({ _id: id })
    .then((data) => res.json({ mensaje: "Objeto eliminado" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
