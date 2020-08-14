const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	// defino el modelo
	sequelize.define("pay_method", {
        name :{
            type: DataTypes.TEXT,
            allowNull:false
        }
	});
};