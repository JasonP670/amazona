"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Orders", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      address_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "User_addresses",
          key: "id",
        },
      },
      items_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      shipping_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      tax_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      total_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      is_paid: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      paid_at: {
        type: Sequelize.DATE,
      },
      is_delivered: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      delivered_at: {
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Orders");
  },
};
