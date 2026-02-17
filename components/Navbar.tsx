import Link from "next/link";
import Image from "next/image";

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
