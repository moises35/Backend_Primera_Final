const { DataTypes } = require('sequelize');
const sequelize = require('./../configs/sequelize.config');

const Categoria = sequelize.define('Categoria', {
	id: {
		type: DataTypes.INTEGER,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true
	},
	nombre: {
		type: DataTypes.STRING,
		allowNull: false
	}
});

module.exports = { Categoria };