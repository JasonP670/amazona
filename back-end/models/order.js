"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: "id" });
      Order.belongsToMany(models.Product, {
        through: "Product_order_xrefs",
        foreignKey: "order_id",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.INTEGER,
      address_id: DataTypes.INTEGER,
      items_price: DataTypes.INTEGER,
      shipping_price: DataTypes.INTEGER,
      tax_price: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
      is_paid: DataTypes.BOOLEAN,
      paid_at: DataTypes.DATE,
      is_delivered: DataTypes.BOOLEAN,
      delivered_at: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
