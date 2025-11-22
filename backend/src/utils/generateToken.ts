import jwt from "jsonwebtoken";

export function generateToken(id: string) {
  return jwt.sign({ id }, process.env.JWT_SECRET || "secret", {
    expiresIn: "7d",
  });
}
