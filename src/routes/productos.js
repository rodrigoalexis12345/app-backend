//LLamamos al paquete Express
const express = require("express");
//Esto nos ayuda a configurar las rutas
const router = express.Router();
//Llamamos a la coleccion creada en Models
const productosModel = require("../models/productos");

//GET
router.get("/productos", (req, res) => {
    productosModel
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

//GET CON ID
router.get("/productos/:id", (req, res) => {
  const { id } = req.params;
  productosModel
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//post
router.post("/productos", (req, res) => {
  const productos = productosModel(req.body);
  productos
    .save()
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//put actualisar registro
router.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  const {
    Productname,
    colors,
    stock,
    sizes,
    Productstatus,
  } = req.body;
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

//DELETE
router.delete("/productos/:id", (req, res) => {
  const { id } = req.params;
  productosModel
    .deleteOne({ _id: id })
    .then((data) => res.json({ mensaje: "Objeto eliminado" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
