import { Router } from "express";
import {
  createProblem,
  getProblems,
  getProblemById,
} from "../controllers/problemController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = Router();

// Criar problema
router.post("/", authMiddleware, createProblem);

// Listar todos
router.get("/", getProblems);

// Buscar por ID
router.get("/:id", getProblemById);

export default router;
