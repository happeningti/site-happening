// app/servicos/operacao-cana/page.tsx
import Link from "next/link";

export default function OperacaoCanaPage() {
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

                <div className="operacaoCanaCardHint">
                  Dica: se não aparecer, confira se o arquivo está em{" "}
                  <code>public/videos/cana.mp4</code>.
                </div>
              </div>
            </div>
          </div>

          {/* GALERIA */}
          <div className="operacaoCanaGaleria">
            <h2>Fotos da Operação</h2>

            <div className="operacaoCanaGaleriaGrid">
              <img src="/servicos/cana-01.jpg" alt="Operação de Cana 1" />
              <img src="/servicos/cana-02.jpg" alt="Operação de Cana 2" />
              <img src="/servicos/cana-03.jpg" alt="Operação de Cana 3" />
              <img src="/servicos/cana-04.jpg" alt="Operação de Cana 4" />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
