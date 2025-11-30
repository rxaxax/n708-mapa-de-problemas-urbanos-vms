/* import { Router } from "express";
import { upload } from "../config/multerConfig";
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



const router = Router();

// Rotas públicas
router.get("/", getProblems);
router.get("/:id", getProblemById);

// Protegidas
router.use(authMiddleware);

// Upload de imagem + criação do problema + edição e deleção do problema
router.post("/", upload.array("images", 5), createProblem);
router.get("/me", getMyProblems);
router.put("/:id", checkProblemOwner, updateProblem);
router.delete("/:id", checkProblemOwner, deleteProblem);

export default router;
 */

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

import { upload } from "../config/multerConfig"; // 👈 usa o seu config

const router = Router();

// Criar problema
router.post(
  "/",
  authMiddleware,
  upload.array("images"), // 👈 POST funciona
  createProblem
);

// Listar todos
router.get("/", getProblems);

// Buscar por ID
router.get("/:id", getProblemById);

// Meus problemas
router.get("/me/all", authMiddleware, getMyProblems);

// 🔥 Atualizar problema
router.put(
  "/:id",
  authMiddleware,
  checkProblemOwner,
  upload.array("images", 5), // 👈 importante! deve ser "images"
  updateProblem
);

// 🔥 Excluir problema
router.delete("/:id", authMiddleware, checkProblemOwner, deleteProblem);

export default router;
