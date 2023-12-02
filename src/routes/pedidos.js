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
 *         customerwhoplacedtheorder:
 *           type: string
 *           description: Cliente que realiza el pedido
 *         orderedproducts:
 *           type: number
 *           description: Pedidos ordenados
 *           product1:
 *             type: string
 *             description: Primer pedido
 *           amount1:
 *             type: number
 *             description: Cantidad del primer pedido
 *           unitprice1:
 *             type: string
 *             description: Precio unitario del primer pedido
 *           product2:
 *             type: string
 *             description: Segundo pedido
 *           amount2:
 *             type: number
 *             description: Cantidad del segundo pedido
 *           unitprice2:
 *             type: string
 *             description: Precio unitario del segundo pedido
 *         orderstatus:
 *           type: string
 *           description: Estado del pedido
 *         shippingaddrees:
 *           type: string
 *           description: Dirección de entrega
 *         card:
 *           type: string
 *           description: Método de pago
 *         totaltopay:
 *           type: string
 *           description: Precio final a pagar
 *       required:
 *         - customerwhoplacedtheorder
 *         - product1
 *         - amount1
 *         - unitprice1
 *         - product2
 *         - amount2
 *         - unitprice2
 *         - orderstatus
 *         - shippingaddrees
 *         - card
 *         - totaltopay
 *       example:
 *          customerwhoplacedtheorder: Nombre_Cliente
 *          orderedproducts: 2
 *          product1: Producto_1
 *          amount1: 1
 *          unitprice1: 50
 *          product2: Producto_2
 *          amount2: 2
 *          unitprice2: 60
 *          orderstatus: Pendiente
 *          shippingaddrees: Dirección_Entrega
 *          card: Tarjeta_Crédito
 *          totaltopay: 160
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
 * /api/pedidos/{customerwhoplacedtheorder}:
 *   get:
 *     summary: Lista un pedido por el nombre del cliente
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: customerwhoplacedtheorder
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre de la persona
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
router.get("/pedidos/:customerwhoplacedtheorder", (req, res) => {
  const { customerwhoplacedtheorder } = req.params;
  pedidosModel
    .findOne({ customerwhoplacedtheorder }) // Buscar por Nombre en lugar de _id
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion Post con  swagger PEDIDOS
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
 *         description: Pedido guardado
 */
//post
router.post("/pedidos", (req, res) => {
  const empleados = pedidosModel(req.body);
  empleados
    .save()
    .then((data) => res.json({ mensaje: "Pedido guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion put en swagger Pedidos
/**
 * @swagger
 * /api/pedidos/{customerwhoplacedtheorder}:
 *   put:
 *     summary: Actualiza un Pedido existente
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: customerwhoplacedtheorder
 *         required: true
 *         description: Nombre de la persona a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Pedidos'
 *     responses:
 *       200:
 *         description: Pedido actualizado correctamente
 *       404:
 *         description: Pedido no encontrado
 *       500:
 *         description: Error interno del servidor
 */

//put actualisar registro
router.put("/pedidos/:customerwhoplacedtheorder", (req, res) => {
  const { customerwhoplacedtheorder } = req.params;
  const {
    customerwhoplacedtheorder: new_customerwhoplacedtheorder,
    orderedproducts,
    product1,
    amount1,
    unitprice1,
    product2,
    amount2,
    unitprice2,
    orderstatus,
    shippingaddrees,
    card,
    totaltopay,
  } = req.body;

  pedidosModel
    .updateOne(
      { customerwhoplacedtheorder }, // Buscar por Nombre en lugar de _id
      {
        $set: {
          customerwhoplacedtheorder: new_customerwhoplacedtheorder,
          orderedproducts,
          product1,
          amount1,
          unitprice1,
          product2,
          amount2,
          unitprice2,
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
 * /api/pedidos/{customerwhoplacedtheorder}:
 *   delete:
 *     summary: Elimina un pedido por su Nombre
 *     tags:
 *       - Pedidos
 *     parameters:
 *       - in: path
 *         name: customerwhoplacedtheorder
 *         schema:
 *           type: string
 *         required: true
 *         description: customerwhoplacedtheorder del pedido a eliminar
 *     responses:
 *       200:
 *         description: Pedido eliminado
 *       404:
 *         description: Pedido no encontrado
 */
//DELETE
router.delete("/pedidos/:customerwhoplacedtheorder", (req, res) => {
  const { customerwhoplacedtheorder } = req.params;
  pedidosModel
    .deleteOne({ customerwhoplacedtheorder })
    .then((data) => res.json({ mensaje: "Objeto eliminado" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
