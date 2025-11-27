import {
  createProblemService,
  getProblemsService,
  getProblemByIdService,
} from "../services/problemService.js";

export async function createProblem(req, res) {
  try {
    const { title, description, category, anonymous, address, lat, lng } =
      req.body;

    if (!title || !description || !category || !address || !lat || !lng) {
      return res
        .status(400)
        .json({ error: "Campos obrigatórios não preenchidos." });
    }

    const newProblem = await createProblemService({
      title,
      description,
      category,
      anonymous,
      address,
      lat,
      lng,
      userId: req.user.id,
    });

    return res.status(201).json(newProblem);
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
    return res.status(500).json({ error: "Erro ao buscar problemas." });
  }
}

export async function getProblemById(req, res) {
  try {
    const problem = await getProblemByIdService(req.params.id);
    if (!problem) return res.status(404).json({ error: "Problema não encontrado" });

    return res.json(problem);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar problema." });
  }
}
