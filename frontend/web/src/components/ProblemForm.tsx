"use client";

import { useState } from "react";
import AddressSearch from "./AddressSearch";
import LocationPickerMap from "./LocationPickerMap";
import { createProblem } from "../services/reportProblemService";
import { useRouter } from "next/navigation";

export default function ProblemForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    anonymous: false,
    address: "",
    lat: 0,
    lng: 0,
  });

  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  // VALIDAR IMAGENS
  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);

    if (files.length > 5) {
      setErrors(["Selecione no máximo 5 imagens."]);
      return;
    }

    setErrors([]);
    setImages(files);

    const preview = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(preview);
  };

  // ======= ENDEREÇO / MAPA ========
  const handleAddressSelected = (lat: number, lng: number, address: string) => {
    setFormData((prev) => ({
      ...prev,
      lat,
      lng,
      address,
    }));
  };

  const handleMapMoved = (lat: number, lng: number, address: string) => {
    setFormData((prev) => ({
      ...prev,
      lat,
      lng,
      address: address || prev.address,
    }));
  };

  // VALIDAR CAMPOS DO FORMULÁRIO
  const validateForm = () => {
    const errorsList: string[] = [];

    if (!formData.title.trim()) errorsList.push("O título é obrigatório.");
    if (!formData.category.trim())
      errorsList.push("A categoria é obrigatória.");
    if (!formData.address.trim()) errorsList.push("O endereço é obrigatório.");
    if (images.length > 5) errorsList.push("Máximo de 5 imagens permitidas.");

    setErrors(errorsList);

    return errorsList.length === 0;
  };

  // SUBMIT
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    try {
      const result = await createProblem({
        ...formData,
        images,
      });

      alert("Problema enviado com sucesso!");
      router.push("/");

      // resetar
      setFormData({
        title: "",
        description: "",
        category: "",
        anonymous: false,
        address: "",
        lat: -3.74498,
        lng: -38.57305,
      });

      setImages([]);
      setPreviewUrls([]);
      setErrors([]);
    } catch (error) {
      console.error(error);
      alert("Falha ao enviar problema.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded bg-white shadow-sm mx-2 mx-md-0"
    >
      {/* ERROS */}
      {errors.length > 0 && (
        <div className="alert alert-danger mb-3">
          <ul className="mb-0">
            {errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* TÍTULO */}
      <div className="mt-3">
        <label className="form-label mb-1">Título *</label>
        <input
          type="text"
          className="form-control"
          placeholder="Ex: Buraco na rua"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>

      {/* CATEGORIA */}
      <div className="mt-3">
        <label className="form-label mb-1">Categoria *</label>
        <select
          className="form-select"
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="">Selecione...</option>
          <option value="Iluminação">Iluminação</option>
          <option value="Pavimentação">Pavimentação</option>
          <option value="Segurança">Segurança</option>
          <option value="Lixo">Lixo</option>
          <option value="Esgoto">Esgoto</option>
          <option value="Outros">Outros</option>
        </select>
      </div>

      {/* DESCRIÇÃO */}
      <div className="mt-3">
        <label className="form-label mb-1">Descrição (opcional)</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Descreva o problema..."
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        ></textarea>
      </div>

      {/* ANÔNIMO */}
      <div className="mt-3 form-check d-flex align-items-center gap-2">
        <input
          type="checkbox"
          className="form-check-input"
          checked={formData.anonymous}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, anonymous: e.target.checked }))
          }
          id="anonCheck"
        />
        <label htmlFor="anonCheck" className="form-check-label">
          Denunciar anonimamente
        </label>
      </div>

      {/* BUSCA DE ENDEREÇO */}
      <AddressSearch
        onSelectAddress={handleAddressSelected}
        externalAddress={formData.address}
      />

      {/* MAPA RESPONSIVO */}
      <div className="my-3">
        <LocationPickerMap
          lat={formData.lat}
          lng={formData.lng}
          onChangePosition={(lat, lng, address) =>
            handleMapMoved(lat, lng, address)
          }
        />
      </div>

      {/* IMAGENS */}
      <div className="mt-3">
        <label className="form-label mb-1">Imagens (máx. 5)</label>
        <input
          type="file"
          multiple
          accept="image/*"
          className="form-control"
          onChange={handleImages}
        />
      </div>

      {/* PREVIEW */}
      {previewUrls.length > 0 && (
        <div className="mt-3 d-flex gap-2 flex-wrap">
          {previewUrls.map((src, i) => (
            <img
              key={i}
              src={src}
              className="rounded"
              style={{
                width: "110px",
                height: "110px",
                objectFit: "cover",
              }}
            />
          ))}
        </div>
      )}

      <button className="btn btn-success w-100 mt-4" type="submit">
        Enviar Problema
      </button>
    </form>
  );
}
