const { DataTypes } = require('sequelize');
const sequelize = require('./../configs/sequelize.config');
const { Cliente } = require('./cliente.model');
const { Mesa } = require('./mesa.model');

const Consumicion = sequelize.define('Consumicion', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mesaId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    isClosed: {
        field: 'is_closed',
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    total: {
        field: 'total',
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE, 
        allowNull: false,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    closedAt: {
        field: 'closed_at',
        type: DataTypes.DATE,
        allowNull: true,
    },
});

Consumicion.belongsTo(Cliente, { foreignKey: 'clienteId' });
Consumicion.belongsTo(Mesa, { foreignKey: 'mesaId' });

module.exports = { Consumicion };