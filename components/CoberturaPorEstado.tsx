"use client";

import { useEffect, useRef } from "react";

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

const ESTADOS = [
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

export default function CoberturaPorEstado() {
  const geoRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

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
    svgRef.current = svg;

    const blobs = Array.from(geo.querySelectorAll<HTMLElement>(".state-blob"));
    const positions = blobs.map((b) => {
      const l = parseFloat(b.style.left) / 100;
      const t = parseFloat(b.style.top) / 100;
      return {
        x: l * geo.clientWidth + 32,
        y: t * geo.clientHeight + 32,
      };
    });

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
      {/* Header */}
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
          }}
        />

        {/* Blobs dos estados */}
        {ESTADOS.map((e) => (
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
            {/* Anel com pulso */}
            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>
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

            {/* Label */}
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#475569", letterSpacing: "0.04em" }}>
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
        {ESTADOS.slice().reverse().map((e) => (
          <div key={e.uf} className="uniState">
            <div className="uniStateUF">{e.uf}</div>
            <div className="uniStateMeta">
              <div className="uniStateLabel">{e.label}</div>
              <div className="uniStateQtd">{e.qtd} unidade(s)</div>
            </div>
          </div>
        ))}
      </div>

      {/* Keyframe da animação — injeta uma vez no head */}
      <style>{`
        @keyframes bpulse {
          0%   { transform: scale(0.8); opacity: 0.5; }
          70%  { transform: scale(1.8); opacity: 0;   }
          100% { transform: scale(1.8); opacity: 0;   }
        }
      `}</style>
    </div>
  );
}
