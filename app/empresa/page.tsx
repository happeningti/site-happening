import Image from "next/image";

export default function EmpresaPage() {
  return (
    <main className="empresa">

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
          <h1>Happening Logística</h1>
          <p>
            Estrutura, escala e excelência operacional desde 1992.
            Uma operação sólida, organizada e preparada para atender
            com eficiência e segurança.
          </p>

          <div className="empresaHeroActions">
            <a className="btn btnPrimary" href="#estrutura">Conheça nossa estrutura</a>
            <a className="btn" href="/contato">Fale com nossa equipe</a>
          </div>

        </div>
      </section>

      {/* QUEM SOMOS */}
      <section className="empresaSection">
        <div className="empresaContainer">
          <h2>Uma empresa estruturada para crescer com consistência</h2>
          <p>
            Fundada em 1992, a Happening Logística consolidou-se como
            uma empresa organizada, com processos padronizados,
            controle operacional e capacidade logística em escala.
          </p>
          <p>
            Investimos continuamente em infraestrutura, frota,
            tecnologia e pessoas para oferecer soluções logísticas
            seguras, eficientes e previsíveis.
          </p>
        </div>
      </section>

      {/* NÚMEROS */}
      <section className="empresaSection empresaStats">
        <div className="empresaContainer">
          <h2>Estrutura em números</h2>

          <div className="empresaGrid">
            <div className="empresaCard">
              <strong>+11.000 m²</strong>
              <span>Área total de terminais</span>
            </div>
            <div className="empresaCard">
              <strong>4.000 m²</strong>
              <span>Área construída</span>
            </div>
            <div className="empresaCard">
              <strong>+200</strong>
              <span>Veículos próprios, agregados e terceiros</span>
            </div>
            <div className="empresaCard">
              <strong>100</strong>
              <span>Cidades atendidas diariamente</span>
            </div>
            <div className="empresaCard">
              <strong>20</strong>
              <span>Rotas operacionais</span>
            </div>
          </div>
        </div>
      </section>

      {/* ESTRUTURA */}
      <section id="estrutura" className="empresaSection">
        <div className="empresaContainer empresaSplit">
          <div>
            <h2>Infraestrutura preparada para alta performance</h2>
            <p>
              Nossa estrutura física foi planejada para garantir
              agilidade, segurança e controle logístico.
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
      <section className="empresaSection">
        <div className="empresaContainer empresaSplit reverse">
          <div>
            <h2>Frota com padronização e escala</h2>
            <p>
              Operamos com frota própria e agregada, permitindo
              flexibilidade operacional e atendimento sob demanda
              com segurança e confiabilidade.
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
