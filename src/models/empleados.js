const mongoose = require("mongoose");

const empleadosModel = new mongoose.Schema({
    nameandsurnameofemployees: {
      type: String,
      required: true,
    },
    employeeage: {
      type: Number,
      required: true,
    },
    roleinthecompany: {
      type: String,
    },
    startdateinthecompany: {
      type: Number,
      required: true,
    },
    workinghours: {
      type: String,
      required: true,
    },
    freedays: {
        type: String,
        required: true,
      },
      sure: {
        type: String,
        required: true,
      },
      phonenumber: {
        type: Number,
        required: true,
      },
    ID:{
        type: String,
        required: true,
      },
  });
  
  // Exporta el modelo usando mongoose.model con los nombres separados por una coma
  const EmpleadosModel = mongoose.model("Empleados", empleadosModel);
  module.exports = EmpleadosModel;
  