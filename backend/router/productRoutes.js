// File: routes/productRoutes.js
const express = require('express');
const { getProducts, addProduct } = require('../controller/productController');

const router = express.Router();

router.get('/', getProducts);
router.post('/', addProduct);

module.exports = router;