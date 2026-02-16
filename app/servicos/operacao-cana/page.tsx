"use client";

import Link from "next/link";
import { useState } from "react";

export default function OperacaoCanaPage() {
  const fotos = [
    "/servicos/cana-01.jpg",
    "/servicos/cana-02.jpg",
    "/servicos/cana-03.jpg",
    "/servicos/cana-04.jpg",
  ];

  const [fotoAberta, setFotoAberta] = useState<string | null>(null);

  return (
    <main className="operacaoCana">
      {/* HERO */}
      <section className="operacaoCanaHero">
        <div className="operacaoCanaHeroBg" />
        <div className="operacaoCanaHeroContent">
          <div className="badge">Agronegócio</div>

          <h1>Operação Cana-de-açúcar</h1>
          <p>
            Estrutura dedicada ao transporte de cana, com foco em eficiência,
            segurança e cumprimento rigoroso das janelas operacionais.
          </p>

          <div className="operacaoCanaHeroActions">
            <Link href="/servicos#agronegocio" className="operacaoCanaBtnSec">
              Voltar aos Serviços
            </Link>

            <Link href="/cotacao" className="operacaoCanaBtn">
              Solicitar Cotação
            </Link>
          </div>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="operacaoCanaWrap">
        <div className="operacaoCanaContainer">
          <div className="operacaoCanaGrid">
            {/* TEXTO */}
            <div className="operacaoCanaText">
              <h2>Como atuamos</h2>
              <p>
                Trabalhamos com planejamento operacional e acompanhamento para
                garantir fluidez na operação, preservando prazos e integridade da
                carga.
              </p>

              <ul className="operacaoCanaBullets">
                <li>Atuação alinhada à rotina da usina e frentes de corte</li>
                <li>Equipe operacional dedicada e suporte durante a jornada</li>
                <li>Controle e organização para reduzir paradas e retrabalho</li>
              </ul>
            </div>

            {/* VÍDEO */}
            <div className="operacaoCanaMedia">
              <div className="operacaoCanaCard">
                <div className="operacaoCanaCardTitle">Vídeo da Operação</div>

                <video
                  className="operacaoCanaVideo"
                  controls
                  playsInline
                  preload="metadata"
                >
                  <source src="/videos/cana.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>

          {/* GALERIA */}
          <div className="operacaoCanaGaleria">
            <h2>Fotos da Operação</h2>

            <div className="operacaoCanaGaleriaGrid">
              {fotos.map((src) => (
                <img
                  key={src}
                  src={src}
                  alt="Operação de Cana"
                  style={{ cursor: "zoom-in" }}
                  onClick={() => setFotoAberta(src)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {fotoAberta && (
        <div
          onClick={() => setFotoAberta(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            padding: "20px",
          }}
        >
          <img
            src={fotoAberta}
            alt="Foto ampliada"
            style={{
              maxWidth: "100%",
              maxHeight: "90vh",
              borderRadius: "16px",
            }}
          />
        </div>
      )}
    </main>
  );
}
