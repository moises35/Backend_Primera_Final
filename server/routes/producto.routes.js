const express = require('express');
const router = express.Router();
const productoControllers = require('./../controllers/producto.controllers');

// Routes
router.post('/', productoControllers.createProduct);
router.get('/', productoControllers.getAllProducts);
router.get('/:productId', productoControllers.getProductById);
router.put('/:productId', productoControllers.updateProduct);
router.delete('/:productId', productoControllers.deleteProduct);

// Export
module.exports = router;