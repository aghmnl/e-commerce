const {DataTypes} = require("sequelize");
module.exports = (sequalize) =>{
    sequalize.define("strain", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
}