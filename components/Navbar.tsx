import Link from "next/link";

export default function Navbar() {
  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #ddd",
        padding: "15px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ fontWeight: "bold", fontSize: "20px", color: "#1E6F3D" }}>
        HAPPENING
      </div>

      <nav style={{ display: "flex", gap: "20px" }}>
        <Link href="/">Início</Link>
        <Link href="/empresa">A Empresa</Link>
        <Link href="/servicos">Serviços</Link>
        <Link href="/unidades">Unidades</Link>
        <Link href="/cotacao">Cotação</Link>
        <Link href="/contato">Contato</Link>
        <Link href="/transparencia">Transparência</Link>
        <Link href="/trabalhe-conosco">Trabalhe Conosco</Link>

      </nav>
    </header>
  );
}
