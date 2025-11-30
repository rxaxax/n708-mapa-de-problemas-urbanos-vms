import Problem from "../models/problemModel";

export default async function checkProblemOwner(req, res, next) {
  try {
    const { id } = req.params;
    const userId = req.user.id; // veio do middleware de auth

    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({ message: "Problema não encontrado." });
    }

    // 🔥 Se o problema não pertence ao usuário autenticado
    if (String(problem.userId) !== String(userId)) {
      return res.status(403).json({ message: "Acesso negado." });
    }

    // Tudo ok → segue para a próxima etapa
    req.problem = problem;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro no servidor." });
  }
}
