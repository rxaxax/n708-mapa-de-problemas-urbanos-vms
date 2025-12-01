"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { getAllProblems, deleteProblem } from "../services/problemService";
import ProblemCard from "../components/ProblemCard";
import { useAuth } from "../context/authContext";

// Mapa (sem SSR)
const ProblemMap = dynamic(() => import("../components/ProblemMap"), {
  ssr: false,
});

export default function HomePage() {
  const [problems, setProblems] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("pendente");

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { user } = useAuth();

  // Carregar problemas
  useEffect(() => {
    async function load() {
      const data = await getAllProblems();
      setProblems(data);
    }
    load();
  }, []);

  // Exclusão no frontend
  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir este problema?")) return;

    try {
      await deleteProblem(id);

      // Atualiza listagem
      setProblems((prev) => prev.filter((p) => p._id !== id));

      alert("Problema excluído com sucesso!");

      // Se excluiu o selecionado → limpa a seleção
      if (selectedId === id) setSelectedId(null);
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir.");
    }
  }

  // Filtragem — com useMemo para estabilidade
  const filteredProblems = useMemo(() => {
    return problems.filter((p: any) => {
      const categoryOk =
        categoryFilter === "Todos" || p.category === categoryFilter;

      const statusOk = statusFilter === "Todos" || p.status === statusFilter;

      return categoryOk && statusOk;
    });
  }, [problems, categoryFilter, statusFilter]);

  const isOwner = (p: any) => {
    const backendId = p?.userId?.id || p?.userId?._id;
    const loggedId = user?._id;

    return Boolean(backendId && loggedId && backendId === loggedId);
  };

  return (
    <div className="px-3 px-md-4 py-3">
      <h2>Problemas Reportados</h2>

      {/*Filtros*/}
      <div className="row mt-3 mb-4">
        <div className="col-12 col-md-4 mb-3 mb-md-0">
          <label className="fw-bold mb-1">Categoria:</label>
          <select
            className="form-select"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option>Todos</option>
            <option>Iluminação</option>
            <option>Pavimentação</option>
            <option>Segurança</option>
            <option>Lixo</option>
            <option>Esgoto</option>
            <option>Outros</option>
          </select>
        </div>

        <div className="col-12 col-md-4 mb-3 mb-md-0">
          <label className="fw-bold mb-1">Status:</label>
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="Todos">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em andamento</option>
            <option value="resolvido">Resolvido</option>
          </select>
        </div>
      </div>

      {/*Mapa*/}
      <div className="row">
        <div className="col-12">
          <div key="map-wrapper" className="w-100">
            <ProblemMap
              problems={filteredProblems}
              selectedProblemId={selectedId}
              onSelect={(id) => setSelectedId(id)}
            />
          </div>
        </div>
      </div>

      {/*Cards*/}
      <div className="row mt-3">
        {filteredProblems.map((p: any) => (
          <div
            key={p._id}
            className="col-12 col-sm-6 col-lg-4 mb-3"
            onClick={() => setSelectedId(p._id)}
            style={{ cursor: "pointer" }}
          >
            <ProblemCard
              id={p._id}
              title={p.title}
              description={p.description}
              category={p.category}
              address={p.address}
              image={p.images?.[0]}
              status={p.status}
              anonymous={p.anonymous}
              reportedBy={p.userId?.name}
              createdAt={p.createdAt}
              selected={selectedId === p._id}
              isOwner={isOwner(p)}
              onDelete={handleDelete}
            />
          </div>
        ))}

        {filteredProblems.length === 0 && (
          <p className="text-muted mt-3">Nenhum problema encontrado.</p>
        )}
      </div>
    </div>
  );
}
