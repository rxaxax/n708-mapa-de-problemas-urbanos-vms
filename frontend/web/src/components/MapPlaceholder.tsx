// "use client";

// export default function MapPlaceholder() {
//   return (
//     <div
//       className="bg-secondary d-flex align-items-center justify-content-center text-white"
//       style={{
//         height: "100%",
//         minHeight: "400px",
//         borderRadius: "8px",
//       }}
//     >
//       <h5>🗺️ O mapa será carregado aqui em breve...</h5>
//     </div>
//   );
// }

"use client";

import React from "react";

export default function MapPlaceholder() {
  return (
    <div
      id="map"
      className="mb-4 d-flex align-items-center justify-content-center"
      style={{
        width: "100%",
        height: "400px",
        background: "#e1e8ef",
        borderRadius: "8px",
      }}
    >
      <span className="text-muted">[ Mapa será renderizado aqui ]</span>
    </div>
  );
}
