//Llamada de Paquetes
const express = require("express");
//Paquete MONGO.DB
const mongoose = require("mongoose");
// implementacion de las apis
//estamos traendo el archivo de clientes.js routes
const clientes = require("./routes/clientes");
const empleados = require("./routes/empleados");
const inventarios = require("./routes/inventarios");
const pedidos = require("./routes/pedidos");
const productos = require("./routes/productos");

//AVANCE Swuager
const swaggerUI = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");
//Fin swager
//llamamos al paquete dotenv
require("dotenv").config();
//Configuraciones
const aplicacion = express();
const puerto = 4000;
//Configuraciones swagger
const swaggerConf = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Documentacion de apis",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],
};
//fin configuracion swuagger
//Rutas
//Video hora 1.19.30
aplicacion.use(express.json());
//Ruta MongoDB
aplicacion.use("/api", clientes, empleados, inventarios, pedidos, productos);
//Swuager rutas
aplicacion.use(
  "/api-doc",
  swaggerUI.serve,
  swaggerUI.setup(swaggerJSDoc(swaggerConf))
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
