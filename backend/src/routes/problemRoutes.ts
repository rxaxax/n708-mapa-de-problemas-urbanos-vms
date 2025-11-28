import { Router } from "express";
import {
  createProblem,
  getProblems,
  getProblemById,
  getMyProblems,
} from "../controllers/problemController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

// 🔓 Rotas públicas
router.get("/", getProblems);
router.get("/:id", getProblemById);

// 🔐 Rotas protegidas
router.use(authMiddleware);

router.get("/me", getMyProblems);
router.post("/", createProblem);

export default router;
