//LLamamos al paquete Express
const express = require("express");
//Esto nos ayuda a configurar las rutas
const router = express.Router();
//Llamamos a la coleccion creada en Models
const pedidosModel = require("../models/pedidos");

//GET
router.get("/pedidos", (req, res) => {
  pedidosModel
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

//GET CON ID
router.get("/pedidos/:id", (req, res) => {
  const { id } = req.params;
  pedidosModel
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//post
router.post("/pedidos", (req, res) => {
  const pedidos = pedidosModel(req.body);
  pedidosModel
    .save()
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
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
            amount,
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
            amount,
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

//DELETE
router.delete("/pedidos/:id", (req, res) => {
  const { id } = req.params;
  pedidosModel
    .deleteOne({ _id: id })
    .then((data) => res.json({ mensaje: "Objeto eliminado" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
