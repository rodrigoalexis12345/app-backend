const mongoose = require("mongoose");

const productosModel = new mongoose.Schema({
  Productname: {
    type: String,
    required: true,
  },
  colors: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
  },
  sizes: {
    type: String,
    required: true,
  },
  Productstatus: {
    type: String,
    required: true,
  },
});

// Exporta el modelo usando mongoose.model con los nombres separados por una coma
const ProductosModel = mongoose.model("Productos", productosModel);
module.exports = ProductosModel;
