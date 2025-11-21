// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
//       <Link className="navbar-brand fw-bold" href="/">
//         Mapa de Problemas Urbanos
//       </Link>

//       <button
//         className="navbar-toggler"
//         type="button"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
//         <ul className="navbar-nav ms-auto">
//           <li className="nav-item">
//             <Link className="nav-link" href="/">
//               Início
//             </Link>
//           </li>

//           <li className="nav-item">
//             <Link className="nav-link" href="/problemas">
//               Problemas Reportados
//             </Link>
//           </li>

//           <li className="nav-item">
//             <Link className="btn btn-primary ms-lg-3" href="/reportar">
//               Reportar Problema
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// }

"use client";

import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
      <Link href="/" className="navbar-brand fw-bold">
        Mapa Urbano
      </Link>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navContent">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" href="/">
              Início
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/reportar">
              Reportar Problema
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
