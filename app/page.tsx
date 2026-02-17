// app/page.tsx
"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="hero">
      <div className="heroMedia" aria-hidden="true">
        <video
          className="heroVideo"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero-poster.jpg"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        <div className="heroOverlay" />
        <div className="heroGlow" />
        <div className="heroGrain" />
      </div>

      <div className="heroWrap">
        <div className="heroGrid">
          {/* COLUNA ESQUERDA */}
          <div className="heroLeft">
            <div className="pill">🚚 Logística • Transporte • Agilidade</div>

            <h1 className="heroTitle">
              Transporte com segurança, prazos e atendimento de verdade.
            </h1>

            <p className="heroSub">
              Cotação rápida, equipe comercial dedicada e operação preparada para atender suas necessidades com
              eficiência.
            </p>

            <div className="checks">
              <span className="check">✅ Atendimento rápido</span>
              <span className="check">✅ Operação profissional</span>
              <span className="check">✅ Suporte dedicado</span>
            </div>

            {/* INDICADORES (AJUSTE OS NÚMEROS DEPOIS) */}
            <div className="stats" aria-label="Indicadores da empresa">
              <div className="stat">
                <div className="statNum">+20</div>
                <div className="statLabel">anos de mercado</div>
              </div>
              <div className="stat">
                <div className="statNum">+200</div>
                <div className="statLabel">colaboradores</div>
              </div>
              <div className="stat">
                <div className="statNum">+300</div>
                <div className="statLabel">veículos na frota</div>
              </div>
              <div className="stat">
                <div className="statNum">5</div>
                <div className="statLabel">estados atendidos</div>
              </div>
            </div>

            {/* CARD (mais “chamada” e menos banner) */}
            <section className="infoCard" aria-label="Chamada para cotação">
              <div className="infoCardTop">
                <div>
                  <h3 className="cardTitle">Precisa de cotação agora?</h3>
                  <p className="cardText">
                    Use nosso formulário e receba confirmação por e-mail. O vendedor responde diretamente para você.
                  </p>
                </div>

                <div className="cardBadge" aria-hidden="true">
                  ⚡ Resposta rápida
                </div>
              </div>

              <div className="cardActions">
                <Link href="/cotacao" className="btnPrimarySmall">
                  Abrir cotação
                </Link>

                <Link href="/servicos" className="btnSoft">
                  Ver serviços
                </Link>
              </div>
            </section>
          </div>

          {/* COLUNA DIREITA (preenche o “vazio”) */}
          <aside className="heroRight" aria-label="Destaques e áreas de atuação">
            <div className="sideCard">
              <div className="sideTitle">Atuação</div>
              <div className="sideList">
                <div className="sideItem">
                  <span className="dot" />
                  Transporte Rodoviário
                </div>
                <div className="sideItem">
                  <span className="dot" />
                  Agronegócio
                </div>
                <div className="sideItem">
                  <span className="dot" />
                  Logística Dedicada
                </div>
                <div className="sideItem">
                  <span className="dot" />
                  Crossdocking • Distribuição
                </div>
              </div>

              <div className="sideDivider" />

              <div className="sideMini">
                <div className="miniRow">
                  <span className="miniIcon">🛰️</span>
                  Rastreamento e controle operacional
                </div>
                <div className="miniRow">
                  <span className="miniIcon">🛡️</span>
                  Segurança, conformidade e processos
                </div>
              </div>

              <Link href="/unidades" className="sideLink">
                Ver unidades →
              </Link>
            </div>

            <div className="sideCard soft">
              <div className="sideTitle">Fale com a equipe</div>
              <p className="sideText">
                Atendimento comercial com retorno direto e orientado à sua operação.
              </p>
              <Link href="/contato" className="btnOutline">
                Entrar em contato
              </Link>
            </div>
          </aside>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: calc(100vh - 56px);
          overflow: hidden;
          color: #fff;
          background: #0b1220;
        }

        .heroMedia {
          position: absolute;
          inset: 0;
        }

        .heroVideo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(0.95) contrast(1.05);
          transform: scale(1.02);
        }

        .heroOverlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(11, 18, 32, 0.82) 0%,
            rgba(11, 18, 32, 0.62) 45%,
            rgba(11, 18, 32, 0.45) 100%
          );
        }

        .heroGlow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 18% 22%,
            rgba(11, 122, 75, 0.38),
            rgba(11, 18, 32, 0) 55%
          );
          pointer-events: none;
        }

        /* granulado leve (ajuda a dar “acabamento”) */
        .heroGrain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.12;
          background-image: radial-gradient(rgba(255, 255, 255, 0.25) 1px, transparent 1px);
          background-size: 3px 3px;
          mix-blend-mode: overlay;
        }

        .heroWrap {
          position: relative;
          z-index: 2;
          max-width: 1180px;
          margin: 0 auto;
          padding: 22px 16px 64px;
        }

        .heroGrid {
          display: grid;
          grid-template-columns: 1.35fr 0.65fr;
          gap: 22px;
          align-items: start;
        }

        .heroLeft {
          max-width: 900px;
          padding-top: 10px;
        }

        .heroRight {
          padding-top: 64px; /* desce para alinhar visualmente com o conteúdo */
          display: grid;
          gap: 14px;
        }

        @media (max-width: 980px) {
          .heroGrid {
            grid-template-columns: 1fr;
          }
          .heroRight {
            padding-top: 18px;
          }
        }

        .pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.16);
          color: rgba(255, 255, 255, 0.92);
          font-weight: 800;
          font-size: 13px;
          margin-bottom: 14px;
        }

        .heroTitle {
          margin: 0 0 12px;
          font-weight: 900;
          letter-spacing: -0.6px;
          line-height: 1.1;
          color: #fff;
          font-size: clamp(22px, 2.4vw, 44px);
          white-space: nowrap;
          max-width: 100%;
        }

        @media (max-width: 1100px) {
          .heroTitle {
            white-space: normal;
          }
        }

        .heroSub {
          margin: 0 0 14px;
          color: rgba(255, 255, 255, 0.86);
          font-size: clamp(14px, 1.15vw, 18px);
          line-height: 1.55;
          max-width: 720px;
        }

        .checks {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          margin: 10px 0 0;
          color: rgba(255, 255, 255, 0.86);
          font-weight: 800;
          font-size: 13px;
        }

        .check {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 10px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.18);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        /* STATS */
        .stats {
          margin-top: 18px;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 10px;
          max-width: 820px;
        }

        @media (max-width: 720px) {
          .stats {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        .stat {
          border-radius: 14px;
          padding: 12px 12px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(10px);
        }

        .statNum {
          font-weight: 950;
          font-size: 20px;
          letter-spacing: -0.3px;
          line-height: 1.05;
        }

        .statLabel {
          margin-top: 4px;
          font-size: 12px;
          font-weight: 800;
          color: rgba(255, 255, 255, 0.82);
        }

        /* CARD COTAÇÃO */
        .infoCard {
          margin-top: 18px;
          width: min(820px, 100%);
          border-radius: 16px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.085);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
        }

        .infoCardTop {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        @media (max-width: 520px) {
          .infoCardTop {
            flex-direction: column;
          }
        }

        .cardBadge {
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(11, 122, 75, 0.18);
          border: 1px solid rgba(11, 122, 75, 0.35);
          color: rgba(255, 255, 255, 0.92);
          font-weight: 900;
          font-size: 12px;
        }

        .cardTitle {
          margin: 0 0 6px;
          font-weight: 900;
          font-size: 18px;
        }

        .cardText {
          margin: 0;
          color: rgba(255, 255, 255, 0.86);
          line-height: 1.5;
        }

        .cardActions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-top: 10px;
        }

        .btnPrimarySmall,
        .btnSoft,
        .btnOutline {
          text-decoration: none;
          border-radius: 12px;
          font-weight: 900;
          letter-spacing: 0.2px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 16px;
          transition: transform 0.15s ease, filter 0.15s ease, background 0.15s ease;
          user-select: none;
        }

        .btnPrimarySmall {
          background: #0b7a4b;
          color: #fff;
          box-shadow: 0 14px 30px rgba(11, 122, 75, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .btnPrimarySmall:hover {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }

        .btnSoft {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #fff;
        }
        .btnSoft:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.16);
        }

        /* RIGHT CARDS */
        .sideCard {
          border-radius: 18px;
          padding: 16px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.28);
          backdrop-filter: blur(10px);
        }

        .sideCard.soft {
          background: rgba(255, 255, 255, 0.06);
        }

        .sideTitle {
          font-weight: 950;
          letter-spacing: -0.2px;
          margin-bottom: 10px;
          font-size: 14px;
          color: rgba(255, 255, 255, 0.92);
          text-transform: uppercase;
        }

        .sideList {
          display: grid;
          gap: 10px;
        }

        .sideItem {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.9);
          font-size: 13px;
        }

        .dot {
          width: 9px;
          height: 9px;
          border-radius: 999px;
          background: rgba(11, 122, 75, 0.95);
          box-shadow: 0 0 0 4px rgba(11, 122, 75, 0.16);
          flex: 0 0 auto;
        }

        .sideDivider {
          height: 1px;
          background: rgba(255, 255, 255, 0.12);
          margin: 14px 0;
        }

        .sideMini {
          display: grid;
          gap: 10px;
        }

        .miniRow {
          display: flex;
          gap: 10px;
          color: rgba(255, 255, 255, 0.86);
          font-weight: 800;
          font-size: 13px;
          line-height: 1.35;
        }

        .miniIcon {
          width: 22px;
          height: 22px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          background: rgba(11, 122, 75, 0.18);
          border: 1px solid rgba(11, 122, 75, 0.32);
          flex: 0 0 auto;
        }

        .sideLink {
          display: inline-flex;
          margin-top: 12px;
          font-weight: 950;
          color: rgba(255, 255, 255, 0.92);
          text-decoration: none;
          padding: 10px 12px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
        }
        .sideLink:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: translateY(-1px);
        }

        .sideText {
          margin: 0 0 12px;
          color: rgba(255, 255, 255, 0.86);
          line-height: 1.5;
          font-weight: 800;
          font-size: 13px;
        }

        .btnOutline {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: #fff;
        }
        .btnOutline:hover {
          transform: translateY(-1px);
          background: rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </main>
  );
}
