const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cartItems: Array,
  amount: String,
  status: String,
  createdAt: Date,
});

const orderModel = mongoose.model("Order", orderSchema);

module.exports = orderModel;
// This code defines a Mongoose schema and model for an order in a MongoDB database.
