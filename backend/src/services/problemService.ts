import mongoose from "mongoose";
import Problem from "../models/problemModel";

// CRIAR PROBLEM
export async function createProblemService(data) {
  return await Problem.create(data);
}

// BUSCAR TODOS OS PROBLEMS
export async function getProblemsService(userId = null) {
  const filter = userId ? { userId } : {};

  return await Problem.find(filter)
    .sort({ createdAt: -1 })
    .populate("userId", "name email role") 
    .lean();
}

// BUSCAR PROBLEM POR ID
export async function getProblemByIdService(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;

  return await Problem.findById(id).populate("userId", "name email").lean();
}

// BUSCAR PROBLEM DO USUARIO LOGADO
export async function getMyProblemsService(userId) {
  return await Problem.find({ userId })
    .sort({ createdAt: -1 })
    .populate("userId", "name email")
    .lean();
}

export async function updateProblemService(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Problem.findByIdAndUpdate(id, data, { new: true }).lean();
}

export async function deleteProblemService(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return null;
  return await Problem.findByIdAndDelete(id);
}
