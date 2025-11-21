// "use client";

// export default function ProblemCard({ title, description, category }) {
//   return (
//     <div className="card shadow-sm mb-3">
//       <div className="card-body">
//         <h5 className="card-title fw-bold">{title}</h5>
//         <span className="badge bg-primary mb-2">{category}</span>
//         <p className="card-text text-muted">{description}</p>
//         <button className="btn btn-outline-primary btn-sm">
//           Ver no mapa
//         </button>
//       </div>
//     </div>
//   );
// }

"use client";

import React from "react";

export type Problem = {
  title: string;
  address: string;
  image: string;
  status: "Pendente" | "Em andamento" | "Resolvido";
};

export default function ProblemCard({
  title,
  address,
  image,
  status,
}: Problem) {
  const badgeClass =
    status === "Pendente"
      ? "bg-warning text-dark"
      : status === "Em andamento"
      ? "bg-primary"
      : "bg-success";

  return (
    <div className="col-12 col-sm-6 col-lg-4">
      <div className="card problem-card shadow-sm border-0 rounded-3 overflow-hidden">
        <img
          src={image}
          className="problem-image w-100"
          style={{ height: "160px", objectFit: "cover" }}
        />
        <div className="card-body">
          <h6 className="fw-bold">{title}</h6>
          <p className="text-muted small">{address}</p>
          <span className={`badge ${badgeClass}`}>{status}</span>
        </div>
      </div>
    </div>
  );
}
