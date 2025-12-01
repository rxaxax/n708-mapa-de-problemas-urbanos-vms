import Problem from "../models/problemModel";

export default async function checkProblemOwner(req, res, next) {
  try {
    const { id } = req.params;

    const { id: userId, role } = req.user;

    const problem = await Problem.findById(id);

    if (!problem) {
      return res.status(404).json({ message: "Problema não encontrado." });
    }

    if (role === "admin") {
      req.problem = problem;
      return next();
    }

    if (String(problem.userId) !== String(userId)) {
      return res.status(403).json({ message: "Acesso negado." });
    }

    req.problem = problem;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Erro no servidor." });
  }
}
