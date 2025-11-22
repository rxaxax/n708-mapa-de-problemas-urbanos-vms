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
