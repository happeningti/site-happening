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
      </div>

      <div className="heroWrap">
        <div className="heroInner">
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

          {/* CARD (agora mais embaixo) */}
          <section className="infoCard" aria-label="Chamada para cotação">
            <h3 className="cardTitle">Precisa de cotação agora?</h3>
            <p className="cardText">
              Use nosso formulário e receba confirmação por e-mail. O vendedor responde diretamente para você.
            </p>

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
            rgba(11, 18, 32, 0.78) 0%,
            rgba(11, 18, 32, 0.6) 45%,
            rgba(11, 18, 32, 0.42) 100%
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

        .heroWrap {
          position: relative;
          z-index: 2;
          max-width: 1180px;
          margin: 0 auto;
          padding: 22px 16px 64px;
        }

        .heroInner {
          max-width: 900px;
          padding-top: 10px;
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
          gap: 16px;
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

        /* ✅ DESCE O CARD AQUI */
        .infoCard {
        
          margin-top: 40px; /* <-- aumenta se quiser descer mais (ex: 32px) */
          width: min(820px, 100%);
          border-radius: 16px;
          padding: 18px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
          backdrop-filter: blur(10px);
        }

        .cardTitle {
          margin: 0 0 8px;
          font-weight: 900;
          font-size: 18px;
        }

        .cardText {
          margin: 0 0 14px;
          color: rgba(255, 255, 255, 0.86);
          line-height: 1.5;
        }

        .cardActions {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        /* ✅ BOTÕES DE VERDADE */
        .btnPrimarySmall,
        .btnSoft {
          text-decoration: none; /* tira cara de link */
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
      `}</style>
    </main>
  );
}
