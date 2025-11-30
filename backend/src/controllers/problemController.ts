import {
  createProblemService,
  getProblemsService,
  getProblemByIdService,
  getMyProblemsService,
  updateProblemService,
  deleteProblemService,
} from "../services/problemService";

import dotenv from "dotenv";

dotenv.config();

// 🔥 BASE_URL dinâmica
const BASE_URL =
  `http://localhost:${process.env.PORT}` || "http://localhost:3001";

// Categorias permitidas (mantém sincronizado com o model)
const CATEGORIES = [
  "Iluminação",
  "Pavimentação",
  "Segurança",
  "Lixo",
  "Esgoto",
  "Outros",
];

// Função auxiliar → transforma nomes em URLs completas
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

    // 🔥 Validação básica
    if (!title || !address || !lat || !lng) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos." });
    }

    // 🔥 Valida categoria
    if (category && !CATEGORIES.includes(category)) {
      return res.status(400).json({ error: "Categoria inválida." });
    }

    // 🔥 Processa imagens do Multer
    let processedImages = [];

    if (req.files && Array.isArray(req.files)) {
      processedImages = req.files.map((file) => file.filename);
    } else if (req.file) {
      processedImages = [req.file.filename];
    }

    // 🔥 Cria o problema
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

    // 🔥 Remove informações sensíveis, mas mantém o ID
    let result = newProblem.toObject();

    if (anonymous && result.userId) {
      result.userId = { name: "Anônimo" };
    }

    // 🔥 Adiciona URLs completas
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

    const formatted = problems.map((p) => formatImageUrls(p)); // sem .toObject()

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

    return res.json(formatImageUrls(problem)); // <- sem toObject()
  } catch (error) {
    console.error("Erro ao buscar problema:", error);
    return res.status(500).json({ error: "Erro ao buscar problema." });
  }
}

export async function getMyProblems(req, res) {
  try {
    const userId = req.user.id;

    const problems = await getMyProblemsService(userId);

    const formatted = problems.map((p) => formatImageUrls(p)); // <- sem toObject()

    return res.json(formatted);
  } catch (error) {
    console.error("Erro ao buscar meus problemas:", error);
    return res.status(500).json({
      error: "Erro ao buscar problemas do usuário.",
    });
  }
}

/* export const updateProblem = async (req, res) => {
  try {
    const updated = await updateProblemService(req.params.id, req.body);
    return res.json(updated);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro ao atualizar problema." });
  }
}; */

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

    // 1. RECEBER IMAGENS EXISTENTES
    let existingImages = req.body.existingImages || [];

    // multer envia como string única caso só tenha 1
    if (typeof existingImages === "string") {
      existingImages = [existingImages];
    }

    // 2. RECEBER NOVAS IMAGENS (files)
    let newImages = [];
    if (req.files && Array.isArray(req.files)) {
      newImages = req.files.map((f) => f.filename);
    }

    // 3. EVITAR DUPLICAÇÃO REALMENTE
    // remove duplicações usadas no frontend
    const finalImages = Array.from(new Set([...existingImages, ...newImages]));

    // 4. LIMITAR A 5 IMAGENS
    if (finalImages.length > 5) {
      return res.status(400).json({ error: "Máximo de 5 imagens permitidas." });
    }
    // 5. ATUALIZAR REGISTRO
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
