//LLamamos al paquete Express
const express = require("express");
//Esto nos ayuda a configurar las rutas
const router = express.Router();
//Llamamos a la coleccion creada en Models
const empleadosModel = require("../models/empleados");
//Swagger documentacion apis
/**
 * @swagger
 * components:
 *   schemas:
 *     Empleados:
 *       type: object
 *       properties:
 *         nameandsurnameofemployees:
 *           type: string
 *           description: Nombre del colaborador
 *         employeeage:
 *           type: number
 *           description: Edad del colaborador
 *         roleinthecompany:
 *           type: string
 *           description: Puesto en la empresa
 *         startdateinthecompany:
 *           type: number
 *           description: Fecha de inicio en la empresa
 *         workinghours:
 *           type: string
 *           description: Horario de trabajo del colaborador
 *         freedays:
 *           type: string
 *           description: Días libres del colaborador
 *         sure:
 *           type: string
 *           description: Carnet de seguro
 *         phonenumber:
 *           type: number
 *           description: Número de teléfono
 *         ID:
 *           type: string
 *           description: Identificación del colaborador
 *       required:
 *         - nameandsurnameofemployees
 *         - employeeage
 *         - phonenumber
 *         - roleinthecompany
 *         - startdateinthecompany
 *         - workinghours
 *         - freedays
 *         - sure
 *         - ID
 *       example:
 *         nameandsurnameofemployees: Alexis
 *         employeeage: 15
 *         phonenumber: 152331520
 *         roleinthecompany: Manager
 *         startdateinthecompany: 20230101
 *         workinghours: 9 AM - 5 PM
 *         freedays: Saturday, Sunday
 *         sure: XYZ123
 *         ID: 75962031
 */

//GET
router.get("/empleados", (req, res) => {
  empleadosModel
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

//GET CON ID
router.get("/empleados/:id", (req, res) => {
  const { id } = req.params;
  empleadosModel
    .findById(id)
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//post
router.post("/empleados", (req, res) => {
  const empleados = empleadosModel(req.body);
  empleados
    .save()
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//put actualisar registro
router.delete("/empleados/:id", (req, res) => {
  const { id } = req.params;
  const {
    nameandsurname,
    employeeage,
    roleinthecompany,
    startdateinthecompany,
    workinghours,
    freedays,
    sure,
    phonenumber,
    ID,
  } = req.body;
  empleadosModel
    .updateOne(
      { _id: id },
      {
        $set: {
          nameandsurname,
          employeeage,
          roleinthecompany,
          startdateinthecompany,
          workinghours,
          freedays,
          sure,
          phonenumber,
          ID,
        },
      }
    )
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});

//DELETE
router.delete("/empleados/:id", (req, res) => {
  const { id } = req.params;
  empleadosModel
    .deleteOne({ _id: id })
    .then((data) => res.json({ mensaje: "Objeto eliminado" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
