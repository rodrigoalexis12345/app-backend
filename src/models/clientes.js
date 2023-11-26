const mongoose = require("mongoose");

const clientesModel = new mongoose.Schema({
  nameandsurname: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  phonenumber: {
    type: Number,
  },
  shipingaddress: {
    type: String,
    required: true,
  },
  favoriteshoebrand: {
    type: String,
    required: true,
  },
});

// Exporta el modelo usando mongoose.model con los nombres separados por una coma
const ClientesModel = mongoose.model("Clientes", clientesModel);
module.exports = ClientesModel;