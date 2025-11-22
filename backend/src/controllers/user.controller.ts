import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user.model";
import { generateToken } from "../utils/generateToken";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "E-mail já cadastrado" });

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hash,
    });

    res.status(201).json({
      message: "Usuário registrado",
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Credenciais inválidas" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Credenciais inválidas" });

    res.json({
      message: "Login realizado",
      token: generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ error: "Erro ao fazer login" });
  }
}
