import jwt from "jsonwebtoken";

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token não enviado" });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({ error: "Formato de token inválido" });
    }

    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET não definido no ambiente!");
      return res.status(500).json({ error: "Erro interno de autenticação" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Conteúdo padrão armazenado no req.user
    req.user = {
      id: decoded.id,
      email: decoded.email,
      name: decoded.name,  // se for útil no futuro
      role: decoded.role,  // se você expandir o sistema
      iat: decoded.iat,
      exp: decoded.exp,
    };

    return next();
  } catch (error) {
    console.error("Erro auth:", error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expirado" });
    }

    return res.status(401).json({ error: "Token inválido" });
  }
}
