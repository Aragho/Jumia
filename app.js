import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import startServer from "./server.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/user", userRoutes);

startServer(app);