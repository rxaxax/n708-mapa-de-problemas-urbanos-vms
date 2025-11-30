"use client";

import { useRouter } from "next/navigation";

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

  return (
    <div
      className={`card shadow-sm rounded-3 overflow-hidden border ${
        selected ? "border-primary border-3" : "border-light"
      }`}
      onClick={onClick}
      style={{
        cursor: "pointer",
        transition: "0.2s",
        textDecoration: "none",
        height: "100%",
      }}
    >
      <img
        src={finalImage}
        className="w-100"
        style={{
          height: "160px",
          objectFit: "cover",
        }}
      />

      <div className="card-body">
        <p className="text-muted small mb-1">{address}</p>

        <h6 className="fw-bold mb-1">{title}</h6>

        {description && <p className="text-muted small mb-1">{description}</p>}

        {category && (
          <p className="small mb-1">
            <strong>Categoria:</strong> {category}
          </p>
        )}

        {formattedDate && (
          <p className="small mb-1">
            <strong>Reportado em:</strong> {formattedDate}
          </p>
        )}

        <p className="small mb-2">
          <strong>Reportado por:</strong> {reporter}
        </p>

        <span className={`badge ${badgeClass}`}>{status}</span>

        {/* 🔥 Botões só aparecem se for o dono */}
        {isOwner && (
          <div className="mt-3 d-flex gap-2">
            <button
              className="btn btn-sm btn-primary"
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/editar/${id}`);
              }}
            >
              Editar
            </button>

            <button
              className="btn btn-sm btn-danger"
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
