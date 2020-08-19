const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	sequelize.define("status", {
		name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	});
};
