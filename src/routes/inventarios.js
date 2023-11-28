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

//GET
router.get("/inventarios", (req, res) => {
  inventariosModel
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

//GET CON ID
router.get("/inventarios/:id", (req, res) => {
  const { id } = req.params;
  inventariosModel
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//post
router.post("/inventarios", (req, res) => {
  const inventarios = inventariosModel(req.body);
  inventarios
    .save()
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//put actualisar registro
router.delete("/inventarios/:id", (req, res) => {
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

//DELETE
router.delete("/inventarios/:id", (req, res) => {
  const { id } = req.params;
  inventariosModel
    .deleteOne({ _id: id })
    .then((data) => res.json({ mensaje: "Objeto eliminado" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
