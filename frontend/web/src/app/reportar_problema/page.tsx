/* "use client";

import dynamic from "next/dynamic";


const ProblemForm = dynamic(() => import("../../components/ProblemForm"), {
  ssr: false,
});

export default function ReportarProblemaPage() {
  return (
    <div className="container my-4">
      <h2 className="mb-3">Reportar problema urbano</h2>
      <ProblemForm />
    </div>
  );
}
 */

"use client";

import dynamic from "next/dynamic";
import { useAuthContext } from "../../context/authContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ProblemForm = dynamic(() => import("../../components/ProblemForm"), {
  ssr: false,
});

export default function ReportarProblemaPage() {
  const { user, loading } = useAuthContext();
  const router = useRouter();

  // 🛡 Proteção da rota
  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p className="container mt-4">Carregando...</p>;
  }

  if (!user) {
    return null; // ❗ evita conteúdo piscar
  }

  return (
    <div className="container my-4">
      <h2 className="mb-3">Reportar problema urbano</h2>
      <ProblemForm />
    </div>
  );
}
