const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	// defino el modelo
	sequelize.define("purchase", {
        date:{
            type: DataTypes.DATE,
            allowNull:false
        }
        
	});
};