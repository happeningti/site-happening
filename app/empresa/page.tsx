//app/empresa/page.tsx
import Image from "next/image";

export default function EmpresaPage() {
  return (
    <main
  className="empresa"
  style={{
    background:
      "linear-gradient(180deg,#021b12 0%,#04291b 50%,#031a13 100%)",
    color: "#ffffff",
    minHeight: "100vh"
  }}
>
      {/* HERO */}
      <section className="empresaHero">
        <Image
          src="/aerea.jpg"
          alt="Happening Logística - Vista aérea"
          fill
          priority
          className="empresaHeroImg"
        />

        <div className="empresaHeroOverlay" />

        <div className="empresaHeroContent">
          <h1 style={{ color: "#ffffff" }}>Happening Logística</h1>
          <p style={{ color: "rgba(255,255,255,0.92)" }}>
            Estrutura, escala e excelência operacional desde 1992. Uma operação
            sólida, organizada e preparada para atender com eficiência e
            segurança.
          </p>

          <div className="empresaHeroActions">
            <a className="btn btnPrimary" href="#estrutura">
              Conheça nossa estrutura
            </a>
            <a className="btn" href="/contato">
              Fale com nossa equipe
            </a>
          </div>
        </div>
      </section>

      {/* QUEM SOMOS */}
      <section
        className="empresaSection"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <div className="empresaContainer">
          <h2 style={{ color: "#ffffff" }}>
            Uma empresa estruturada para crescer com consistência
          </h2>
          <p style={{ color: "rgba(255,255,255,0.82)" }}>
            Fundada em 1992, a Happening Logística consolidou-se como uma
            empresa organizada, com processos padronizados, controle operacional
            e capacidade logística em escala.
          </p>
          <p style={{ color: "rgba(255,255,255,0.82)" }}>
            Investimos continuamente em infraestrutura, frota, tecnologia e
            pessoas para oferecer soluções logísticas seguras, eficientes e
            previsíveis.
          </p>
        </div>
      </section>

      {/* NÚMEROS */}
      <section
        className="empresaSection empresaStats"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <div className="empresaContainer">
          <h2 style={{ color: "#ffffff" }}>Estrutura em números</h2>

          <div className="empresaGrid">
            <div
              className="empresaCard"
              style={{
                background: "#ffffff",
                color: "#0f172a",
                boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
              }}
            >
              <strong style={{ color: "#0f172a" }}>+11.000 m²</strong>
              <span style={{ color: "#475569" }}>Área total de terminais</span>
            </div>

            <div
              className="empresaCard"
              style={{
                background: "#ffffff",
                color: "#0f172a",
                boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
              }}
            >
              <strong style={{ color: "#0f172a" }}>4.000 m²</strong>
              <span style={{ color: "#475569" }}>Área construída</span>
            </div>

            <div
              className="empresaCard"
              style={{
                background: "#ffffff",
                color: "#0f172a",
                boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
              }}
            >
              <strong style={{ color: "#0f172a" }}>+200</strong>
              <span style={{ color: "#475569" }}>
                Veículos próprios, agregados e terceiros
              </span>
            </div>

            <div
              className="empresaCard"
              style={{
                background: "#ffffff",
                color: "#0f172a",
                boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
              }}
            >
              <strong style={{ color: "#0f172a" }}>100</strong>
              <span style={{ color: "#475569" }}>
                Cidades atendidas diariamente
              </span>
            </div>

            <div
              className="empresaCard"
              style={{
                background: "#ffffff",
                color: "#0f172a",
                boxShadow: "0 10px 24px rgba(0,0,0,0.22)",
              }}
            >
              <strong style={{ color: "#0f172a" }}>20</strong>
              <span style={{ color: "#475569" }}>Rotas operacionais</span>
            </div>
          </div>
        </div>
      </section>

      {/* ESTRUTURA */}
      <section
        id="estrutura"
        className="empresaSection"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <div className="empresaContainer empresaSplit">
          <div>
            <h2 style={{ color: "#ffffff" }}>
              Infraestrutura preparada para alta performance
            </h2>
            <p style={{ color: "rgba(255,255,255,0.82)" }}>
              Nossa estrutura física foi planejada para garantir agilidade,
              segurança e controle logístico.
            </p>
          </div>

          <div className="empresaMedia">
            <Image
              src="/terminal.jpg"
              alt="Terminal Happening Logística"
              width={700}
              height={450}
              className="empresaImg"
            />
          </div>
        </div>
      </section>

      {/* FROTA */}
      <section
        className="empresaSection"
        style={{ background: "rgba(255,255,255,0.02)" }}
      >
        <div className="empresaContainer empresaSplit reverse">
          <div>
            <h2 style={{ color: "#ffffff" }}>
              Frota com padronização e escala
            </h2>
            <p style={{ color: "rgba(255,255,255,0.82)" }}>
              Operamos com frota própria e agregada, permitindo flexibilidade
              operacional e atendimento sob demanda com segurança e
              confiabilidade.
            </p>
          </div>

          <div className="empresaMedia">
            <Image
              src="/frota.jpg"
              alt="Frota Happening Logística"
              width={700}
              height={450}
              className="empresaImg"
            />
          </div>
        </div>
      </section>
    </main>
  );
}