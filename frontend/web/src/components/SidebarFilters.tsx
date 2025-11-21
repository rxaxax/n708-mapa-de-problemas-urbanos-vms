"use client";

import React from "react";

export default function SidebarFilters() {
  return (
    <aside id="sidebar" className="col-12 col-md-3 col-lg-2 p-3 bg-white border-end">
      <h5 className="fw-bold">Filtros</h5>

      <div className="mt-3">
        <label className="form-label fw-semibold">Categoria</label>
        <select className="form-select">
          <option value="">Todas</option>
          <option>Iluminação</option>
          <option>Saneamento</option>
          <option>Buracos</option>
          <option>Lixo</option>
          <option>Segurança</option>
        </select>
      </div>

      <div className="mt-4">
        <label className="form-label fw-semibold">Status</label>
        <select className="form-select">
          <option value="">Todos</option>
          <option>Pendente</option>
          <option>Em andamento</option>
          <option>Resolvido</option>
        </select>
      </div>

      <button className="btn btn-primary w-100 mt-4">Aplicar filtros</button>
    </aside>
  );
}
