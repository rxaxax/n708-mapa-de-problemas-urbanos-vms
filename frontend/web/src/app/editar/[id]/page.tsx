"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  getProblemById,
  updateProblem,
  deleteProblem,
} from "../../../services/problemService";
import AddressSearch from "../../../components/AddressSearch";
import dynamic from "next/dynamic";
import React from "react";

const LocationPickerMap = dynamic(
  () => import("../../../components/LocationPickerMap"),
  { ssr: false }
);

const CATEGORIES = [
  "Iluminação",
  "Pavimentação",
  "Segurança",
  "Lixo",
  "Esgoto",
  "Outros",
];

export default function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const router = useRouter();

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);

  // novos arquivos para upload
  const [newImages, setNewImages] = useState<File[]>([]);

  // imagens removidas
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  useEffect(() => {
    async function load() {
      const data = await getProblemById(id);
      setProblem(data);
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading) return <p className="text-center mt-4">Carregando...</p>;
  if (!problem) return <p>Problema não encontrado.</p>;

  function updateField(field: string, value: any) {
    setProblem((prev) => ({ ...prev, [field]: value }));
  }

  // Remover imagem já existente
  function handleRemoveExisting(imgUrl: string) {
    setProblem((prev) => ({
      ...prev,
      images: prev.images.filter((img) => img !== imgUrl),
    }));
    setRemovedImages((prev) => [...prev, imgUrl]);
  }

  // Adicionar novas imagens
  function handleAddNewImages(files: FileList | null) {
    if (!files) return;

    const incoming = Array.from(files);

    const total =
      (problem.images?.length || 0) + newImages.length + incoming.length;

    if (total > 5) {
      alert("Máximo de 5 imagens por problema.");
      return;
    }

    setNewImages((prev) => [...prev, ...incoming]);
  }

  // Remover nova imagem antes de enviar
  function handleRemoveNewImage(name: string) {
    setNewImages((prev) => prev.filter((f) => f.name !== name));
  }

  async function handleSubmit(e: any) {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", problem.title);
    formData.append("description", problem.description || "");
    formData.append("category", problem.category);
    formData.append("address", problem.address);
    formData.append("lat", String(problem.lat));
    formData.append("lng", String(problem.lng));
    formData.append("status", problem.status);
    formData.append("anonymous", String(problem.anonymous));

    // envia só o filename das imagens preservadas
    (problem.images || []).forEach((img: string) => {
      const filename = img.split("/").pop(); // extrai só o nome
      if (filename) {
        formData.append("existingImages", filename);
      }
    });

    // envia novas imagens (arquivos)
    newImages.forEach((file) => {
      formData.append("images", file);
    });

    // Proteger contra imagens undefined
    const existing = problem.images || [];
    existing.forEach((img) => {
      const filename = img.split("/").pop();
      formData.append("existingImages", filename);
    });

    try {
      await updateProblem(id, formData);
      alert("Problema atualizado com sucesso!");
      router.push("/");
    } catch {
      alert("Erro ao atualizar problema.");
    }
  }

  async function handleDelete() {
    if (!confirm("Deseja realmente excluir este problema?")) return;

    await deleteProblem(id);
    alert("Problema excluído.");
    router.push("/");
  }

  // Seleção vinda do AddressSearch
  function handleAddressSelected(lat: number, lng: number, address: string) {
    setProblem((prev) => ({
      ...prev,
      lat,
      lng,
      address,
    }));
  }

  // Movimento do pin no mapa
  function handleMapMoved(lat: number, lng: number, address: string) {
    setProblem((prev) => ({
      ...prev,
      lat,
      lng,
      address: address || prev.address,
    }));
  }

  return (
    <div className="container my-4">
      <h2 className="mb-4">Editar Problema</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-sm mx-2">
        {/* Título */}
        <div className="mb-3">
          <label className="form-label fw-bold mb-1">Título</label>
          <input
            type="text"
            className="form-control"
            value={problem.title}
            onChange={(e) => updateField("title", e.target.value)}
            required
          />
        </div>

        {/* Descrição */}
        <div className="mb-3">
          <label className="form-label fw-bold mb-1">Descrição</label>
          <textarea
            className="form-control"
            rows={3}
            value={problem.description || ""}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>

        {/* Categoria */}
        <div className="mb-3">
          <label className="form-label fw-bold mb-1">Categoria</label>
          <select
            className="form-select"
            value={problem.category}
            onChange={(e) => updateField("category", e.target.value)}
          >
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Endereço */}
        <AddressSearch
          onSelectAddress={handleAddressSelected}
          externalAddress={problem.address}
          label={
            <label className="form-label fw-bold mb-1">Novo endereço</label>
          }
        />

        {/* Mapa */}
        <div className="my-3 w-100">
          <LocationPickerMap
            lat={problem.lat}
            lng={problem.lng}
            onChangePosition={(lat, lng, address) =>
              handleMapMoved(lat, lng, address)
            }
          />
        </div>

        {/* Status */}
        <div className="mb-3">
          <label className="form-label fw-bold mb-1">Status</label>
          <select
            className="form-select"
            value={problem.status}
            onChange={(e) => updateField("status", e.target.value)}
          >
            <option value="pendente">Pendente</option>
            <option value="em_andamento">Em andamento</option>
            <option value="resolvido">Resolvido</option>
          </select>
        </div>

        {/* Anônimo */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={problem.anonymous}
            onChange={(e) => updateField("anonymous", e.target.checked)}
            id="anonCheck"
          />
          <label htmlFor="anonCheck" className="form-check-label">
            Reportar como anônimo
          </label>
        </div>

        {/* Imagens atuais */}
        <div className="mb-3">
          <label className="form-label fw-bold mb-2">Imagens atuais</label>

          <div className="d-flex flex-wrap gap-2">
            {problem.images.map((img: string, i: number) => (
              <div key={i} className="position-relative">
                <img
                  src={img}
                  className="edit-img"
                  style={{
                    width: "120px",
                    height: "90px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    border: "2px solid #ccc",
                  }}
                />

                <button
                  type="button"
                  className="btn btn-sm btn-danger position-absolute top-0 end-0"
                  onClick={() => handleRemoveExisting(img)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Novas imagens */}
        <div className="mb-3">
          <label className="form-label fw-bold mb-1">
            Adicionar novas imagens
          </label>
          <input
            type="file"
            className="form-control"
            multiple
            accept="image/*"
            onChange={(e) => handleAddNewImages(e.target.files)}
          />
        </div>

        {/* Preview de novas imagens */}
        {newImages.length > 0 && (
          <div className="mb-3">
            <p className="fw-bold mb-2">Pré-visualização</p>

            <div className="d-flex flex-wrap gap-2">
              {newImages.map((file, i) => (
                <div key={i} className="position-relative">
                  <img
                    src={URL.createObjectURL(file)}
                    className="edit-img"
                    style={{
                      width: "120px",
                      height: "90px",
                      objectFit: "cover",
                      borderRadius: "4px",
                      border: "2px solid #0d6efd",
                    }}
                  />

                  <button
                    type="button"
                    className="btn btn-sm btn-danger position-absolute top-0 end-0"
                    onClick={() => handleRemoveNewImage(file.name)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Botões */}
        <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-4">
          <button
            className="btn btn-secondary w-100 w-md-auto"
            type="button"
            onClick={() => router.push("/")}
          >
            Cancelar
          </button>

          <div className="d-flex flex-column flex-md-row gap-2 w-100 w-md-auto">
            <button className="btn btn-primary w-100 w-md-auto" type="submit">
              Salvar Alterações
            </button>

            <button
              className="btn btn-danger w-100 w-md-auto"
              type="button"
              onClick={handleDelete}
            >
              Excluir
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
