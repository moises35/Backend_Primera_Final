const { Consumicion } = require('./../models/consumicion.model');
const { Mesa } = require('./../models/mesa.model');
const { Cliente } = require('./../models/cliente.model');

// Obtener todas las consumiciones
const getAllConsumiciones = (req, res) => {
    Consumicion.findAll({
        include: [
            {
                model: Cliente,
            },
            {
                model: Mesa,
            },
        ],
    })
        .then((consumiciones) => {
            res.status(200).json(consumiciones);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al obtener las consumiciones' });
        });
};

// Obtener consumiciones por ID de mesa
const getConsumicionesByTableId = (req, res) => {
    const { tableId } = req.params;

    Consumicion.findAll({
        where: { mesaId: tableId },
        include: [
            {
                model: Cliente,
            },
            {
                model: Mesa,
            },
        ],
    })
        .then((consumiciones) => {
            res.status(200).json(consumiciones);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al obtener las consumiciones' });
        });
};

// Crear una nueva consumición
const createConsumicion = (req, res) => {
    const { clienteId, mesaId, isClosed, total, createdAt, closedAt } = req.body;

    Consumicion.create({
        clienteId,
        mesaId,
        isClosed,
        total,
        createdAt,
        closedAt,
    })
        .then((consumicion) => {
            res.status(201).json(consumicion);
        })
        .catch((error) => {
            res.status(500).json({ error: `Error al crear la consumición: ${error}` });
        });
};

// Actualizar el cliente de una consumición
const updateClient = (req, res) => {
    const { consumicionId } = req.params;
    const { clienteId } = req.body;

    Consumicion.findByPk(consumicionId)
        .then((consumicion) => {
            if (consumicion) {
                consumicion.clienteId = clienteId;
                return consumicion.save();
            } else {
                throw new Error('Consumición no encontrada');
            }
        })
        .then((updatedConsumicion) => {
            res.status(200).json(updatedConsumicion);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al actualizar la consumición' });
        });
};

// Cerrar una consumición
const closeConsumicion = (req, res) => {
    const { consumicionId } = req.params;
    const { total, closedAt } = req.body;

    Consumicion.findByPk(consumicionId)
        .then((consumicion) => {
            if (consumicion) {
                consumicion.isClosed = true;
                consumicion.total = total;
                consumicion.closedAt = closedAt;
                return consumicion.save();
            } else {
                throw new Error('Consumición no encontrada');
            }
        })
        .then((closedConsumicion) => {
            res.status(200).json(closedConsumicion);
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al cerrar la consumición' });
        });
};

// Eliminar una consumición
const deleteConsumicion = (req, res) => {
    const { consumicionId } = req.params;

    Consumicion.findByPk(consumicionId)
        .then((consumicion) => {
            if (consumicion) {
                return consumicion.destroy();
            } else {
                throw new Error('Consumición no encontrada');
            }
        })
        .then(() => {
            res.status(204).end();
        })
        .catch((error) => {
            res.status(500).json({ error: 'Error al eliminar la consumición' });
        });
};

module.exports = {
    getAllConsumiciones,
    getConsumicionesByTableId,
    createConsumicion,
    updateClient,
    closeConsumicion,
    deleteConsumicion,
};
