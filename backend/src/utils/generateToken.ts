import jwt from "jsonwebtoken";

interface TokenPayload {
  id: string;
  email: string;
  role: string;
}

export function generateToken(payload: TokenPayload) {
  return jwt.sign(payload, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
  });
}
