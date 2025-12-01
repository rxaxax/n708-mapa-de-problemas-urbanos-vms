"use client";

import { useEffect, useRef, useMemo } from "react";
import { MapContainer, TileLayer, Marker, Polygon, useMap } from "react-leaflet";
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
  iconSize: [25, 41], // mantém igual para não distorcer no mobile
  iconAnchor: [12, 41],
  className: "leaflet-marker-selected",
});

function ResizeHandler() {
  const map = useMap();
  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);
  return null;
}

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

  // Centro inicial
  const center = useMemo(() => {
    try {
      const centroid = turf.centroid(MANOEL_SATIRO_POLYGON);
      const [lng, lat] = centroid.geometry.coordinates;
      return [lat, lng];
    } catch {
      return [-3.74498, -38.57305];
    }
  }, []);

  // Polígono
  const polygonCoords = useMemo(() => {
    const coords = MANOEL_SATIRO_POLYGON?.geometry?.coordinates?.[0];
    return coords ? coords.map(([lng, lat]) => [lat, lng]) : [];
  }, []);

  // Lista estável de problemas com lat/lng
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

  // Voar até o selecionado
  useEffect(() => {
    if (!mapRef.current || !selectedProblemId) return;

    const problem = stableProblems.find((p) => p._id === selectedProblemId);
    if (!problem) return;

    mapRef.current.flyTo([problem.lat, problem.lng], 17, { duration: 0.8 });
  }, [selectedProblemId, stableProblems]);

  return (
    <>
      <div className="problem-map-container rounded overflow-hidden mb-3 mb-md-4">
        <MapContainer
          center={center}
          zoom={15}
          whenCreated={(map) => (mapRef.current = map)}
          className="w-100 h-100"
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

          <ResizeHandler />
        </MapContainer>
      </div>

      <style>
        {`
        .leaflet-marker-selected {
          filter: hue-rotate(-120deg) brightness(1.4);
        }
        `}
      </style>
    </>
  );
}
