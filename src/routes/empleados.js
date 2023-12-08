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
 *         namesandsurnamesofemployees:
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
 *         phonenumber1:
 *           type: number
 *           description: Número de teléfono
 *         ID:
 *           type: string
 *           description: Identificación del colaborador
 *       required:
 *         - namesandsurnamesofemployees
 *         - employeeage
 *         - roleinthecompany
 *         - startdateinthecompany
 *         - workinghours
 *         - freedays
 *         - sure
 *         - phonenumber1
 *         - ID
 *       example:
 *         namesandsurnamesofemployees: Alexis
 *         employeeage: 15
 *         roleinthecompany: Manager
 *         startdateinthecompany: 20230101
 *         workinghours: 9 AM - 5 PM
 *         freedays: Saturday, Sunday
 *         sure: Carnet de seguro
 *         phonenumber1: 920123
 *         ID: 75962031
 */
//operaciones GET swagger empleados
/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Lista todas los empleados
 *     tags:
 *       - Empleados
 *     responses:
 *       200:
 *         description: Empleados mostrados correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#components/schemas/Empleados'
 */
//GET
router.get("/empleados", (req, res) => {
  empleadosModel
    .find()
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion get con ID swagger empleados
/**
 * @swagger
 * /api/empleados/{employeeage}:
 *   get:
 *     summary: Lista empleado por su edad
 *     tags:
 *       - Empleados
 *     parameters:
 *       - in: path
 *         name: employeeage
 *         schema:
 *           type: number
 *         required: true
 *         description: Edad del empleado a buscar
 *     responses:
 *       200:
 *         description: Empleado no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#components/schemas/Empleados'
 *       404:
 *         description: El Empleado consultado no existe
 */

//GET CON ID
router.get("/empleados/:employeeage", (req, res) => {
  const { employeeage } = req.params;
  empleadosModel
    .findOne({ employeeage }) // Buscar por nameandsurname en lugar de _id
    .then((data) => res.json(data))
    .catch((error) => res.json({ mensaje: error }));
});

//Operacion Post con  swagger Empleados
/**
 * @swagger
 * /api/empleados:
 *   post:
 *     summary: Crea un nuevo empleado
 *     tags:
 *       - Empleados
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Empleados'
 *     responses:
 *       200:
 *         description: Empleado guardado
 */
//post
router.post("/empleados", (req, res) => {
  const empleados = empleadosModel(req.body);
  empleados
    .save()
    .then((data) => res.json({ mensaje: "Objeto guardado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion put en swagger
/**
 * @swagger
 * /api/empleados/{employeeage}:
 *   put:
 *     summary: Actualiza un Empleado existente
 *     tags:
 *       - Empleados
 *     parameters:
 *       - in: path
 *         name: employeeage
 *         required: true
 *         description: edad del empleado a actualizar
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#components/schemas/Empleados'
 *     responses:
 *       200:
 *         description: Cliente actualizado correctamente
 *       404:
 *         description: Cliente no encontrado
 *       500:
 *         description: Error interno del servidor
 */
//put actualisar registro YA FUNCA 😎
router.put("/empleados/:employeeage", (req, res) => {
  const { employeeage } = req.params;
  const {
    namesandsurnamesofemployees,
    employeeage: new_employeeage,
    roleinthecompany,
    startdateinthecompany,
    workinghours,
    freedays,
    sure,
    phonenumber1,
    ID,
  } = req.body;
  empleadosModel
    .updateOne(
      { employeeage }, // Buscar por employeeage en lugar de _id
      {
        $set: {
          namesandsurnamesofemployees,
          employeeage: new_employeeage,
          roleinthecompany,
          startdateinthecompany,
          workinghours,
          freedays,
          sure,
          phonenumber1,
          ID,
        },
      }
    )
    .then((data) => res.json({ mensaje: "Empleado actualisado correctamente" }))
    .catch((error) => res.json({ mensaje: error }));
});
//Operacion delete con swagger empleados
/**
 * @swagger
 * /api/empleados/{employeeage}:
 *   delete:
 *     summary: Elimina un empleado por su edad
 *     tags:
 *       - Empleados
 *     parameters:
 *       - in: path
 *         name: employeeage
 *         schema:
 *           type: string
 *         required: true
 *         description: Edad del empleado a eliminar
 *     responses:
 *       200:
 *         description: Empleado eliminado
 *       404:
 *         description: Empleado no encontrado
 */
//DELETE
router.delete("/empleados/:employeeage", (req, res) => {
  const { employeeage } = req.params;
  empleadosModel
    .deleteOne({ employeeage })
    .then((data) => res.json({ mensaje: "Objeto eliminado" }))
    .catch((error) => res.json({ mensaje: error }));
});

module.exports = router;
