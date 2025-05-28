const productModel = require("../models/productModel");
// This code imports the product model from the models directory.

// get all products api - GET /api/v1/products
exports.getProducts = async (req, res, next) => {
  const query = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};
  const products = await productModel.find(query);

  res.json({
    sucess: true,
    message: "All products",
    products: products,
    productsCount: products.length,
  });
};

// get single product api - GET /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
  try {
    // Assuming the product ID is passed as a URL parameter
    const productId = req.params.id;
    // Here you would typically fetch the product by ID from the database
    const product = await productModel.findById(productId);
    res.json({
      sucess: true,
      message: "Product details",
      product: product,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};
