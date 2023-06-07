const { DataTypes } = require('sequelize');
const sequelize = require('./../configs/sequelize.config');

const Category = sequelize.define('Category', {
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

module.exports = { Category };