"use client";

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
