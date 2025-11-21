// import Navbar from "@/components/Navbar";
// import Sidebar from "@/components/Sidebar";
// import MapPlaceholder from "@/components/MapPlaceholder";
// import Footer from "@/components/Footer";

// export default function HomePage() {
//   return (
//     <div className="d-flex flex-column vh-100">
//       <Navbar />

//       <div className="d-flex flex-grow-1 overflow-hidden">
//         <Sidebar />

//         <main className="flex-grow-1 p-3 overflow-auto">
//           <h2 className="fw-bold mb-3">Mapa de Problemas Urbanos</h2>

//           <div className="mb-4">
//             <MapPlaceholder />
//           </div>
//         </main>
//       </div>

//       <Footer />
//     </div>
//   );
// }

import Navbar from "../components/Navbar";
import SidebarFilters from "../components/SidebarFilters";
import MapPlaceholder from "../components/MapPlaceholder";
import ProblemCard from "../components/ProblemCard";

export default function HomePage() {
  const problems = [
    {
      title: "Buraco em via pública",
      address: "Rua Afonso Lopes, Vila Manoel Sátiro",
      image: "https://via.placeholder.com/300x160",
      status: "Pendente",
    },
    {
      title: "Lâmpada queimada no poste",
      address: "Rua Eliezer Paiva, Vila Manoel Sátiro",
      image: "https://via.placeholder.com/300x160",
      status: "Em andamento",
    },
    {
      title: "Acúmulo de lixo",
      address: "Rua Peru, Vila Manoel Sátiro",
      image: "https://via.placeholder.com/300x160",
      status: "Resolvido",
    },
  ];

  return (
    <>
      <Navbar />

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
    </>
  );
}
