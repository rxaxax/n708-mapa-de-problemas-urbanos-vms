"use client";

import dynamic from "next/dynamic";
import { useEffect } from "react";

const MapComponent = dynamic(() => import("./RealMap"), { ssr: false });

export default function MapPlaceholder({ problems }) {
  return (
    <div style={{ height: "400px", borderRadius: "8px", overflow: "hidden" }}>
      <MapComponent problems={problems} />
    </div>
  );
}
