import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";
import "leaflet/dist/leaflet.css";
import { AuthProvider } from "../context/authContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <Navbar />
          {children}
        </AuthProvider>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}
