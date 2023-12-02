const mongoose = require("mongoose");

const inventariosModel = new mongoose.Schema({
  productname: {
    type: String,
    required: true,
  },
  productcode: {
    type: String,
    required: true,
  },
  currentExistence: {
    type: Number,
  },
  minimumReplacementQuantity: {
    type: Number,
    required: true,
  },
  storageLocation1: {
    type: String,
    required: true,
  },
});

// Exporta el modelo usando mongoose.model con los nombres separados por una coma
const InventariosModel = mongoose.model("Inventarios", inventariosModel);
module.exports = InventariosModel;
