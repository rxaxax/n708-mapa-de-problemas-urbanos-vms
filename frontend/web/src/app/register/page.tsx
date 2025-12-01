"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { register as registerService } from "../../services/AuthService";
import { useAuth } from "../../context/AuthContext";

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Validação local
  function validate() {
    const e: any = {};

    if (!form.name.trim()) e.name = "O nome é obrigatório.";

    if (!form.email.trim()) e.email = "O email é obrigatório.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Formato de email inválido.";

    if (!form.password) e.password = "A senha é obrigatória.";
    else if (form.password.length < 6)
      e.password = "A senha deve ter ao menos 6 caracteres.";

    if (!form.confirmPassword) e.confirmPassword = "Confirme sua senha.";
    else if (form.password !== form.confirmPassword)
      e.confirmPassword = "As senhas não coincidem.";

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  // Enviar formulário
  async function handleSubmit(e: any) {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setErrors({});
    setSuccessMsg("");

    try {
      const data = await registerService({
        name: form.name,
        email: form.email,
        password: form.password,
      });

      // login automático → salva no contexto e no localStorage
      login({
        token: data.token,
        user: data.user,
      });

      setSuccessMsg("Conta criada com sucesso!");

      setTimeout(() => {
        router.push("/");
      }, 800);
    } catch (err: any) {
      console.error(err);

      setErrors({
        api: err?.response?.data?.error || "Erro ao registrar usuário.",
      });
    }

    setLoading(false);
  }

  return (
  <div className="container d-flex justify-content-center align-items-center py-5">

    <div
      className="card shadow p-4 mx-3"
      style={{ maxWidth: "450px", width: "100%" }}
    >
      <h2 className="text-center mb-3">Criar Conta</h2>

      {errors.api && (
        <div className="alert alert-danger py-2">{errors.api}</div>
      )}

      {successMsg && (
        <div className="alert alert-success py-2">{successMsg}</div>
      )}

      <form onSubmit={handleSubmit} noValidate>

        {/* Nome */}
        <div className="mb-3">
          <label className="form-label mb-1">Nome</label>
          <input
            type="text"
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            name="name"
            placeholder="Seu nome"
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && (
            <div className="invalid-feedback">{errors.name}</div>
          )}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label mb-1">Email</label>
          <input
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="seuemail@exemplo.com"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            name="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        {/* Senha */}
        <div className="mb-3">
          <label className="form-label mb-1">Senha</label>
          <input
            type="password"
            autoComplete="new-password"
            className={`form-control ${errors.password ? "is-invalid" : ""}`}
            name="password"
            placeholder="Digite sua senha"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className="invalid-feedback">{errors.password}</div>
          )}
        </div>

        {/* Confirmar Senha */}
        <div className="mb-3">
          <label className="form-label mb-1">Confirmar senha</label>
          <input
            type="password"
            autoComplete="new-password"
            placeholder="Confirme sua senha"
            className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <div className="invalid-feedback">{errors.confirmPassword}</div>
          )}
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="btn btn-primary w-100 mt-3"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>

      <p className="text-center mt-3">
        Já tem conta? <Link href="/login">Entrar</Link>
      </p>
    </div>
  </div>
);

}
