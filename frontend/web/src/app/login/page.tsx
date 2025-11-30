"use client";

import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../../context/authContext";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: any) {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser({ email, password });

      // Agora salva user + token no contexto global
      login({
        token: response.token,
        user: response.user,
      });

      router.push("/"); // vai pra homepage
    } catch (err) {
      console.error(err);
      setError("Credenciais inválidas");
    }
  }

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: "450px", width: "100%" }}>
        <h2 className="text-center mb-4">Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label>Senha</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100">Entrar</button>

          <p className="text-center mt-3">
            Não tem conta? <a href="/register">Cadastre-se</a>
          </p>
        </form>
      </div>
    </div>
  );
}
