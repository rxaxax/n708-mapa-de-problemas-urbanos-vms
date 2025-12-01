"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

export default function Navbar() {
  const { isLogged, loading, logout } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid px-3">
          <span className="navbar-brand fw-bold">Mapa Urbano</span>
        </div>
      </nav>
    );
  }

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid px-3">
        <Link className="navbar-brand fw-bold" href="/">
          Mapa Urbano
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navbarContent" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            {!isLogged && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/login">
                    Entrar
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" href="/register">
                    Cadastrar
                  </Link>
                </li>
              </>
            )}

            {isLogged && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" href="/reportar_problema">
                    Reportar Problema
                  </Link>
                </li>

                {/* Botão sair: agora responsivo */}
                <li className="nav-item d-flex align-items-center">
                  <button
                    className="btn btn-light btn-sm w-100 mt-2 mt-lg-0"
                    onClick={handleLogout}
                  >
                    Sair
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
