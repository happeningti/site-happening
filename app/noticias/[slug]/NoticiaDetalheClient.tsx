"use client";

import { useState } from "react";
import Link from "next/link";
import { noticias } from "../../noticias/noticias-data";

export default function NoticiaDetalheClient({
  noticia,
}: {
  noticia: (typeof noticias)[number];
}) {
  const [imagemAberta, setImagemAberta] = useState<string | null>(null);

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
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "48px 24px 26px 24px",
        }}
      >
        <Link
          href="/noticias"
          style={{
            color: "#4ade80",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "15px",
          }}
        >
          ← Voltar para notícias
        </Link>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "12px",
            marginTop: "22px",
            alignItems: "center",
            color: "#b7c0c8",
            fontSize: "14px",
          }}
        >
          <span
            style={{
              background: "rgba(34,197,94,0.15)",
              color: "#86efac",
              padding: "6px 12px",
              borderRadius: "999px",
              fontWeight: 700,
            }}
          >
            {noticia.categoria}
          </span>
          <span>{noticia.data}</span>
        </div>

        <h1
          style={{
            marginTop: "18px",
            fontSize: "clamp(32px, 4vw, 56px)",
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          {noticia.titulo}
        </h1>

        <p
          style={{
            marginTop: "18px",
            maxWidth: "820px",
            color: "#b7c0c8",
            fontSize: "20px",
            lineHeight: 1.7,
          }}
        >
          {noticia.resumo}
        </p>
      </section>

      <section
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "12px 24px 60px 24px",
        }}
      >
        <div
          style={{
            overflow: "hidden",
            borderRadius: "28px",
            border: "1px solid rgba(255,255,255,0.08)",
            boxShadow: "0 12px 30px rgba(0,0,0,0.35)",
            background: "#16202a",
            maxWidth: "900px",
            cursor: "pointer",
          }}
          onClick={() => setImagemAberta(noticia.imagem)}
          title="Clique para ampliar"
        >
          <img
            src={noticia.imagem}
            alt={noticia.titulo}
            style={{
              width: "100%",
              height: "420px",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>

        <article
          style={{
            marginTop: "36px",
            maxWidth: "900px",
          }}
        >
          {noticia.conteudo.map((paragrafo, index) => (
            <p
              key={index}
              style={{
                color: "#dbe3ea",
                fontSize: "18px",
                lineHeight: 1.9,
                marginBottom: "24px",
              }}
            >
              {paragrafo}
            </p>
          ))}
        </article>

        {noticia.galeria && noticia.galeria.length > 1 && (
          <section style={{ marginTop: "46px", maxWidth: "980px" }}>
            <h2
              style={{
                fontSize: "30px",
                marginBottom: "22px",
                color: "#fff",
              }}
            >
              Galeria
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "18px",
              }}
            >
              {noticia.galeria.map((imagem, index) => (
                <div
                  key={index}
                  onClick={() => setImagemAberta(imagem)}
                  title="Clique para ampliar"
                  style={{
                    cursor: "pointer",
                    overflow: "hidden",
                    borderRadius: "20px",
                    border: "1px solid rgba(255,255,255,0.08)",
                    background: "#16202a",
                    boxShadow: "0 10px 24px rgba(0,0,0,0.28)",
                  }}
                >
                  <img
                    src={imagem}
                    alt={`${noticia.titulo} ${index + 1}`}
                    style={{
                      width: "100%",
                      height: "240px",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </section>

      {imagemAberta && (
        <div
          onClick={() => setImagemAberta(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.88)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
            cursor: "zoom-out",
          }}
        >
          <button
            onClick={() => setImagemAberta(null)}
            style={{
              position: "absolute",
              top: "18px",
              right: "22px",
              background: "rgba(255,255,255,0.12)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: "10px",
              padding: "10px 14px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: 700,
            }}
          >
            Fechar ✕
          </button>

          <img
            src={imagemAberta}
            alt="Imagem ampliada"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "92vw",
              maxHeight: "88vh",
              borderRadius: "14px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
              display: "block",
            }}
          />
        </div>
      )}
    </main>
  );
}