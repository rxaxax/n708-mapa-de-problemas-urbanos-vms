import { Request, Response } from "express";
import User from "../models/userModel";
import { generateToken } from "../utils/generateToken";

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "E-mail já cadastrado" });

    // ❗ NÃO HASHAR AQUI — o model já faz isso automaticamente
    const user = await User.create({ name, email, password });

    res.status(201).json({
      message: "Usuário registrado",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user.id, user.email),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao registrar usuário" });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    // ⬇ NECESSÁRIO POR CAUSA DO select:false
    const user = await User.findOne({ email }).select("+password");

    if (!user)
      return res.status(400).json({ error: "Credenciais inválidas" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ error: "Credenciais inválidas" });

    res.json({
      message: "Login realizado com sucesso",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: generateToken(user.id, user.email),
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
}
