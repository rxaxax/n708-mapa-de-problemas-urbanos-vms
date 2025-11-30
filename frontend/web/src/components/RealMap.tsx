"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const icon = L.icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = icon;

export default function RealMap({ problems }) {
  return (
    <MapContainer
      center={[-3.77638, -38.5600]} // Exemplo (Fortaleza)
      zoom={13}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {problems.map((p) => (
        <Marker key={p._id} position={[p.lat, p.lng]}>
          <Popup>
            <strong>{p.title}</strong><br />
            {p.category}<br />
            📍 {p.address}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
