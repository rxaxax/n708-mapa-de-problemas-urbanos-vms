"use client";

import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { loginUser } from "../../services/authService";
import { useRouter } from "next/navigation";
import React from "react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await loginUser({ email, password });

      // Chama o hook useAuth para salvar o token no localStorage
      login(response.token);

      router.push("/dashboard");
    } catch (err: any) {
      console.log(err);
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <h2 className="text-center mb-4">Login</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Senha</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary w-100">Entrar</button>

        <p className="text-center mt-3">
          Não tem conta? <a href="/register">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
}
