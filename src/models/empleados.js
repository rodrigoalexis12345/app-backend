const mongoose = require("mongoose");

const empleadosModel = new mongoose.Schema({
  namesandsurnamesofemployees: {
    type: String,
    required: true,
  },
  employeeage: {
    type: Number,
    required: true,
  },
  roleinthecompany: {
    type: String,
    required: true,
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
  phonenumber1: {
    type: Number,
    required: true,
  },
  ID: {
    type: Number,
    required: true,
  },
});

// Exporta el modelo usando mongoose.model con los nombres separados por una coma
const EmpleadosModel = mongoose.model("Empleados", empleadosModel);
module.exports = EmpleadosModel;
