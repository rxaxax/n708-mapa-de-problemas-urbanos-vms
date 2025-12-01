"use client";

import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

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
    <div className="container d-flex justify-content-center align-items-center py-5">
      <div
        className="card shadow p-4 mx-3"
        style={{ maxWidth: "450px", width: "100%" }}
      >
        <h2 className="text-center mb-4">Login</h2>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label mb-1">Email</label>
            <input
              type="email"
              inputMode="email"
              autoComplete="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Senha */}
          <div className="mb-3">
            <label className="form-label mb-1">Senha</label>
            <input
              type="password"
              autoComplete="current-password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100 mt-2">Entrar</button>

          <p className="text-center mt-3">
            Não tem conta? <Link href="/register">Cadastre-se</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
