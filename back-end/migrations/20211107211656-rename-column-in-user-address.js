module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn("User_addresses", "user_id", {
          transaction: t,
        }),
        queryInterface.addColumn(
          "User_addresses",
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
          "User_addresses",
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
        queryInterface.removeColumn("User_addresses", "userId", {
          transaction: t,
        }),
      ]);
    });
  },
};
