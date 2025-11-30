/* "use client";

import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";
import { MANOEL_SATIRO_POLYGON } from "../data/manoelSatiroPolygon";

const pinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function ProblemMap({ problems }: { problems: any[] }) {
  // Polígono convertido para Leaflet
  const polygonCoords = MANOEL_SATIRO_POLYGON.geometry.coordinates[0].map(
    (pair: number[]) => [pair[1], pair[0]]
  );

  // Centro
  const centerPoint = turf.center(MANOEL_SATIRO_POLYGON);
  const [centerLng, centerLat] = centerPoint.geometry.coordinates;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={15}
      style={{ height: "400px", width: "100%", marginBottom: "20px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      {/* Polígono do bairro *}
      <Polygon
        positions={polygonCoords}
        pathOptions={{ color: "blue", weight: 2 }}
      />

      {/* Marcadores *}
      {problems.map((p: any) => (
        <Marker
          key={p._id}
          position={[p.lat, p.lng]}
          icon={pinIcon}
        />
      ))}
    </MapContainer>
  );
}
 */

/* "use client";

import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";
import { MANOEL_SATIRO_POLYGON } from "../data/manoelSatiroPolygon";

const pinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedPinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png",
  iconSize: [30, 48],
  iconAnchor: [15, 48],
});

export default function ProblemMap({
  problems,
  selectedId,
  onSelect,
}: {
  problems: any[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  // Polígono convertido para Leaflet
  const polygonCoords = MANOEL_SATIRO_POLYGON.geometry.coordinates[0].map(
    (pair: number[]) => [pair[1], pair[0]]
  );

  // Centro
  const centerPoint = turf.center(MANOEL_SATIRO_POLYGON);
  const [centerLng, centerLat] = centerPoint.geometry.coordinates;

  return (
    <MapContainer
      center={[centerLat, centerLng]}
      zoom={15}
      style={{ height: "400px", width: "100%", marginBottom: "20px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      {/* Polígono do bairro *}
      <Polygon
        positions={polygonCoords}
        pathOptions={{ color: "blue", weight: 2 }}
      />

      {/* Marcadores *}
      {problems.map((p: any) => (
        <Marker
          key={p._id}
          position={[p.lat, p.lng]}
          icon={p._id === selectedId ? selectedPinIcon : pinIcon}
          eventHandlers={{
            click: () => onSelect && onSelect(p._id),
          }}
        />
      ))}
    </MapContainer>
  );
}
 */

/* "use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";
import { MANOEL_SATIRO_POLYGON } from "../data/manoelSatiroPolygon";

const pinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedPinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png",
  iconSize: [30, 48],
  iconAnchor: [15, 48],
});

export default function ProblemMap({
  problems,
  selectedId,
  onSelect,
}: {
  problems: any[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  // Evita renderização no SSR e evitar erros do Leaflet
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);

    // Evita o erro de container já existente ao re-renderizar
    const map = document.getElementById("map");
    if (map) map.innerHTML = "";
  }, []);

  if (!ready) return null;

  // Memoriza o array de problemas para evitar remount do mapa
  const stableProblems = useMemo(() => problems, [problems]);

  // Polígono do bairro
  const polygonCoords = useMemo(
    () =>
      MANOEL_SATIRO_POLYGON.geometry.coordinates[0].map(
        (pair: number[]) => [pair[1], pair[0]]
      ),
    []
  );

  // Centro do bairro
  const center = useMemo(() => {
    const centerPoint = turf.center(MANOEL_SATIRO_POLYGON);
    const [lng, lat] = centerPoint.geometry.coordinates;
    return [lat, lng] as [number, number];
  }, []);

  return (
    <MapContainer
      id="map"
      center={center}
      zoom={15}
      preferCanvas={true}
      style={{ height: "400px", width: "100%", marginBottom: "20px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      <Polygon positions={polygonCoords} pathOptions={{ color: "blue", weight: 2 }} />

      {stableProblems.map((p: any) => (
        <Marker
          key={p._id}
          position={[p.lat, p.lng]}
          icon={p._id === selectedId ? selectedPinIcon : pinIcon}
          eventHandlers={{
            click: () => onSelect && onSelect(p._id),
          }}
        />
      ))}
    </MapContainer>
  );
} */

/*   "use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";
import { MANOEL_SATIRO_POLYGON } from "../data/manoelSatiroPolygon";

const pinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const selectedPinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "selected-pin", // adiciona classe para aplicar o filtro
});


export default function ProblemMap({
  problems,
  selectedId,
  onSelect,
}: {
  problems: any[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);

    const map = document.getElementById("map");
    if (map) map.innerHTML = "";
  }, []);

  // ⛔ Hooks precisam estar SEMPRE fora de condições
  const stableProblems = useMemo(() => problems, [problems]);

  const polygonCoords = useMemo(
    () =>
      MANOEL_SATIRO_POLYGON.geometry.coordinates[0].map(
        (pair: number[]) => [pair[1], pair[0]]
      ),
    []
  );

  const center = useMemo(() => {
    const centerPoint = turf.center(MANOEL_SATIRO_POLYGON);
    const [lng, lat] = centerPoint.geometry.coordinates;
    return [lat, lng] as [number, number];
  }, []);

  // Agora sim: o "return null" vem DEPOIS dos hooks
  if (!ready) return null;

  return (
    <MapContainer
      id="map"
      center={center}
      zoom={15}
      preferCanvas={true}
      style={{ height: "400px", width: "100%", marginBottom: "20px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap"
      />

      <Polygon positions={polygonCoords} pathOptions={{ color: "blue", weight: 2 }} />

      {stableProblems.map((p: any) => (
        <Marker
          key={p._id}
          position={[p.lat, p.lng]}
          icon={p._id === selectedId ? selectedPinIcon : pinIcon}
          eventHandlers={{
            click: () => onSelect && onSelect(p._id),
          }}
        />
      ))}
    </MapContainer>
  );
}

 */

/* "use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";
import { MANOEL_SATIRO_POLYGON } from "../data/manoelSatiroPolygon";

const pinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "shadow-sm",
});

// Ícone selecionado (mesma imagem, só maior e com classe que receberá o filtro)
const selectedPinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [30, 48],
  iconAnchor: [15, 48],
  className: "shadow-sm leaflet-marker-selected",
});

export default function ProblemMap({ problems }) {
  const [selectedProblem, setSelectedProblem] = useState(null);

  const markers = useMemo(() => {
    return problems?.map((p) => ({
      id: p._id,
      title: p.title,
      description: p.description,
      position: { lat: p.latitude, lng: p.longitude },
    })) || [];
  }, [problems]);

  useEffect(() => {
    console.log("Markers atualizados:", markers);
  }, [markers]);
  return (
    <>
      <MapContainer
        id="map"
        center={center}
        zoom={15}
        preferCanvas={true}
        style={{ height: "400px", width: "100%", marginBottom: "20px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        <Polygon
          positions={polygonCoords}
          pathOptions={{ color: "blue", weight: 2 }}
        />

        {stableProblems.map((p: any) => (
          <Marker
            key={p._id}
            position={[p.lat, p.lng]}
            icon={p._id === selectedId ? selectedPinIcon : pinIcon}
            eventHandlers={{
              click: () => onSelect && onSelect(p._id),
            }}
          />
        ))}
      </MapContainer>

      {/* Agora o estilo está sempre no mesmo lugar e nunca muda a ordem dos hooks *}
      <style>
        {`
        .leaflet-marker-selected {
          filter: hue-rotate(-120deg) brightness(1.4) saturate(2);
        }
      `}
      </style>
    </>
  );
}
 */

/* "use client";

import { useEffect, useState, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import { MANOEL_SATIRO_POLYGON } from "../data/manoelSatiroPolygon";

const pinIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "shadow-sm"
});

const selectedPinIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [30, 48],
  iconAnchor: [15, 48],
  className: "shadow-sm leaflet-marker-selected"
});

export default function ProblemMap({ problems, selectedProblemId, onSelect }) {
  // Centro padrão → Vila Manoel Sátiro
  const center = { lat: -3.7865, lng: -38.5589 };

  // Convertendo polygon do data file
  const polygonCoords = MANOEL_SATIRO_POLYGON.coordinates[0].map(
    ([lng, lat]) => [lat, lng]
  );

  // Markers estáveis usando useMemo
  const markers = useMemo(() => {
    return (
      problems?.map((p) => ({
        id: p._id,
        title: p.title,
        lat: p.latitude,
        lng: p.longitude,
      })) || []
    );
  }, [problems]);

  return (
    <>
      <MapContainer
        id="map"
        center={center}
        zoom={15}
        preferCanvas={true}
        style={{ height: "400px", width: "100%", marginBottom: "20px" }}
        className="border rounded shadow-sm"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        {/* Polígono do bairro *}
        <Polygon
          positions={polygonCoords}
          pathOptions={{ color: "blue", weight: 2 }}
        />

        {/* Markers *}
        {markers.map((m) => (
          <Marker
            key={m.id}
            position={[m.lat, m.lng]}
            icon={m.id === selectedProblemId ? selectedPinIcon : pinIcon}
            eventHandlers={{
              click: () => onSelect && onSelect(m.id),
            }}
          />
        ))}
      </MapContainer>

      {/* Estilo Bootstrap-friendly para destacar o pin selecionado *}
      <style>
        {`
          .leaflet-marker-selected {
            filter: hue-rotate(-120deg) brightness(1.4) saturate(2);
          }
        `}
      </style>
    </>
  );
}
 */

/* "use client";

import { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";
import { MANOEL_SATIRO_POLYGON } from "../data/manoelSatiroPolygon";

// Ícone padrão
const pinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "shadow-sm",
});

// Ícone destacado
const selectedPinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [32, 52],
  iconAnchor: [16, 52],
  className: "shadow-sm leaflet-marker-selected",
});

export default function ProblemMap({
  problems,
  selectedProblemId,
  onSelect,
}: {
  problems: any[];
  selectedProblemId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const mapRef = useRef<any>(null);

  // Centro do bairro (cálculo fixo)
  const center = useMemo(() => {
    const centroid = turf.centroid(MANOEL_SATIRO_POLYGON);
    const [lng, lat] = centroid.geometry.coordinates;
    return [lat, lng];
  }, []);

  // Polígono em formato Leaflet
  const polygonCoords = useMemo(() => {
    const coords = MANOEL_SATIRO_POLYGON.geometry.coordinates[0];
    return coords.map(([lng, lat]: number[]) => [lat, lng]);
  }, []);

  // Lista de problemas válida
  const stableProblems = useMemo(() => {
    return (
      problems
        ?.filter((p) => p.lat != null && p.lng != null)
        .map((p) => ({
          _id: p._id,
          lat: p.lat,
          lng: p.lng,
          title: p.title,
        })) ?? []
    );
  }, [problems]);

  // ZOOM AUTOMÁTICO quando selectedProblemId muda
  useEffect(() => {
    if (!mapRef.current || !selectedProblemId) return;

    const problem = stableProblems.find((p) => p._id === selectedProblemId);
    if (!problem) return;

    mapRef.current.flyTo([problem.lat, problem.lng], 17, {
      duration: 0.8,
    });
  }, [selectedProblemId, stableProblems]);

  return (
    <>
      <MapContainer
        center={center}
        zoom={15}
        whenCreated={(map) => (mapRef.current = map)}
        style={{ height: "400px", width: "100%", marginBottom: "20px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        <Polygon positions={polygonCoords} pathOptions={{ color: "blue" }} />

        {stableProblems.map((p) => (
          <Marker
            key={p._id}
            position={[p.lat, p.lng]}
            icon={p._id === selectedProblemId ? selectedPinIcon : pinIcon}
            eventHandlers={{
              click: () => onSelect && onSelect(p._id),
            }}
          />
        ))}
      </MapContainer>

      {/* Estilo do marcador selecionado via Bootstrap-safe CSS *}
      <style>
        {`
          .leaflet-marker-selected {
            filter: hue-rotate(-120deg) brightness(1.4) saturate(2);
          }
        `}
      </style>
    </>
  );
}
 */

"use client";

import { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polygon } from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";
import { MANOEL_SATIRO_POLYGON } from "../data/manoelSatiroPolygon";

// Ícones
const pinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  className: "shadow-sm",
});

const selectedPinIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [32, 52],
  iconAnchor: [16, 52],
  className: "shadow-sm leaflet-marker-selected",
});

export default function ProblemMap({
  problems,
  selectedProblemId,
  onSelect,
}: {
  problems: any[];
  selectedProblemId?: string | null;
  onSelect?: (id: string) => void;
}) {
  const mapRef = useRef<any>(null);

  // Centro inicial (centróide)
  const center = useMemo(() => {
    try {
      const centroid = turf.centroid(MANOEL_SATIRO_POLYGON);
      const [lng, lat] = centroid.geometry.coordinates;
      return [lat, lng];
    } catch {
      return [-3.74498, -38.57305]; // fallback
    }
  }, []);

  // Polígono convertido para Leaflet
  const polygonCoords = useMemo(() => {
    const coords = MANOEL_SATIRO_POLYGON?.geometry?.coordinates?.[0];
    if (!coords) return [];
    return coords.map(([lng, lat]) => [lat, lng]);
  }, []);

  // Problemas válidos (lat/lng)
  const stableProblems = useMemo(
    () =>
      problems
        ?.filter((p) => p.lat != null && p.lng != null)
        .map((p) => ({
          _id: p._id,
          title: p.title,
          lat: p.lat,
          lng: p.lng,
        })) ?? [],
    [problems]
  );

  // 🔥 ZOOM AUTOMÁTICO ao selecionar card
  useEffect(() => {
    if (!mapRef.current || !selectedProblemId) return;

    const problem = stableProblems.find((p) => p._id === selectedProblemId);
    if (!problem) return;

    mapRef.current.flyTo([problem.lat, problem.lng], 17, {
      duration: 0.8,
    });
  }, [selectedProblemId, stableProblems]);

  return (
    <>
      <MapContainer
        center={center}
        zoom={15}
        whenCreated={(map) => (mapRef.current = map)}
        style={{ height: "400px", width: "100%", marginBottom: "20px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap"
        />

        {polygonCoords.length > 0 && (
          <Polygon positions={polygonCoords} pathOptions={{ color: "blue" }} />
        )}

        {stableProblems.map((p) => (
          <Marker
            key={p._id}
            position={[p.lat, p.lng]}
            icon={p._id === selectedProblemId ? selectedPinIcon : pinIcon}
            eventHandlers={{
              click: () => onSelect && onSelect(p._id),
            }}
          />
        ))}
      </MapContainer>

      {/* Destaque do marker selecionado via CSS */}
      <style>
        {`
          .leaflet-marker-selected {
            filter: hue-rotate(-120deg) brightness(1.5) saturate(2);
          }
      `}
      </style>
    </>
  );
}
