//LLamamos al paquete Express
const express = require("express");
//Esto nos ayuda a configurar las rutas
const router = express.Router();
//Llamamos a la coleccion creada en Models
const clientesModel = require("../models/clientes");

//GET
router.get("/clientes", (req, res) => {
  clientesModel
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

//GET CON ID
router.get("/clientes/:id", (req, res) => {
  const { id } = req.params;
  clientesModel
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//post
router.post("/clientes", (req, res) => {
  const clientes = clientesModel(req.body);
  clientesModel
    .save()
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//put actualisar registro
router.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;
  const {
    nameandsurname,
    age,
    phonenumber,
    shipingaddrees,
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
          shipingaddrees,
          favoriteshoebrand,
        },
      }
    )
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});

//DELETE
router.delete("/clientes/:id", (req, res) => {
  const { id } = req.params;
  clientesModel
    .deleteOne({ _id: id })
    .then((data) => res.json({ mensaje: "Objeto eliminado" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
