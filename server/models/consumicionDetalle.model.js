const { DataTypes } = require('sequelize');
const sequelize = require('./../configs/sequelize.config');
const { Consumicion } = require('./consumicion.model');
const { Producto } = require('./producto.model');

const ConsumicionDetalle = sequelize.define('ConsumicionDetalle', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  consumicionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

ConsumicionDetalle.belongsTo(Consumicion, { foreignKey: 'consumicionId' });
ConsumicionDetalle.belongsTo(Producto, { foreignKey: 'productoId' });

module.exports = { ConsumicionDetalle };
