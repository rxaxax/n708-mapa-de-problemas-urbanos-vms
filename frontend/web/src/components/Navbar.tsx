// "use client";

// import Link from "next/link";
// import React from "react";

// export default function Navbar() {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
//       <Link href="/" className="navbar-brand fw-bold">
//         Mapa Urbano
//       </Link>

//       <button
//         className="navbar-toggler"
//         type="button"
//         data-bs-toggle="collapse"
//         data-bs-target="#navContent"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="navContent">
//         <ul className="navbar-nav ms-auto align-items-center gap-2">

//           <li className="nav-item">
//             <Link className="nav-link" href="/">
//               Início
//             </Link>
//           </li>

//           <li className="nav-item">
//             <Link className="nav-link" href="/reportar">
//               Reportar Problema
//             </Link>
//           </li>

//           {/* BOTÕES DE AUTENTICAÇÃO */}
//           <li className="nav-item">
//             <Link href="/login" className="btn btn-light btn-sm ms-3">
//               Entrar
//             </Link>
//           </li>

//           <li className="nav-item">
//             <Link href="/register" className="btn btn-warning btn-sm ms-2 fw-semibold">
//               Cadastrar
//             </Link>
//           </li>

//         </ul>
//       </div>
//     </nav>
//   );
// }

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
                <Link className="nav-link" href="/reportar">
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
