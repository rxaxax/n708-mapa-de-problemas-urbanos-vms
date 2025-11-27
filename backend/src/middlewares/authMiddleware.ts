import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não enviado" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.id,   // 🔥 ESTE É O ID QUE VAMOS SALVAR NO PROBLEMA
      email: decoded.email
    };

    next();
  } catch (error) {
    console.error("Erro auth:", error);
    res.status(401).json({ error: "Token inválido" });
  }
}
