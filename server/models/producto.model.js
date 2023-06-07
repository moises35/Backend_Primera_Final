const { DataTypes } = require('sequelize');
const sequelize = require('./../configs/sequelize.config');
const { Categoria } = require('./categoria.model');

const Producto = sequelize.define('Producto', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    precioVenta: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
});

Producto.belongsTo(Categoria, { foreignKey: 'categoryId' });

module.exports = { Producto };
