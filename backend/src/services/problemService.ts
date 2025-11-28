import mongoose from "mongoose";
import Problem from "../models/problemModel.js";

// Criar problema
export async function createProblemService(data) {
  return await Problem.create(data);
}

// Buscar todos os problemas (opcional: filtrar por usuário)
export async function getProblemsService(userId = null) {
  const filter = userId ? { userId } : {};

  return await Problem.find(filter)
    .sort({ createdAt: -1 })
    .populate("userId", "name email"); // sem password
}

// Buscar problema por ID
export async function getProblemByIdService(id) {
  // Validação do ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null; // controller retorna 404
  }

  return await Problem.findById(id).populate("userId", "name email");
}

export async function getMyProblemsService(userId: string) {
  return await Problem.find({ userId }).sort({ createdAt: -1 });
}
