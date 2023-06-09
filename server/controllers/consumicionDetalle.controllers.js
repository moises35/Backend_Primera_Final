const { ConsumicionDetalle } = require('./../models/consumicionDetalle.model');
const  { Consumicion } = require('./../models/consumicion.model');
const { Producto } = require('./../models/producto.model');

// Obtener todos los detalles de consumición
const getAllConsumicionDetalles = (req, res) => {
    ConsumicionDetalle.findAll({
        include: [
            {
                model: Consumicion,
            },
            {
                model: Producto,
            },
        ],
    })
        .then((detalles) => {
            res.status(200).json(detalles);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al obtener los detalles de consumición' });
        });
};

// Obtener detalles de consumición por ID de consumición
const getConsumicionDetallesByConsumicionId = (req, res) => {
    const { consumicionId } = req.params;

    ConsumicionDetalle.findAll({
        where: { consumicionId },
        include: [
            {
                model: Consumicion,
            },
            {
                model: Producto,
            },
        ],
    })
        .then((detalles) => {
            res.status(200).json(detalles);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al obtener los detalles de consumición' });
        });
};

// Crear un nuevo detalle de consumición
const createConsumicionDetalle = (req, res) => {
    const { consumicionId, productoId, cantidad } = req.body;

    ConsumicionDetalle.create({
        consumicionId,
        productoId,
        cantidad,
    })
        .then((detalle) => {
            res.status(201).json(detalle);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al crear el detalle de consumición' });
        });
};

module.exports = {
    getAllConsumicionDetalles,
    getConsumicionDetallesByConsumicionId,
    createConsumicionDetalle,
};
