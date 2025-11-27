"use client";

import { MapContainer, TileLayer, Marker, Polygon, useMapEvents } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import * as turf from "@turf/turf";
import { MANOEL_SATIRO_POLYGON } from "../data/manoelSatiroPolygon";

const pinIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface Props {
  lat: number | null;
  lng: number | null;
  onChangePosition: (lat: number, lng: number, address: string) => void;
}

export default function LocationPickerMap({ lat, lng, onChangePosition }: Props) {
  // 🔵 Converte polígono para Leaflet
  const polygonCoords = MANOEL_SATIRO_POLYGON.geometry.coordinates[0].map(
    (pair: number[]) => [pair[1], pair[0]]
  );

  // 🎯 Centro oficial do bairro via Turf
  const centerPoint = turf.center(MANOEL_SATIRO_POLYGON);
  const [centerLng, centerLat] = centerPoint.geometry.coordinates;

  function MapEvents() {
    const map = useMapEvents({
      click: async (e) => {
        const { lat, lng } = e.latlng;

        const point = turf.point([lng, lat]);
        const polygon = turf.polygon([
          MANOEL_SATIRO_POLYGON.geometry.coordinates[0]
        ]);

        const inside = turf.booleanPointInPolygon(point, polygon);

        if (!inside) {
          alert("Este ponto está fora do bairro Vila Manoel Sátiro.");
          return;
        }

        // Reverse geocoding
        let address = "";
        try {
          const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`;
          const res = await axios.get(url);
          const { road, house_number } = res.data.address;
          address = `${road ?? ""}${house_number ? ", " + house_number : ""}`;
        } catch {}

        onChangePosition(lat, lng, address);
      },
    });

    return null;
  }

  return (
    <MapContainer
      center={[centerLat, centerLng]} // 🔥 Mapa inicia centralizado no bairro
      zoom={15}
      style={{ height: "350px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      {/* 🔵 Polígono oficial do bairro */}
      <Polygon positions={polygonCoords} pathOptions={{ color: "blue", weight: 2 }} />

      {/* 📍 Exibe o marcador SOMENTE se o usuário selecionou um endereço */}
      {lat !== null && lng !== null && (
        <Marker position={[lat, lng]} icon={pinIcon} />
      )}

      <MapEvents />
    </MapContainer>
  );
}
