// app/unidades/page.tsx
"use client";

import { useEffect, useRef } from "react";

type Unidade = {
  nome: string;
  cidade: string;
  uf: "SP" | "MG" | "GO";
  tipo: "Matriz" | "Filial" | "Base Operacional";
  resumo: string;
  recursos: Array<"Escritório" | "Frota" | "Oficina" | "Contrato">;
};

const UNIDADES: Unidade[] = [
  {
    nome: "Matriz",
    cidade: "Sertãozinho",
    uf: "SP",
    tipo: "Matriz",
    resumo:
      "Centro administrativo e de gestão operacional. Planejamento, controle e suporte às operações regionais.",
    recursos: ["Escritório", "Frota", "Contrato"],
  },
  {
    nome: "Filial São Paulo",
    cidade: "São Paulo",
    uf: "SP",
    tipo: "Filial",
    resumo:
      "Atendimento a operações rodoviárias e demandas logísticas regionais, com integração a clientes industriais e comerciais.",
    recursos: ["Escritório", "Contrato"],
  },
  {
    nome: "Filial Aroeira",
    cidade: "Tupaciguara",
    uf: "MG",
    tipo: "Filial",
    resumo:
      "Filial fixa próxima às operações atendidas, com estrutura local, frota dedicada e suporte técnico para continuidade operacional.",
    recursos: ["Escritório", "Frota", "Oficina", "Contrato"],
  },
  {
    nome: "Filial Santa Juliana",
    cidade: "Santa Juliana",
    uf: "MG",
    tipo: "Filial",
    resumo:
      "Estrutura operacional instalada estrategicamente na região, com equipe fixa, manutenção local e atendimento contínuo.",
    recursos: ["Escritório", "Frota", "Oficina", "Contrato"],
  },
  {
    nome: "Filial Tropical",
    cidade: "Porteirão",
    uf: "GO",
    tipo: "Filial",
    resumo:
      "Presença estratégica no Centro-Oeste, com estrutura fixa, suporte técnico próprio e frota preparada para atendimento regional.",
    recursos: ["Escritório", "Frota", "Oficina", "Contrato"],
  },
];

const ESTADOS_GEO = [
  {
    uf: "GO",
    label: "Goiás",
    cidades: "Porteirão",
    qtd: 1,
    left: "30%",
    top: "18%",
    bg: "#1e293b",
    color: "#94a3b8",
    pulse: "#334155",
    size: 64,
    pulseSize: 72,
  },
  {
    uf: "MG",
    label: "Minas Gerais",
    cidades: "Tupaciguara · Santa Juliana",
    qtd: 2,
    left: "54%",
    top: "28%",
    bg: "#16653a",
    color: "#4ade80",
    pulse: "#22c55e",
    size: 72,
    pulseSize: 80,
  },
  {
    uf: "SP",
    label: "São Paulo",
    cidades: "Sertãozinho · SP Capital",
    qtd: 2,
    left: "42%",
    top: "52%",
    bg: "#0b7a4b",
    color: "#ffffff",
    pulse: "#0b7a4b",
    size: 80,
    pulseSize: 88,
  },
];

function IconPin() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2c3.86 0 7 3.14 7 7c0 5.25-7 13-7 13S5 14.25 5 9c0-3.86 3.14-7 7-7m0 9.5A2.5 2.5 0 1 0 12 6a2.5 2.5 0 0 0 0 5.5Z"
      />
    </svg>
  );
}

function IconBuilding() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 22V2h14v20H4m2-2h10V4H6v16m12 2V10h2v12h-2M8 6h2v2H8V6m4 0h2v2h-2V6M8 10h2v2H8v-2m4 0h2v2h-2v-2M8 14h2v2H8v-2m4 0h2v2h-2v-2Z"
      />
    </svg>
  );
}

function IconWrench() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21 7.5a6.5 6.5 0 0 1-8.94 6.06L6.12 19.5a2.12 2.12 0 0 1-3-3l5.94-5.94A6.5 6.5 0 0 1 16.5 3l-3 3l2.5 2.5l3-3c1 1 2 2.5 2 5Z"
      />
    </svg>
  );
}

function IconTruck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 6h12v9h2.5l1.5 2v4h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3v-2h2.1A2 2 0 0 1 9 19h4a2 2 0 0 1 3.9 0H19v-1.5L17.7 15H15V6H3m5 13a1 1 0 1 0 0 2a1 1 0 0 0 0-2m10 0a1 1 0 1 0 0 2a1 1 0 0 0 0-2Z"
      />
    </svg>
  );
}

function IconHandshake() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.5 14.5a1.5 1.5 0 0 1-2.12 0l-4.12-4.12a2 2 0 0 0-2.83 0l-.7.7l1.06 1.06a1 1 0 0 1 0 1.41l-2.83 2.83a2 2 0 0 1-2.83 0L2 16.17l4.17-4.17a3 3 0 0 1 4.24 0l.35.35l.7-.7a4 4 0 0 1 5.66 0l4.12 4.12a1.5 1.5 0 0 1 0 2.12l-.74.61Z"
      />
    </svg>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span
      className="uniChip"
      style={{
        background: "rgba(15,23,42,0.08)",
        color: "#0f172a",
      }}
    >
      {label}
    </span>
  );
}

function CoberturaPorEstado() {
  const geoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const geo = geoRef.current;
    if (!geo) return;

    const existing = geo.querySelector("svg.connector-svg");
    if (existing) existing.remove();

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("connector-svg");
    svg.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;";
    geo.insertBefore(svg, geo.children[1]);

    const blobs = Array.from(
      geo.querySelectorAll<HTMLElement>(".state-blob")
    );
    const positions = blobs.map((b) => ({
      x: (parseFloat(b.style.left) / 100) * geo.clientWidth + 32,
      y: (parseFloat(b.style.top) / 100) * geo.clientHeight + 32,
    }));

    const pairs: [number, number][] = [
      [0, 1],
      [0, 2],
      [1, 2],
    ];
    pairs.forEach(([a, b]) => {
      const line = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "line"
      );
      line.setAttribute("x1", String(positions[a].x));
      line.setAttribute("y1", String(positions[a].y));
      line.setAttribute("x2", String(positions[b].x));
      line.setAttribute("y2", String(positions[b].y));
      line.setAttribute("stroke", "rgba(11,122,75,0.18)");
      line.setAttribute("stroke-width", "1");
      line.setAttribute("stroke-dasharray", "4 4");
      svg.appendChild(line);
    });

    return () => {
      svg.remove();
    };
  }, []);

  return (
    <div className="uniMapCard">
      <style>{`
        @keyframes bpulse {
          0%   { transform: scale(0.8); opacity: 0.5; }
          70%  { transform: scale(1.8); opacity: 0;   }
          100% { transform: scale(1.8); opacity: 0;   }
        }
      `}</style>

      <div className="uniMapHeader">
        <div className="uniMapTitle">
          <span className="uniMapIcon">
            <IconPin />
          </span>
          Cobertura por Estado
        </div>
        <div className="uniMapLegend">
          <span className="uniDot sp" /> SP
          <span className="uniDot mg" /> MG
          <span className="uniDot go" /> GO
        </div>
      </div>

      {/* Área geográfica */}
      <div
        ref={geoRef}
        style={{
          background: "#f4f7fb",
          borderRadius: 16,
          border: "1px solid rgba(11,18,32,0.07)",
          padding: "24px 20px 20px",
          position: "relative",
          minHeight: 240,
          overflow: "hidden",
        }}
      >
        {/* Grade de fundo */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(11,18,32,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(11,18,32,0.04) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            borderRadius: 16,
            zIndex: 0,
          }}
        />

        {/* Blobs dos estados */}
        {ESTADOS_GEO.map((e) => (
          <div
            key={e.uf}
            className="state-blob"
            style={{
              position: "absolute",
              left: e.left,
              top: e.top,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  width: e.pulseSize,
                  height: e.pulseSize,
                  borderRadius: "50%",
                  background: e.pulse,
                  animation: "bpulse 2.6s ease-out infinite",
                  opacity: 0,
                }}
              />
              <div
                style={{
                  width: e.size,
                  height: e.size,
                  borderRadius: "50%",
                  background: e.bg,
                  color: e.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 900,
                  fontSize: 13,
                  letterSpacing: "0.02em",
                  position: "relative",
                  zIndex: 1,
                  border: "2px solid rgba(255,255,255,0.4)",
                }}
              >
                {e.uf}
              </div>
            </div>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#475569",
                  letterSpacing: "0.04em",
                }}
              >
                {e.label}
              </div>
              <div style={{ fontSize: 10, fontWeight: 600, color: "#94a3b8" }}>
                {e.cidades}
              </div>
            </div>
          </div>
        ))}

        {/* Rodapé discreto */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            right: 16,
            fontSize: 11,
            fontWeight: 800,
            color: "#94a3b8",
            letterSpacing: "0.03em",
          }}
        >
          5 unidades · 3 estados · Centro-Sul do Brasil
        </div>
      </div>

      {/* Linha de estados */}
      <div className="uniStateRow">
        {ESTADOS_GEO.slice()
          .reverse()
          .map((e) => (
            <div key={e.uf} className="uniState">
              <div className="uniStateUF">{e.uf}</div>
              <div className="uniStateMeta">
                <div className="uniStateLabel">{e.label}</div>
                <div className="uniStateQtd">{e.qtd} unidade(s)</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default function UnidadesPage() {
  return (
    <main
      className="unidades"
      style={{
        background:
          "linear-gradient(180deg,#021b12 0%,#04291b 50%,#031a13 100%)",
        color: "#ffffff",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <section className="uniHero">
        <div className="uniHeroBg" />
        <div className="uniHeroContent">
          <div className="badge">Unidades</div>
          <h1 style={{ color: "#ffffff" }}>
            Presença estratégica com estrutura operacional própria
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)" }}>
            Unidades fixas em regiões-chave, com bases operacionais,
            escritórios e suporte técnico para garantir continuidade e
            eficiência nas operações rodoviárias e agrícolas.
          </p>
        </div>
      </section>

      {/* COBERTURA + RESUMO */}
      <section className="uniTop">
        <div className="uniContainer">
          <div className="uniTopGrid">
            <CoberturaPorEstado />

            <div className="uniInfoCard">
              <div className="uniInfoTitle">Estrutura que garante continuidade</div>
              <p className="uniInfoText">
                Nossas unidades foram posicionadas para oferecer controle
                operacional, resposta rápida e suporte contínuo. Onde há
                operação, existe estrutura — com presença física, equipe e
                recursos essenciais.
              </p>

              <div className="uniInfoGrid">
                <div className="uniInfoItem">
                  <span className="uniInfoIcon">
                    <IconBuilding />
                  </span>
                  <div>
                    <div className="uniInfoLabel">Escritórios</div>
                    <div className="uniInfoDesc">
                      Suporte administrativo local
                    </div>
                  </div>
                </div>

                <div className="uniInfoItem">
                  <span className="uniInfoIcon">
                    <IconTruck />
                  </span>
                  <div>
                    <div className="uniInfoLabel">Frota</div>
                    <div className="uniInfoDesc">
                      Capacidade operacional dedicada
                    </div>
                  </div>
                </div>

                <div className="uniInfoItem">
                  <span className="uniInfoIcon">
                    <IconWrench />
                  </span>
                  <div>
                    <div className="uniInfoLabel">Oficinas</div>
                    <div className="uniInfoDesc">
                      Manutenção local e agilidade
                    </div>
                  </div>
                </div>

                <div className="uniInfoItem">
                  <span className="uniInfoIcon">
                    <IconHandshake />
                  </span>
                  <div>
                    <div className="uniInfoLabel">Contratos fixos</div>
                    <div className="uniInfoDesc">
                      Operações contínuas e previsíveis
                    </div>
                  </div>
                </div>
              </div>

              <div className="uniNote">
                * As bases operacionais são fixas e posicionadas próximas aos
                pontos atendidos, garantindo suporte técnico e continuidade da
                operação.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CARDS */}
      <section className="uniCardsSection">
        <div className="uniContainer">
          <h2 className="uniTitle" style={{ color: "#ffffff" }}>
            Nossas Unidades
          </h2>
          <p className="uniDesc" style={{ color: "rgba(255,255,255,0.82)" }}>
            Estrutura distribuída para atender operações rodoviárias e demandas
            do agronegócio com eficiência e controle.
          </p>

          <div className="uniGrid">
            {UNIDADES.map((u) => (
              <article
                key={`${u.nome}-${u.cidade}`}
                className="uniCard"
                style={{
                  background: "#ffffff",
                  color: "#0f172a",
                  boxShadow: "0 12px 28px rgba(0,0,0,0.22)",
                }}
              >
                <div className="uniCardTop">
                  <div className="uniType" style={{ color: "#0f172a" }}>
                    {u.tipo}
                  </div>
                  <div className={`uniUFTag ${u.uf.toLowerCase()}`}>{u.uf}</div>
                </div>

                <div className="uniCardTitle" style={{ color: "#0f172a" }}>
                  {u.nome}
                </div>

                <div className="uniCardCity" style={{ color: "#166534" }}>
                  <span className="uniCardPin">
                    <IconPin />
                  </span>
                  {u.cidade} / {u.uf}
                </div>

                <p className="uniCardText" style={{ color: "#475569" }}>
                  {u.resumo}
                </p>

                <div className="uniChips">
                  {u.recursos.includes("Escritório") && (
                    <Chip label="Escritório" />
                  )}
                  {u.recursos.includes("Frota") && <Chip label="Frota" />}
                  {u.recursos.includes("Oficina") && (
                    <Chip label="Oficina" />
                  )}
                  {u.recursos.includes("Contrato") && (
                    <Chip label="Contrato" />
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
