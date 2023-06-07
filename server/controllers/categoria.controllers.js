const { Categoria } = require('./../models/categoria.model');

// api/categoria
const createCategory = (req, res) => {
    const { nombre } = req.body;

    Categoria.create({ nombre })
        .then((category) => {
            res.status(201).json(category);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al crear la categoría' });
        });
};

// api/categoria
const getAllCategories = (req, res) => {
    Categoria.findAll()
        .then((categories) => {
            res.status(200).json(categories);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al obtener las categorías' });
        });
};

// api/categoria/:categoryId
const getCategoryById = (req, res) => {
    const { categoryId } = req.params;

    Categoria.findByPk(categoryId)
        .then((category) => {
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ error: 'Categoría no encontrada' });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al obtener la categoría' });
        });
};

// api/categoria/:categoryId
const updateCategory = (req, res) => {
    const { categoryId } = req.params;
    const { nombre } = req.body;

    Categoria.findByPk(categoryId)
        .then((category) => {
            if (category) {
                category.nombre = nombre;
                return category.save();
            } else {
                throw new Error('Categoría no encontrada');
            }
        })
        .then((updatedCategory) => {
            res.status(200).json(updatedCategory);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al actualizar la categoría' });
        });
};

// api/categoria/:categoryId
const deleteCategory = (req, res) => {
    const { categoryId } = req.params;

    Categoria.findByPk(categoryId)
        .then((category) => {
            if (category) {
                return category.destroy();
            } else {
                throw new Error('Categoría no encontrada');
            }
        })
        .then(() => {
            res.status(204).end();
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al eliminar la categoría' });
        });
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory,
};
