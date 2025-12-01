"use client";

import dynamic from "next/dynamic";
import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProblemForm = dynamic(() => import("../../components/ProblemForm"), {
  ssr: false,
});

export default function ReportarProblemaPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Proteção da rota
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p className="container mt-4">Carregando...</p>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container my-4 px-3 px-md-0">
      <h2 className="mb-4">Reportar problema urbano</h2>

      <div className="card p-4 shadow-sm mx-2 mx-md-0">
        <ProblemForm />
      </div>
    </div>
  );
}
