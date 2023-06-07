// Category.js
const { DataTypes } = require('sequelize');
const sequelize = require('./../configs/sequelize.config');

const Category = sequelize.define('Category', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Category;