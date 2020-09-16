const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("image", {
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}