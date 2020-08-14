const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	// defino el modelo
	sequelize.define("purchased_products", {
		priceProduct: {
			type: DataTypes.DECIMAL,
			allowNull: false,
		},
		quantity: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});
};
