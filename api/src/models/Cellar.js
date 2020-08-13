const {DataTypes} = require("sequelize");
module.exports = (sequalize) =>{
    sequalize.define("cellar", {
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    });
}