//Llamada de Paquetes
const express = require("express");
//Paquete MONGO.DB
const mongoose = require("mongoose");
//estamos traendo el archivo de clientes.js routes
const clientes = require("./routes/clientes");
const empleados= require( "./routes/empleados");
//AVANCE
//const swagerUI = require("swagger-ui-espress");
//const swaguerJSDoc=require("swagguer-jsdoc")
// path=require("path")
//llamamos al paquete dotenv
require("dotenv").config();
//Configuraciones
const aplicacion = express();
const puerto = 4000;
//Configuraciones swagger


//Rutas
aplicacion.get("/prueba", (req, res) => {
  res.send("pagina de prueba ");
});
aplicacion.get("/", (req, res) => {
  res.send("pagina de raiz");
});
//Ruta MongoDB
aplicacion.use(
  "/api", clientes,empleados
);
//Ejecucion MONGO:DB
//Ponemos entre el ? retrywrites el nombre de nuestra base de datos
mongoose
  .connect(process.env.mongodb_conexion)
  .then(() => {
    console.log("conexion realizada");
  })
  .catch((error) => {
    console.log(error);
  });

//Ejecucion
aplicacion.listen(puerto, () => {
  console.log("aplicacion ejecutandose");
});
