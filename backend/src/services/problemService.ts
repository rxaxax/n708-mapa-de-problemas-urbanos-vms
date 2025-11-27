import Problem from "../models/Problem.js";

export async function createProblemService(data) {
  const problem = await Problem.create(data);
  return problem;
}

export async function getProblemsService() {
  return await Problem.find().sort({ createdAt: -1 });
}

export async function getProblemByIdService(id) {
  return await Problem.findById(id);
}
