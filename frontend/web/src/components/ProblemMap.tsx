/* "use client";

import { useEffect, useRef, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import * as turf from "@turf/turf";
import { MANOEL_SATIRO_POLYGON } from "../data/manoelSatiroPolygon";
import type { LatLngTuple, LatLngExpression } from "leaflet";

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
  const mapRef = useRef<any | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Centro inicial
  const center: LatLngTuple = useMemo(() => {
    try {
      const centroid = turf.centroid(MANOEL_SATIRO_POLYGON);
      const [lng, lat] = centroid.geometry.coordinates;
      return [lat, lng];
    } catch {
      return [-3.74498, -38.57305];
    }
  }, []);

  const mapKey = `${center[0]}_${center[1]}_${selectedProblemId ?? "none"}`;

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

  function MapInit({
    mapRef,
    keyId,
  }: {
    mapRef: React.MutableRefObject<any | null>;
    keyId?: string;
  }) {
    const map = useMap();

    useEffect(() => {
      if (!map) return;

      // Salva a instância
      mapRef.current = map;

      return () => {
        // Cleanup robusto: remove a instância do mapa para prevenir re-init error
        try {
          if (mapRef.current && typeof mapRef.current.remove === "function") {
            mapRef.current.remove();
          }
        } catch (err) {
          // silencioso — não fatal
        } finally {
          mapRef.current = null;
        }
      };
      // Dependemos da keyId para forçar reexecução quando quisermos recriar
    }, [map, keyId, mapRef]);

    return null;
  }

  function ResizeHandler() {
    const map = useMap();
    useEffect(() => {
      if (!map) return;
      const t = setTimeout(() => {
        try {
          map.invalidateSize();
        } catch (e) {}
      }, 200);
      return () => clearTimeout(t);
    }, [map]);
    return null;
  }

  return (
    <>
      <div className="problem-map-container rounded overflow-hidden mb-3 mb-md-4">
        {mounted && (
          <MapContainer
            key={mapKey}
            center={center as LatLngTuple}
            zoom={15}
            className="w-100 h-100"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap"
            />

            {polygonCoords.length > 0 && (
              <Polygon
                positions={polygonCoords as LatLngExpression[]}
                pathOptions={{ color: "blue" }}
              />
            )}

            {stableProblems.map((p) => (
              <Marker
                key={p._id}
                position={[p.lat, p.lng] as LatLngTuple}
                icon={p._id === selectedProblemId ? selectedPinIcon : pinIcon}
                eventHandlers={{ click: () => onSelect && onSelect(p._id) }}
              />
            ))}

            <MapInit mapRef={mapRef} keyId={mapKey} />
            <ResizeHandler />
          </MapContainer>
        )}
      </div>

      <style>{`
      .leaflet-marker-selected { filter: hue-rotate(-120deg) brightness(1.4); }
    `}</style>
    </>
  );
}
 */

"use client";

import { useEffect, useRef, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polygon,
  useMap,
} from "react-leaflet";
import L, { LatLngTuple } from "leaflet";
import * as turf from "@turf/turf";
import { MANOEL_SATIRO_POLYGON } from "../data/manoelSatiroPolygon";

// --- ÍCONES ----------------------------------------------------

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
  className: "leaflet-marker-selected",
});

// --- MAP INIT CLEANUP ------------------------------------------

function MapInit({ mapRef }: { mapRef: React.RefObject<any> }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    mapRef.current = map;

    return () => {
      // Remove instância ao desmontar o componente
      try {
        if (mapRef.current?.remove) {
          mapRef.current.remove();
        }
      } catch {}
      mapRef.current = null;
    };
  }, [map]);

  return null;
}

// --- RESIZE HANDLER (somente 1 vez) ------------------------------

function ResizeHandler() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const t = setTimeout(() => {
      try {
        map.invalidateSize();
      } catch {}
    }, 200);

    return () => clearTimeout(t);
  }, [map]);

  return null;
}

// --- COMPONENTE PRINCIPAL ---------------------------------------

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Centro inicial
  const center: LatLngTuple = useMemo(() => {
    try {
      const centroid = turf.centroid(MANOEL_SATIRO_POLYGON);
      const [lng, lat] = centroid.geometry.coordinates;
      return [lat, lng];
    } catch {
      return [-3.74498, -38.57305];
    }
  }, []);

  // Polígono convertido
  const polygonCoords = useMemo(() => {
    const coords = MANOEL_SATIRO_POLYGON?.geometry?.coordinates?.[0];
    return coords ? coords.map(([lng, lat]) => [lat, lng]) : [];
  }, []);

  // Problemas com posição válida
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

  // Fly para o problema selecionado
  useEffect(() => {
    if (!mapRef.current || !selectedProblemId) return;

    const problem = stableProblems.find((p) => p._id === selectedProblemId);
    if (!problem) return;

    try {
      mapRef.current.flyTo([problem.lat, problem.lng], 17, {
        duration: 0.8,
      });
    } catch {}
  }, [selectedProblemId, stableProblems]);

  return (
    <>
      <div className="problem-map-container rounded overflow-hidden mb-3 mb-md-4">
        {mounted && (
          <MapContainer
            center={center}
            zoom={15}
            className="w-100 h-100"
            zoomControl={true}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap"
            />

            {polygonCoords.length > 0 && (
              <Polygon
                positions={polygonCoords as LatLngTuple[]}
                pathOptions={{ color: "blue" }}
              />
            )}

            {stableProblems.map((p) => (
              <Marker
                key={p._id}
                position={[p.lat, p.lng]}
                icon={p._id === selectedProblemId ? selectedPinIcon : pinIcon}
                eventHandlers={{
                  click: () => onSelect?.(p._id),
                }}
              />
            ))}

            <MapInit mapRef={mapRef} />
            <ResizeHandler />
          </MapContainer>
        )}
      </div>

      <style>{`
        .leaflet-marker-selected {
          filter: hue-rotate(-120deg) brightness(1.4);
        }
      `}</style>
    </>
  );
}
