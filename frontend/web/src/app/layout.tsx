"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";
import "leaflet/dist/leaflet.css";
import "../styles/map.css";
import "../styles/problemMap.css";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-light min-vh-100">
        <AuthProvider>
          <Navbar />
          <main className="container mt-4">{children}</main>
        </AuthProvider>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}
