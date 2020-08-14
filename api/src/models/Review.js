const { DataTypes } = require("sequelize");

module.exports = sequelize => {
	// defino el modelo
	sequelize.define("review", {
        stars :{
            type: DataTypes.INTEGER,
            allowNull:false
        },
        description:{
            type: DataTypes.TEXT,
            allowNull:false
        },
        date:{
            type: DataTypes.DATE,
            allowNull:false
        }
	});
};