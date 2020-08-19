const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	sequelize.define("status", {
		name: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});
};
