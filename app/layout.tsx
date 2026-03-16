import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Happening Logística",
  description:
    "Empresa especializada em transporte rodoviário, logística e operações para o agronegócio. Estrutura operacional própria com presença em vários estados.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body
        style={{
          background:
            "linear-gradient(180deg,#021b12 0%,#04291b 50%,#031a13 100%)",
          color: "#ffffff",
          minHeight: "100vh",
        }}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}