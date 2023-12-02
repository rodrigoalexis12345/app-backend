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
 * /api/clientes/{nameandsurname}:
 *   get:
 *     summary: Lista un cliente por su nombre y apellido
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: nameandsurname
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre y apellido del cliente a buscar
 *     responses:
 *       200:
 *         description: Cliente encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Clientes'
 *       404:
 *         description: El cliente consultado no existe
 */

//GET CON ID
router.get("/clientes/:nameandsurname", (req, res) => {
  const { nameandsurname } = req.params;
  clientesModel
    .findOne({ nameandsurname }) // Buscar por nameandsurname en lugar de _id
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
//Swagger metodo PUT DOCUMENTACION
/**
 * @swagger
 * /api/clientes/{nameandsurname}:
 *   put:
 *     summary: Actualiza un cliente existente por su nombre y apellido
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: nameandsurname
 *         required: true
 *         description: Nombre y apellido del cliente a actualizar
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

//Metodo put
router.put("/clientes/:nameandsurname", (req, res) => {
  const { nameandsurname } = req.params;
  const {
    nameandsurname: new_nameandsurname,
    age,
    shippingaddress,
    favoriteshoebrand,
  } = req.body;

  clientesModel
    .updateOne(
      { nameandsurname }, // Buscar por nameandsurname en lugar de _id
      {
        $set: {
          nameandsurname: new_nameandsurname,
          age,
          shippingaddress,
          favoriteshoebrand,
        },
      }
    )
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});

//Documentacion Delete Swagger
/**
 * @swagger
 * /api/clientes/{nameandsurname}:
 *   delete:
 *     summary: Elimina un cliente por su Nombre
 *     tags:
 *       - Clientes
 *     parameters:
 *       - in: path
 *         name: nameandsurname
 *         schema:
 *           type: string
 *         required: true
 *         description: nameandsurname del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
// DELETE por nameandsurname
router.delete("/clientes/:nameandsurname", (req, res) => {
  const { nameandsurname } = req.params;

  clientesModel
    .deleteOne({ nameandsurname }) // Elimina el cliente por el campo nameandsurname
    .then((data) => res.json({ mensaje: "Cliente eliminado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
