const { DataTypes, literal, col } = require("sequelize");
const moment = require("moment");

module.exports = sequelize => {
	// defino el modelo
	sequelize.define("purchase", {
		date: {
			type: DataTypes.DATE,
			allowNull: false,
			get: function () {
				return moment.utc(this.getDataValue("date")).format("DD/MM/YYYY");
			},
		},
		address:{
			type: DataTypes.STRING,
		}
	});
};
