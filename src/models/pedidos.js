const mongoose = require("mongoose");

const pedidosModel = new mongoose.Schema({
  customerwhoplacedtheorder: {
    type: String,
    required: true,
  },
  orderedproducts: {
    type: Number,
    required: true,
  },
  product1: {
    type: String,
    required: true,
  },
  amount1: {
    type: Number,
    required: true,
  },
  unitprice1: {
    type: String,
    required: true,
  },
  product2: {
    type: String,
    required: true,
  },
  amount2: {
    type: Number,
    required: true,
  },
  unitprice2: {
    type: String,
    required: true,
  },
  orderstatus: {
    type: String,
    required: true,
  },
  shippingaddrees: {
    type: String,
    required: true,
  },
  card: {
    type: String,
    required: true,
  },
  totaltopay: {
    type: String,
    required: true,
  },
});

// Exporta el modelo usando mongoose.model con los nombres separados por una coma
const PedidosModel = mongoose.model("Pedidos", pedidosModel);
module.exports = PedidosModel;
