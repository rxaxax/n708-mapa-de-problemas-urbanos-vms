"use client";

import { useState } from "react";
import AddressSearch from "./AddressSearch";
import LocationPickerMap from "./LocationPickerMap";

export default function ProblemForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    anonymous: false,
    address: "",
    lat: -3.74498, // centro do bairro
    lng: -38.57305,
  });

  // Quando o usuário seleciona um endereço no search
  const handleAddressSelected = (lat: number, lng: number, address: string) => {
    setFormData((prev) => ({
      ...prev,
      lat,
      lng,
      address,
    }));
  };

  // Quando o usuário clica no mapa → atualiza lat/lng
  const handleMapMoved = (lat: number, lng: number, address: string) => {
    setFormData((prev) => ({
      ...prev,
      lat,
      lng,
      address: address || prev.address,
    }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    console.log("FORM DATA ENVIADO:", formData);
    // futuramente: POST para API
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded bg-white shadow-sm"
    >
      <div className="mt-3">
        <label className="form-label">Título</label>
        <input
          type="text"
          className="form-control"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
        />
      </div>

      <div className="mt-3">
        <label className="form-label">Descrição</label>
        <textarea
          className="form-control"
          rows={3}
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
        ></textarea>
      </div>

      <div className="mt-3">
        <label className="form-label">Categoria</label>
        <select
          className="form-select"
          value={formData.category}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          <option value="">Selecione...</option>
          <option value="Iluminação">Iluminação</option>
          <option value="Saneamento">Saneamento</option>
          <option value="Buracos">Buracos</option>
          <option value="Lixo">Lixo</option>
          <option value="Segurança">Segurança</option>
          <option value="Alagamento">Alagamento</option>
        </select>
      </div>

      <div className="mt-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          checked={formData.anonymous}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, anonymous: e.target.checked }))
          }
        />
        <label className="form-check-label">Denunciar anonimamente</label>
      </div>

      {/* Campo de busca - SINCRONIZADO */}
      <AddressSearch
        onSelectAddress={handleAddressSelected}
        externalAddress={formData.address} // <--- NOVO
      />

      {/* Mapa - TOTALMENTE VINCULADO AO formData */}
      <LocationPickerMap
        lat={formData.lat}
        lng={formData.lng}
        onChangePosition={(lat, lng, address) =>
          handleMapMoved(lat, lng, address)
        }
      />

      <button className="btn btn-success w-100 mt-3" type="submit">
        Enviar Problema
      </button>
    </form>
  );
}
