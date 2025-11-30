import { useEffect } from "react";
import { useMap } from "react-leaflet";

function MapFocus({ problem }) {
  const map = useMap();

  useEffect(() => {
    if (!problem) return;

    map.setView([problem.lat, problem.lng], 17, {
      animate: true,
      duration: 0.8,
    });
  }, [problem]);

  return null;
}

export default MapFocus;
