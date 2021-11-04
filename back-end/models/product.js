"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false, unique: true },
      image: { type: DataTypes.STRING, allowNull: false },
      brand: { type: DataTypes.STRING, allowNull: false },
      category: { type: DataTypes.STRING, allowNull: false },
      price: { type: DataTypes.INTEGER, allowNull: false },
      countInStock: { type: DataTypes.INTEGER, allowNull: false },
      rating: { type: DataTypes.INTEGER, allowNull: false },
      numReviews: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      timestamps: true,
      modelName: "Product",
    }
  );
  return Product;
};
