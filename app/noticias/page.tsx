import Link from "next/link";
import { noticias } from "./noticias-data";

function cardStyle() {
  return {
    background: "#1e2936",
    borderRadius: "22px",
    overflow: "hidden" as const,
    boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
    border: "1px solid rgba(255,255,255,0.08)",
  };
}

function CardNoticia({
  noticia,
}: {
  noticia: (typeof noticias)[number];
}) {
  return (
    <article style={cardStyle()}>
      <img
        src={noticia.imagem}
        alt={noticia.titulo}
        style={{
          width: "100%",
          height: "240px",
          objectFit: "cover",
          display: "block",
        }}
      />

      <div style={{ padding: "22px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            marginBottom: "14px",
            fontSize: "14px",
            color: "#a7b0b9",
          }}
        >
          <span
            style={{
              background: "#22c55e",
              color: "#06130a",
              padding: "6px 12px",
              borderRadius: "999px",
              fontWeight: 700,
              fontSize: "13px",
            }}
          >
            {noticia.categoria}
          </span>

          <span>{noticia.data}</span>
        </div>

        <h3
          style={{
            fontSize: "22px",
            lineHeight: 1.3,
            color: "#ffffff",
            margin: "0 0 12px 0",
          }}
        >
          {noticia.titulo}
        </h3>

        <p
          style={{
            color: "#b7c0c8",
            fontSize: "16px",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          {noticia.resumo}
        </p>

        <Link
          href={`/noticias/${noticia.slug}`}
          style={{
            display: "inline-block",
            marginTop: "18px",
            color: "#4ade80",
            fontWeight: 700,
            fontSize: "16px",
            textDecoration: "none",
          }}
        >
          Ler notícia completa →
        </Link>
      </div>
    </article>
  );
}

export default function NoticiasPage() {
  return (
    <main
  style={{
    background:
      "linear-gradient(180deg,#021b12 0%,#04291b 50%,#031a13 100%)",
    color: "#ffffff",
    minHeight: "100vh"
  }}
>
      <section
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "56px 24px 24px 24px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 16px",
            borderRadius: "999px",
            background: "rgba(34,197,94,0.12)",
            border: "1px solid rgba(74,222,128,0.22)",
            color: "#86efac",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          Notícias Happening
        </div>

        <h1
          style={{
            fontSize: "clamp(38px, 5vw, 72px)",
            lineHeight: 1.05,
            margin: "22px 0 16px 0",
            maxWidth: "900px",
          }}
        >
          Notícias, treinamentos e workshops da Happening
        </h1>

        <p
          style={{
            maxWidth: "760px",
            color: "#b7c0c8",
            fontSize: "20px",
            lineHeight: 1.6,
            margin: 0,
          }}
        >
          Acompanhe ações da empresa, treinamentos, eventos e novidades
          importantes da Happening Logística.
        </p>
      </section>

      <section
        style={{
          maxWidth: "1300px",
          margin: "0 auto",
          padding: "20px 24px 60px 24px",
        }}
      >
        <div style={{ marginBottom: "28px" }}>
          <div
            style={{
              color: "#86efac",
              fontSize: "13px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            Últimas publicações
          </div>

          <h2
            style={{
              fontSize: "38px",
              margin: 0,
              color: "#fff",
            }}
          >
            Notícias em destaque
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "28px",
          }}
        >
          {noticias.map((noticia) => (
            <CardNoticia key={noticia.id} noticia={noticia} />
          ))}
        </div>
      </section>
    </main>
  );
}