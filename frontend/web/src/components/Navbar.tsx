"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLogged(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogged(false);
    window.location.href = "/login"; // redireciona
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link className="navbar-brand fw-bold" href="/">
        Mapa Urbano
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div id="navbarContent" className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">

          {/* --- Se NÃO estiver logado --- */}
          {!isLogged && (
            <>
              <li className="nav-item">
                <Link className="nav-link" href="/login">Entrar</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" href="/register">Cadastrar</Link>
              </li>
            </>
          )}

          {/* --- Se estiver logado --- */}
          {isLogged && (
            <>
              <li className="nav-item">
                <Link className="nav-link" href="/reportar_problema">
                  Reportar Problema
                </Link>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-light btn-sm ms-2"
                  onClick={handleLogout}
                >
                  Sair
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
