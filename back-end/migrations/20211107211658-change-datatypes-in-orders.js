module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Orders", "items_price", {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      }),
      queryInterface.changeColumn("Orders", "shipping_price", {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      }),
      queryInterface.changeColumn("Orders", "total_price", {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      }),
      queryInterface.changeColumn("Orders", "tax_price", {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("Orders", "items_price", {
        type: Sequelize.INTEGER(10, 2),
        allowNull: true,
      }),
      queryInterface.changeColumn("Orders", "shipping_price", {
        type: Sequelize.INTEGER(10, 2),
        allowNull: true,
      }),
      queryInterface.changeColumn("Orders", "total_price", {
        type: Sequelize.INTEGER(10, 2),
        allowNull: true,
      }),
      queryInterface.changeColumn("Orders", "tax_price", {
        type: Sequelize.INTEGER(10, 2),
        allowNull: true,
      }),
    ]);
  },
};
