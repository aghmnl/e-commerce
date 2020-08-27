const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	// defino el modelo
	sequelize.define("user", {
		first_name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		email: {
			type: DataTypes.TEXT,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		salt: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		admin: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
		},
	});
};
