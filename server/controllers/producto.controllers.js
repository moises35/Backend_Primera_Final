const { Producto } = require('./../models/producto.model');
const { Categoria } = require('./../models/categoria.model');

// api/producto
const createProduct = (req, res) => {
    const { nombre, categoryId, precioVenta } = req.body;

    Producto.create({ nombre, categoryId, precioVenta })
        .then((product) => {
            res.status(201).json(product);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al crear el producto' });
        });
};

// api/producto
const getAllProducts = (req, res) => {
    Producto.findAll({ include: [Categoria] })
        .then((products) => {
            res.status(200).json(products);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al obtener los productos' });
        });
};

// api/producto/:productId
const getProductById = (req, res) => {
    const { productId } = req.params;

    Producto.findByPk(productId, { include: [Categoria] })
        .then((product) => {
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: 'Producto no encontrado' });
            }
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al obtener el producto' });
        });
};

// api/producto/:productId
const updateProduct = (req, res) => {
    const { productId } = req.params;
    const { nombre, categoryId, precioVenta } = req.body;

    Producto.findByPk(productId)
        .then((product) => {
            if (product) {
                product.nombre = nombre;
                product.categoryId = categoryId;
                product.precioVenta = precioVenta;
                return product.save();
            } else {
                throw new Error('Producto no encontrado');
            }
        })
        .then((updatedProduct) => {
            res.status(200).json(updatedProduct);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al actualizar el producto' });
        });
};

// api/producto/:productId
const deleteProduct = (req, res) => {
    const { productId } = req.params;

    Producto.findByPk(productId)
        .then((product) => {
            if (product) {
                return product.destroy();
            } else {
                throw new Error('Producto no encontrado');
            }
        })
        .then(() => {
            res.status(204).end();
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al eliminar el producto' });
        });
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
