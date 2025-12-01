import {
  createProblemService,
  getProblemsService,
  getProblemByIdService,
  getMyProblemsService,
  updateProblemService,
  deleteProblemService,
} from "../services/problemService";

import dotenv from "dotenv";
import { sanitizeProblemForResponse } from "../utils/sanitizeProblem";

dotenv.config();

const BASE_URL =
  `http://localhost:${process.env.PORT}` || "http://localhost:3001";

const CATEGORIES = [
  "Iluminação",
  "Pavimentação",
  "Segurança",
  "Lixo",
  "Esgoto",
  "Outros",
];

// TRANSFORMA NOMES EM URLS COMPLETAS
function formatImageUrls(problem) {
  return {
    ...problem,
    images: problem.images?.map((file) => `${BASE_URL}/uploads/${file}`) ?? [],
  };
}

export async function createProblem(req, res) {
  try {
    const { title, description, category, anonymous, address, lat, lng } =
      req.body;

    if (!title || !address || !lat || !lng) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos." });
    }

    // VALIDA CATEGORIA
    if (category && !CATEGORIES.includes(category)) {
      return res.status(400).json({ error: "Categoria inválida." });
    }

    // PROCESSA IMAGENS DO MULTER
    let processedImages = [];

    if (req.files && Array.isArray(req.files)) {
      processedImages = req.files.map((file) => file.filename);
    } else if (req.file) {
      processedImages = [req.file.filename];
    }

    // CRIA O PROBLEM
    const newProblem = await createProblemService({
      title,
      description,
      category,
      anonymous: anonymous ?? false,
      address,
      lat,
      lng,
      images: processedImages,
      userId: req.user.id,
    });

    // Remove informações sensíveis, mas mantém o ID
    let result = newProblem.toObject();

    if (anonymous && result.userId) {
      result.userId = { name: "Anônimo" };
    }

    // Adiciona URLs completas
    result = formatImageUrls(result);

    return res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao criar problema:", error);
    return res.status(500).json({ error: "Erro no servidor." });
  }
}

export async function getProblems(req, res) {
  try {
    const problems = await getProblemsService();

    const formatted = problems.map((p) =>
      formatImageUrls(sanitizeProblemForResponse(p))
    );

    return res.json(formatted);
  } catch (error) {
    console.error("Erro ao buscar problemas:", error);
    return res.status(500).json({ error: "Erro ao buscar problemas." });
  }
}

export async function getProblemById(req, res) {
  try {
    const problem = await getProblemByIdService(req.params.id);

    if (!problem) {
      return res.status(404).json({ error: "Problema não encontrado." });
    }

    const sanitized = sanitizeProblemForResponse(problem);
    return res.json(formatImageUrls(sanitized));
  } catch (error) {
    console.error("Erro ao buscar problema:", error);
    return res.status(500).json({ error: "Erro ao buscar problema." });
  }
}

export async function getMyProblems(req, res) {
  try {
    const userId = req.user.id;

    const problems = await getMyProblemsService(userId);

    const formatted = problems.map((p) => formatImageUrls(p));

    return res.json(formatted);
  } catch (error) {
    console.error("Erro ao buscar meus problemas:", error);
    return res.status(500).json({
      error: "Erro ao buscar problemas do usuário.",
    });
  }
}

export const updateProblem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      address,
      lat,
      lng,
      status,
      anonymous,
    } = req.body;

    // RECEBE IMAGENS EXISTENTES
    let existingImages = req.body.existingImages || [];

    if (typeof existingImages === "string") {
      existingImages = [existingImages];
    }

    // RECEBE NOVAS IMAGENS
    let newImages = [];
    if (req.files && Array.isArray(req.files)) {
      newImages = req.files.map((f) => f.filename);
    }

    // EVITAR DUPLICAÇÃO DE ARQUIVOS
    const finalImages = Array.from(new Set([...existingImages, ...newImages]));

    // LIMITAR A 5 IMAGENS
    if (finalImages.length > 5) {
      return res.status(400).json({ error: "Máximo de 5 imagens permitidas." });
    }
    // ATUALIZAR REGISTRO
    const updated = await updateProblemService(req.params.id, {
      title,
      description,
      category,
      address,
      lat,
      lng,
      status,
      anonymous,
      images: finalImages,
    });

    return res.json(updated);
  } catch (err) {
    console.error("Erro no update:", err);
    return res.status(500).json({ message: "Erro ao atualizar problema." });
  }
};

export const deleteProblem = async (req, res) => {
  try {
    await deleteProblemService(req.params.id);
    return res.json({ message: "Problema excluído com sucesso." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao excluir problema." });
  }
};
