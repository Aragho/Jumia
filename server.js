import pkg from "pg";
import sequelize from "./db.js";

const { Pool } = pkg;

const startServer = async (app) => {
  try {
    await sequelize.sync({ alter: true });
    console.log("All models were synchronized successfully.");

    app.listen(4500, () => {
      console.log("Server is running on http://localhost:4500");
    });

    const pool = new Pool({
      user: "postgres",
      host: "localhost",
      database: "Jumia",
      password: "password",
      port: 5432,
    });

    pool
      .connect()
      .then(() => console.log("Connected to PostgreSQL database"))
      .catch((err) => console.error("Database connection error", err));
  } catch (error) {
    console.error("Error during server initialization:", error);
  }
};

export default startServer;
