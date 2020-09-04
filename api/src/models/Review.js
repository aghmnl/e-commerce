const { DataTypes } = require("sequelize");
const moment = require("moment");

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
            allowNull:false,
            get: function () {
				return moment.utc(this.getDataValue("date")).format("DD/MM/YYYY");
			},
        }
	});
};