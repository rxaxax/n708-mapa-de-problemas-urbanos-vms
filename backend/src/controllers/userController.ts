import { Request, Response } from "express";
import User from "../models/userModel";
import { generateToken } from "../utils/generateToken";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "E-mail já cadastrado" });

    const user = await User.create({ name, email, password, role: "user" });

    res.status(201).json({
      message: "Usuário registrado",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) return res.status(400).json({ error: "Credenciais inválidas" });

    const isMatch = await (user as any).comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ error: "Credenciais inválidas" });

    res.json({
      message: "Login realizado com sucesso",
      user: {
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token: generateToken({
        id: user.id,
        email: user.email,
        role: user.role,
      }),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
}

export async function updateUserRole(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ error: "Role inválido" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    return res.json({
      message: "Role atualizado com sucesso",
      user: {
        _id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao atualizar role" });
  }
}
