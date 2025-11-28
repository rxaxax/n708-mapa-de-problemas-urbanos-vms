import {
  createProblemService,
  getProblemsService,
  getProblemByIdService,
  getMyProblemsService
} from "../services/problemService.js";

// Categorias permitidas (mantém sincronizado com o model)
const CATEGORIES = ["Iluminação", "Pavimentação", "Segurança", "Lixo", "Esgoto", "Outros"];

export async function createProblem(req, res) {
  try {
    const {
      title,
      description,
      category,
      anonymous,
      address,
      lat,
      lng,
      images,
    } = req.body;

    // 🔥 Validação básica
    if (!title || !description || !address || !lat || !lng) {
      return res.status(400).json({ error: "Campos obrigatórios não preenchidos." });
    }

    // 🔥 Valida categoria
    if (category && !CATEGORIES.includes(category)) {
      return res.status(400).json({ error: "Categoria inválida." });
    }

    // 🔥 Prepara imagens (caso use upload)
    const processedImages =
      req.files?.map((file) => file.filename) || images || [];

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

    // 🔥 Remove userId ao retornar (anonimização)
    const result = newProblem.toObject();
    if (anonymous) {
      delete result.userId;
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error("Erro ao criar problema:", error);
    return res.status(500).json({ error: "Erro no servidor." });
  }
}

export async function getProblems(req, res) {
  try {
    const problems = await getProblemsService();

    return res.json(problems);
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

    return res.json(problem);
  } catch (error) {
    console.error("Erro ao buscar problema:", error);
    return res.status(500).json({ error: "Erro ao buscar problema." });
  }

  
}

export async function getMyProblems(req, res) {
  try {
    const userId = req.user.id;

    const problems = await getMyProblemsService(userId);

    return res.json(problems);
  } catch (error) {
    console.error("Erro ao buscar meus problemas:", error);
    return res.status(500).json({ error: "Erro ao buscar problemas do usuário." });
  }
}
