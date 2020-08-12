const {DataTypes} = require("sequelize");
module.exports = (sequalize) =>{
    sequalize.define("category", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });
}