import { Router } from "express";
import {
  createProblem,
  getProblems,
  getProblemById,
  getMyProblems,
  updateProblem,
  deleteProblem,
} from "../controllers/problemController";
import { authMiddleware } from "../middlewares/authMiddleware";
import checkProblemOwner from "../middlewares/checkProblemOwner";
import { upload } from "../config/multerConfig";

const router = Router();

// CRIAR PROBLEM
router.post("/", authMiddleware, upload.array("images"), createProblem);

// LISTAR PROBLEMS
router.get("/", getProblems);

// BUSCAR POR ID
router.get("/:id", getProblemById);

// MEUS PROBLEMS
router.get("/me/all", authMiddleware, getMyProblems);

// ATUALIZA PROBLEM
router.put(
  "/:id",
  authMiddleware,
  checkProblemOwner,
  upload.array("images", 5),
  updateProblem
);

// EXCLUIR PROBLEM
router.delete("/:id", authMiddleware, checkProblemOwner, deleteProblem);

export default router;
