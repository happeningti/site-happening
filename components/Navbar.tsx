import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="navbar">
      <Link href="/" className="logo">
        <Image
          src="/logo-happening.png"
          alt="Happening Logística"
          width={200}
          height={55}
          priority
          style={{ height: "42px", width: "auto" }}
        />
      </Link>

      <nav className="menu">
        <Link href="/">Início</Link>
        <Link href="/empresa">A Empresa</Link>
        <Link href="/servicos">Serviços</Link>
        <Link href="/unidades">Unidades</Link>
        <Link href="/cotacao">Cotação</Link>
        <Link href="/contato">Contato</Link>
        <Link href="/transparencia">Transparência</Link>
        <Link href="/noticias">Notícias</Link>
        <Link href="/trabalhe-conosco">Trabalhe Conosco</Link>
      </nav>
    </header>
  );
}