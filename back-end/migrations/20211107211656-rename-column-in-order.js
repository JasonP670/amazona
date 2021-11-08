module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        // queryInterface.removeColumn("Orders", "user_id", { transaction: t }),
        queryInterface.addColumn(
          "Orders",
          "UserId",
          {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "Users",
              key: "id",
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "Orders",
          "user_id",
          {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: {
              model: "Users",
              key: "id",
            },
          },
          { transaction: t }
        ),
        queryInterface.removeColumn("Orders", "userId", { transaction: t }),
      ]);
    });
  },
};
