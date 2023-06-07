const express = require('express');
const router = express.Router();
const categoriaControllers = require('./../controllers/categoria.controllers');

// Routes
router.post('/', categoriaControllers.createCategory);
router.get('/', categoriaControllers.getAllCategories);
router.get('/:categoryId', categoriaControllers.getCategoryById);
router.put('/:categoryId', categoriaControllers.updateCategory);
router.delete('/:categoryId', categoriaControllers.deleteCategory);


// Export
module.exports = router;