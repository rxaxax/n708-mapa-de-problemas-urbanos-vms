import 'bootstrap/dist/css/bootstrap.min.css'; 

export const metadata = {
  title: "Mapa de Problemas Urbanos – Vila Manoel Sátiro",
  description: "Aplicação web para reportar e visualizar problemas urbanos no bairro Vila Manoel Sátiro.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
