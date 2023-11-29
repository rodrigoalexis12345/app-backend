//LLamamos al paquete Express
const express = require("express");
//Esto nos ayuda a configurar las rutas
const router = express.Router();
//Llamamos a la coleccion creada en Models
const pedidosModel = require("../models/pedidos");
//Swagger documentacion apis
/**
 * @swagger
 * components:
 *   schemas:
 *     Pedidos:
 *       type: object
 *       properties:
 *         customerWhoPlacedTheOrder:
 *           type: string
 *           description: Cliente que realiza el pedido
 *         orderedProducts:
 *           type: array
 *           description: Productos ordenados por el cliente
 *           items:
 *             type: object
 *             properties:
 *               product1:
 *                 type: string
 *                 description: Primer pedido
 *               product2:
 *                 type: string
 *                 description: Segundo pedido
 *         amount1:
 *           type: number
 *           description: Número de pedido del primer producto
 *         amount2:
 *           type: number
 *           description: Número de pedido del segundo producto
 *         unitPrice1:
 *           type: number
 *           description: Precio por unidad del primer producto
 *         unitPrice2:
 *           type: number
 *           description: Precio por unidad del segundo producto
 *         orderStatus:
 *           type: string
 *           description: Estado del pedido
 *         shippingAddress:
 *           type: string
 *           description: Dirección de entrega
 *         card:
 *           type: string
 *           description: Método de pago
 *         totalToPay:
 *           type: number
 *           description: Precio final a pagar
 *       required:
 *         - customerWhoPlacedTheOrder
 *         - orderedProducts
 *         - amount1
 *         - amount2
 *         - unitPrice1
 *         - unitPrice2
 *         - orderStatus
 *         - shippingAddress
 *         - card
 *         - totalToPay
 *         - product1
 *         - product2
 *       example:
 *         customerWhoPlacedTheOrder: Alexis
 *         orderedProducts:
 *           - product1: Zapatos
 *           - product2: Camiseta
 *         amount1: 1
 *         amount2: 2
 *         unitPrice1: 50
 *         unitPrice2: 150
 *         orderStatus: Enviado
 *         shippingAddress: Calle Principal 123
 *         card: Visa
 *         totalToPay: 100
 */
//operaciones GET swagger Pedidos
/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Lista todas los pedidos
 *     tags:
 *       - Pedidos
 *     responses:
 *       200:
 *         description: Pedidos mostrados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Pedidos'
 */
//GET
router.get("/pedidos", (req, res) => {
  pedidosModel
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion get con ID swagger
/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Lista un pedido por su ID
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del pedido a buscar
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Pedido'
 *       404:
 *         description: El pedido consultado no existe
 */
//GET CON ID
router.get("/pedidos/:id", (req, res) => {
  const { id } = req.params;
  pedidosModel
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion Post con  swagger Pedidos
/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Crea un nuevo pedido
 *     tags:
 *       - Pedidos
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Pedidos'
 *     responses:
 *       200:
 *         description: Venta guardada
 */
//post
router.post("/pedidos", (req, res) => {
  const pedidos = pedidosModel(req.body);
  pedidosModel
    .save()
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion put en swagger pedidos
/**
 * @swagger
 * /api/pedidos/{id}:
 *   put:
 *     summary: Actualizar el pedido por su ID
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del Pedido a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               item:
 *                 $ref: '#components/schemas/Pedidos'
 *     responses:
 *       200:
 *         description: Pedido actualizado
 *       404:
 *         description: Pedido no encontrado
 */
//put actualisar registro
router.delete("/pedidos/:id", (req, res) => {
  const { id } = req.params;
  const {
    customerwhoplacedtheorder,
    orderedproducts,
    product1,
    amount1,
    unitprice1,
    product2,
    amount2,
    unitprice,
    orderstatus,
    shippingaddrees,
    card,
    totaltopay,
  } = req.body;
  pedidosModel
    .updateOne(
      { _id: id },
      {
        $set: {
          customerwhoplacedtheorder,
          orderedproducts,
          product1,
          amount1,
          unitprice1,
          product2,
          amount2,
          unitprice,
          orderstatus,
          shippingaddrees,
          card,
          totaltopay,
        },
      }
    )
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion delete con swagger pedidos
/**
 * @swagger
 * /api/pedidos/{id}:
 *   delete:
 *     summary: Elimina un pedido por su ID
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del pedido a eliminar
 *     responses:
 *       200:
 *         description: Pedido eliminado
 *       404:
 *         description: Pedido no encontrado
 */
//DELETE
router.delete("/pedidos/:id", (req, res) => {
  const { id } = req.params;
  pedidosModel
    .deleteOne({ _id: id })
    .then((data) => res.json({ mensaje: "Objeto eliminado" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
