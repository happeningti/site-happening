
import React from "react";

type Noticia = {
  id: number;
  slug: string;
  categoria: string;
  titulo: string;
  data: string;
  resumo: string;
  imagem: string;
};

const NOTICIAS: Noticia[] = [
  {
    id: 1,
    slug: "treinamento-lideres-santa-juliana-mg",
    categoria: "Treinamento",
    titulo: "Treinamento de Líderes é realizado na filial de Santa Juliana/MG",
    data: "15 de março de 2026",
    resumo:
      "A Happening realizou um treinamento voltado ao desenvolvimento de líderes na filial de Santa Juliana/MG, reforçando práticas de liderança e alinhamento das equipes.",
    imagem: "/noticias/treinamento-lideres-2026-1.jpg",
  },
  {
    id: 2,
    slug: "novo-site-happening-2026",
    categoria: "Empresa",
    titulo: "Happening lança seu novo site institucional",
    data: "12 de março de 2026",
    resumo:
      "A Happening colocou no ar seu novo site institucional com visual mais moderno e navegação mais clara para clientes e parceiros.",
    imagem: "/noticias/divulgacao-novo-site-happening.jpg",
  },
];

export default function NoticiasPreview() {
  return (
    <div style={{ background: "#0f1720", minHeight: "100vh", color: "white", fontFamily: "Arial, sans-serif", padding: "40px" }}>
      <h1 style={{ fontSize: "42px", marginBottom: "10px" }}>Notícias Happening</h1>
      <p style={{ color: "#9ca3af", marginBottom: "40px" }}>
        Prévia da página de notícias com layout de cards.
      </p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px,1fr))", gap: "30px" }}>
        {NOTICIAS.map((n) => (
          <div key={n.id} style={{ background: "#1f2933", borderRadius: "14px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.4)" }}>
            <img src={n.imagem} alt={n.titulo} style={{ width: "100%", height: "220px", objectFit: "cover" }} />

            <div style={{ padding: "20px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "10px" }}>
                <span style={{ background: "#22c55e", color: "black", padding: "4px 10px", borderRadius: "20px" }}>
                  {n.categoria}
                </span>
                <span style={{ color: "#9ca3af" }}>{n.data}</span>
              </div>

              <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>{n.titulo}</h3>

              <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: "1.5" }}>
                {n.resumo}
              </p>

              <div style={{ marginTop: "18px", color: "#4ade80", fontWeight: "bold" }}>
                Ler notícia completa →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
