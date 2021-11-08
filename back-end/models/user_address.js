"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User_address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_address.belongsTo(models.User, {
        foreignKey: "UserId",
      });
    }
  }
  User_address.init(
    {
      UserId: { type: DataTypes.INTEGER, allowNull: false },
      full_name: { type: DataTypes.STRING, allowNull: false },
      address_line1: { type: DataTypes.STRING, allowNull: false },
      address_line2: { type: DataTypes.STRING },
      city: { type: DataTypes.STRING, allowNull: false },
      postal_code: { type: DataTypes.STRING, allowNull: false },
      country: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User_address",
    }
  );
  return User_address;
};
