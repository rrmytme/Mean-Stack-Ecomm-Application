const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: String,
  description: String,
  ratings: String,
  images: [
    {
      image: String,
    },
  ],
  category: String,
  seller: String,
  stock: Number,
  numOfReviews: String,
  createdAt: Date,
});

const productModel = mongoose.model("Product", productSchema);

module.exports = productModel;
// This code defines a Mongoose schema and model for products in a MongoDB database.
