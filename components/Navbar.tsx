import Link from "next/link";
import Image from "next/image";

const linkStyle: React.CSSProperties = {
  color: "#1f2937",
  textDecoration: "none",
  fontWeight: 600,
  fontSize: "16px",
};

export default function Navbar() {
  return (
    <header
      style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #ddd",
        padding: "12px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* LOGO */}
      <Link href="/" style={{ display: "flex", alignItems: "center" }}>
        <Image
          src="/logo-happening.png"
          alt="Happening Logística"
          width={200}
          height={55}
          priority
          style={{ height: "42px", width: "auto" }}
        />
      </Link>

      {/* MENU */}
      <nav style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <Link href="/" style={linkStyle}>Início</Link>

        <Link href="/empresa" style={linkStyle}>A Empresa</Link>

        <Link href="/servicos" style={linkStyle}>Serviços</Link>

        <Link href="/unidades" style={linkStyle}>Unidades</Link>        

        <Link href="/cotacao" style={linkStyle}>Cotação</Link>

        <Link href="/contato" style={linkStyle}>Contato</Link>

        <Link href="/transparencia" style={linkStyle}>Transparência</Link>

        <Link href="/noticias" style={linkStyle}>Notícias</Link>

        <Link href="/trabalhe-conosco" style={linkStyle}>Trabalhe Conosco</Link>
      </nav>
    </header>
  );
}