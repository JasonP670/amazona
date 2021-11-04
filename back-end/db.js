const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "postgres://jason:password@localhost:5432/amazona"
);

const check = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established");
  } catch (e) {
    console.error("Unable to connect to the database", e);
  }
};

check();
