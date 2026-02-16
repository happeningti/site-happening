// app/servicos/page.tsx
import Link from "next/link";

const SERVICOS = [
  {
    id: "agronegocio",
    titulo: "Agronegócio",
    subtitulo: "Atendimento a operações do setor com foco em performance.",
    texto:
      "Apoio logístico para operações do agronegócio, com organização, capacidade operacional e foco em eficiência e segurança.",
    bullets: [
      "Operação alinhada a janelas e demandas",
      "Organização e controle operacional",
      "Atendimento e suporte durante a operação",
    ],
    img: "/servicos/agronegocio-2026.jpg",
    reverse: false,
  },
  {
    id: "crossdocking",
    titulo: "Crossdocking | Distribuição",
    subtitulo: "Agilidade e precisão na reposição e entrega.",
    texto:
      "Operação focada em reduzir tempo de armazenagem e acelerar o fluxo de mercadorias, com rastreabilidade e controle do processo.",
    bullets: [
      "Recebimento, separação e expedição com SLA",
      "Distribuição regional e metropolitana",
      "Controle operacional e padronização",
    ],
    img: "/servicos/crossdocking.jpg",
    reverse: true,
  },
  {
    id: "supply-chain",
    titulo: "Supply Chain",
    subtitulo: "Gestão integrada de suprimentos e entregas.",
    texto:
      "Integração de etapas da cadeia logística para reduzir custos, melhorar níveis de serviço e aumentar eficiência do abastecimento.",
    bullets: [
      "Planejamento e gestão do fluxo logístico",
      "Acompanhamento de pedidos e indicadores",
      "Estratégias Just in Time (conforme operação)",
    ],
    img: "/servicos/supply-chain.jpg",
    reverse: false,
  },
  {
    id: "cargas-especiais",
    titulo: "Cargas Especiais",
    subtitulo: "Soluções sob medida para necessidades específicas.",
    texto:
      "Atendimento dedicado para cargas com requisitos diferenciados, com planejamento, segurança e acompanhamento do transporte.",
    bullets: [
      "Operação planejada e monitorada",
      "Equipe especializada (conforme demanda)",
      "Suporte e comunicação durante o percurso",
    ],
    img: "/servicos/cargas-especiais.jpg",
    reverse: true,
  },
  {
    id: "consultoria",
    titulo: "Consultoria",
    subtitulo: "Diagnóstico e melhoria de processos logísticos.",
    texto:
      "Análise do cenário atual e proposta de melhorias operacionais para elevar desempenho, reduzir perdas e padronizar rotinas.",
    bullets: [
      "Mapeamento de processos",
      "Propostas de melhoria e padronização",
      "Acompanhamento de implementação",
    ],
    img: "/servicos/consultoria.jpg",
    reverse: false,
  },
];

export default function ServicosPage() {
  return (
    <main className="servicos">
      {/* HERO */}
      <section className="servicosHero">
        <div className="servicosHeroBg" />

        <div className="servicosHeroContent">
          <div className="badge">Serviços</div>
          <h1>Serviços Happening Logística</h1>
          <p>
            Uma página única com todos os serviços — navegue por âncoras e conheça
            nossas soluções com mais clareza.
          </p>

          {/* REMOVIDO: botões do hero */}
          {/* <div className="servicosHeroActions">...</div> */}
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="servicosWrap">
        <div className="servicosContainer">
          {/* NAV DESKTOP (sticky) */}
          <aside className="servicosNav">
            <div className="servicosNavBox">
              <div className="servicosNavTitle">Navegação</div>

              <nav className="servicosNavLinks">
                {SERVICOS.map((s) => (
                  <a key={s.id} className="servicosNavLink" href={`#${s.id}`}>
                    {s.titulo}
                  </a>
                ))}
              </nav>

              {/* REMOVIDO: botões da lateral */}
              {/* <div className="servicosNavCta">...</div> */}
            </div>
          </aside>

          <div>
            {/* NAV MOBILE (chips) */}
            <div className="servicosNavMobile">
              <div className="servicosNavMobileLabel">Ir para:</div>
              <div className="servicosNavMobileChips">
                {SERVICOS.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="servicosChip">
                    {s.titulo}
                  </a>
                ))}
              </div>
            </div>

            {/* SEÇÕES */}
            <div className="servicosContent">
              {SERVICOS.map((s) => (
                <article
                  key={s.id}
                  id={s.id}
                  className={`servicosSection ${s.reverse ? "reverse" : ""}`}
                >
                  <div className="servicosText">
                    <h2>{s.titulo}</h2>
                    <p className="servicosSubtitle">{s.subtitulo}</p>
                    <p>{s.texto}</p>

                    <ul className="servicosBullets">
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>

                    {/* BOTÃO EXTRA: só no Agronegócio */}
                    {s.id === "agronegocio" && (
                      <div style={{ marginTop: 20 }}>
                        <Link
                          href="/servicos/operacao-cana"
                          className="servicosBtn"
                        >
                          Ver Operação da Cana
                        </Link>
                      </div>
                    )}

                    {/* REMOVIDO: botões por serviço */}
                    {/* <div className="servicosActions">...</div> */}
                  </div>

                  <div className="servicosMedia">
                    <img className="servicosImg" src={s.img} alt={s.titulo} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
