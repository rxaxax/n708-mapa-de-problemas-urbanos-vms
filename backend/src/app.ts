// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { connectDatabase } from "./config/database";
// import authRoutes from "./routes/auth.routes";
// import reportRoutes from "./routes/report.routes";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDatabase();

// app.get("/", (_, res) => res.json({ message: "API do Mapa de Problemas Urbanos está funcionando!" }));

// app.use("/auth", authRoutes);
// app.use("/reports", reportRoutes);

// export default app;

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import reportRoutes from "./routes/report.routes";
import userRoutes from "./routes/user.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);

// Conexão com MongoDB
mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.log("Erro no MongoDB:", err));

export default app;
