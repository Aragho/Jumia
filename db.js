import { Sequelize } from "sequelize";

const sequelize = new Sequelize("Jumia", "postgres", "password", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;