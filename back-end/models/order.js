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
      // Order.belongsTo(models.User, { foreignKey: "id" });
      Order.belongsToMany(models.Product, {
        through: "ProductOrder",
        foreignKey: "order_id",
      });
      Order.belongsTo(models.User);
      Order.belongsTo(models.User_address, {
        targetKey: "id",
        foreignKey: "address_id",
      });
    }
  }
  Order.init(
    {
      UserId: DataTypes.INTEGER,
      address_id: {
        type: DataTypes.INTEGER,
      },
      items_price: DataTypes.DECIMAL(10, 2),
      shipping_price: DataTypes.DECIMAL(10, 2),
      tax_price: DataTypes.DECIMAL(10, 2),
      total_price: DataTypes.DECIMAL(10, 2),
      payment_method: DataTypes.STRING,
      payment_id: DataTypes.STRING,
      status: DataTypes.STRING,
      update_time: DataTypes.STRING,
      email_address: DataTypes.STRING,
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
