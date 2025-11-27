"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Props {
  onSelectAddress: (lat: number, lng: number, address: string) => void;
  externalAddress?: string; // <--- novo
}

export default function AddressSearch({
  onSelectAddress,
  externalAddress,
}: Props) {
  const [input, setInput] = useState("");

  useEffect(() => {
    if (externalAddress !== undefined) {
      setInput(externalAddress);
    }
  }, [externalAddress]);

  const normalize = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim();

  const bairroValido = (bairro: string) => {
    const normalized = normalize(bairro);

    const allowed = [
      "vila manoel satiro",
      "manoel satiro",
      "vila manuel satiro",
      "manoel satro",
    ];

    return allowed.some((b) => normalized.includes(b));
  };

  const extractNumFromInput = (s: string) => {
    const match = s.match(/\b(\d+)\b/);
    return match ? match[1] : null;
  };

  const handleSearch = async () => {
    if (!input.trim()) return;

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&q=${encodeURIComponent(
        input + " Fortaleza CE"
      )}`;

      const res = await axios.get(url);
      const result = res.data[0];

      if (!result) {
        alert("Endereço não encontrado.");
        return;
      }

      const bairro =
        result.address.suburb ||
        result.address.neighbourhood ||
        result.address.city_district ||
        "";

      if (!bairroValido(bairro)) {
        alert("O endereço precisa estar dentro do bairro Vila Manoel Sátiro.");
        return;
      }

      const lat = parseFloat(result.lat);
      const lon = parseFloat(result.lon);

      // 🔍 tenta extrair número do input
      const userNumber = extractNumFromInput(input);

      // 🔍 tenta capturar o número de várias fontes
      const number =
        result.address.house_number ||
        userNumber ||
        result.address.building ||
        result.address.house_name ||
        "";

      const shortAddress =
        (result.address.road || "") + (number ? `, ${number}` : "");

      setInput(shortAddress);

      onSelectAddress(lat, lon, shortAddress);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar endereço.");
    }
  };

  return (
    <div className="mb-3">
      <label className="form-label">Buscar Endereço</label>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Digite um endereço..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
    </div>
  );
}
