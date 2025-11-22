import SidebarFilters from "../components/SidebarFilters";
import MapPlaceholder from "../components/MapPlaceholder";
import ProblemCard from "../components/ProblemCard";

export default function HomePage() {
  const problems = [
    {
      title: "Buraco em via pública",
      address: "Rua Afonso Lopes, Vila Manoel Sátiro",
      image: "https://placehold.co/300x160",
      status: "Pendente",
    },
    {
      title: "Lâmpada queimada no poste",
      address: "Rua Eliezer Paiva, Vila Manoel Sátiro",
      image: "https://placehold.co/300x160",
      status: "Em andamento",
    },
    {
      title: "Acúmulo de lixo",
      address: "Rua Peru, Vila Manoel Sátiro",
      image: "https://placehold.co/300x160",
      status: "Resolvido",
    },
  ];

  return (
    <div className="container-fluid">
      <div className="row">
        <SidebarFilters />

        <main className="col-12 col-md-9 col-lg-10 p-4">
          <h3 className="fw-bold mb-3">Mapa de Problemas</h3>

          <MapPlaceholder />

          <h5 className="fw-bold mt-4 mb-3">Problemas Reportados</h5>

          <div className="row g-3">
            {problems.map((p, i) => (
              <ProblemCard key={i} {...p} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
