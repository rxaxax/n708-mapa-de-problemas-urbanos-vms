// "use client";
// import { createReport } from "@/services/reportService";
// import { useState } from "react";

// export default function Reportar() {
//   const [coords, setCoords] = useState({ lat: 0, lng: 0 });
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");

//   async function handleSubmit(e: any) {
//     e.preventDefault();

//     await createReport({
//       title,
//       description: desc,
//       location: coords,
//       category: "Outros",
//     });

//     alert("Problema registrado!");
//   }

//   return (
//     <form onSubmit={handleSubmit} className="p-4">
//       <h2>Reportar Problema</h2>

//       <input
//         className="form-control my-2"
//         placeholder="Título"
//         onChange={(e) => setTitle(e.target.value)}
//       />

//       <textarea
//         className="form-control my-2"
//         placeholder="Descrição"
//         onChange={(e) => setDesc(e.target.value)}
//       />

//       <button className="btn btn-success">Enviar</button>
//     </form>
//   );
// }

/* "use client";

import { useEffect, useState } from "react";
import ProblemForm from "../../components/ProblemForm";

export default function ReportarProblemaPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      window.location.href = "/login"; // 🔒 BLOQUEIA ACESSO
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="p-5 text-center">
        <h4>Carregando...</h4>
      </div>
    );
  }

  return (
    <>
      <div className="container py-4">
        <h2 className="fw-bold mb-4">Reportar Problema</h2>
        <ProblemForm />
      </div>
    </>
  );
}
 */

//import ProblemForm from "../../components/ProblemForm";

"use client";

import dynamic from "next/dynamic";

const ProblemForm = dynamic(() => import("../../components/ProblemForm"), {
  ssr: false,
});

export default function ReportarProblemaPage() {
  return (
    <div className="container my-4">
      <h2 className="mb-3">Reportar problema urbano</h2>
      <ProblemForm />
    </div>
  );
}
