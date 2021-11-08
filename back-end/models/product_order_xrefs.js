"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product_order_xrefs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_order_xrefs.belongsTo(models.Product, { foreignKey: "id" });
      // Product_order_xrefs.belongsTo(models.Order, { foreignKey: "id" });
    }
  }
  Product_order_xrefs.init(
    {
      product_id: DataTypes.UUID,
      order_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_order_xrefs",
    }
  );
  return Product_order_xrefs;
};
