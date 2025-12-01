"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "../context/authContext";

export type ProblemCardProps = {
  id: string;
  title: string;
  description?: string;
  address: string;
  category?: string;
  reportedBy?: string;
  image?: string;
  status?: string;
  anonymous?: boolean;
  createdAt?: string;
  selected?: boolean;
  isOwner?: boolean;
  onClick?: () => void;
  onDelete?: (id: string) => void;
};

export default function ProblemCard({
  id,
  title,
  description,
  address,
  category,
  reportedBy,
  image,
  status = "pendente",
  anonymous = false,
  createdAt,
  selected = false,
  isOwner = false,
  onClick,
  onDelete,
}: ProblemCardProps) {
  const router = useRouter();
  const { user } = useAuth();

  const badgeClass =
    status === "pendente"
      ? "bg-warning text-dark"
      : status === "em_andamento"
      ? "bg-primary"
      : status === "resolvido"
      ? "bg-success"
      : "bg-secondary";

  const finalImage =
    image && image !== ""
      ? image
      : "https://placehold.co/300x160?text=Sem+Imagem";

  const reporter = anonymous ? "Anônimo" : reportedBy || "Usuário desconhecido";

  const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("pt-BR")
    : null;

  const statusLabel: Record<string, string> = {
    pendente: "Pendente",
    em_andamento: "Em andamento",
    resolvido: "Finalizado",
  };

  return (
    <div
      className={`card shadow-sm rounded-3 overflow-hidden border ${
        selected ? "border-primary border-3" : "border-dark border-opacity-25"
      }`}
      onClick={onClick}
      style={{
        cursor: "pointer",
        transition: "0.2s",
      }}
    >
      {/* IMAGEM */}
      <img
        src={finalImage}
        className="w-100"
        style={{
          height: "150px",
          objectFit: "cover",
        }}
      />

      <div className="card-body">
        {/* ENDEREÇO */}
        <p className="small mb-1 text-truncate">{address}</p>

        {/* TÍTULO */}
        <h6 className="fw-bold mb-1 text-truncate">{title}</h6>

        {/* DESCRIÇÃO */}
        {description && (
          <p className="small mb-1 text-truncate" style={{ maxWidth: "100%" }}>
            <strong>Descrição: </strong>
            {description}
          </p>
        )}

        {/* CATEGORIA */}
        {category && (
          <p className="small mb-1">
            <strong>Categoria:</strong> {category}
          </p>
        )}

        {/* DATA */}
        {formattedDate && (
          <p className="small mb-1">
            <strong>Reportado em:</strong> {formattedDate}
          </p>
        )}

        {/* REPORTADO POR */}
        <p className="small mb-2">
          <strong>Reportado por:</strong> {reporter}
        </p>

        {/* STATUS */}
        <span className={`badge ${badgeClass}`}>
          {statusLabel[status] || status}
        </span>

        {/* BOTÕES (RESPONSIVOS) */}
        {(isOwner || user?.role === "admin") && (
          <div className="mt-3 d-flex flex-column flex-sm-row gap-2">
            <button
              className="btn btn-sm btn-primary w-100"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/editar/${id}`);
              }}
            >
              Editar
            </button>

            <button
              className="btn btn-sm btn-danger w-100"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(id);
              }}
            >
              Excluir
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
