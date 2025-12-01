import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import problemRoutes from "./routes/problemRoutes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

// ROTAS
app.use("/users", userRoutes);
app.use("/problems", problemRoutes);

// CONEXAO COM MONGODB
mongoose
  .connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.log("Erro no MongoDB:", err));

export default app;
