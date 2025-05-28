const express = require('express');
const { createOrder } = require('../controllers/orderController');
const router = express.Router();

router.route('/order').post(createOrder);

module.exports = router;
// This code defines an Express router for handling order-related routes.