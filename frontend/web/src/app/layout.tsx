// import 'bootstrap/dist/css/bootstrap.min.css'; 

// export const metadata = {
//   title: "Mapa de Problemas Urbanos – Vila Manoel Sátiro",
//   description: "Aplicação web para reportar e visualizar problemas urbanos no bairro Vila Manoel Sátiro.",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="pt-BR">
//       <body>{children}</body>
//     </html>
//   );
// }

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";
import "leaflet/dist/leaflet.css";


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Navbar />
        {children}
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}
