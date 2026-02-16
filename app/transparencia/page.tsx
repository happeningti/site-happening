// app/transparencia/page.tsx
import Link from "next/link";

export default function TransparenciaPage() {
  return (
    <main className="transparencia">
      <section className="transparenciaHero">
        <div className="transparenciaHeroBg" />
        <div className="transparenciaHeroContent">
          <div className="badge">Transparência</div>
          <h1>Relatório de Transparência e Igualdade Salarial</h1>
          <p>
            Em conformidade com a Lei 14.611/2023, disponibilizamos nossos
            relatórios de transparência e igualdade salarial.
          </p>

          <div className="transparenciaHeroActions">
            <a className="btnPrim" href="#relatorios">
              Ver relatórios
            </a>
            <Link className="btnSec" href="/contato">
              Falar com a Happening
            </Link>
          </div>
        </div>
      </section>

      <section className="transparenciaWrap" id="relatorios">
        <div className="transparenciaContainer">
          <div className="transparenciaCard">
            <h2>Relatórios publicados</h2>
            <p className="transparenciaHint">
              Dica: coloque os PDFs em <code>/public/transparencia/</code>.
            </p>

            {/* EXEMPLO: ajuste o nome do arquivo conforme você subir no /public */}
            <div className="transparenciaList">
              <div className="transparenciaItem">
                <div className="transparenciaItemTitle">
                  Relatório 2025/2
                </div>
                <div className="transparenciaItemActions">
                  <a
                    className="btnPrim"
                    href="/transparencia/relatorio-2025-2.pdf"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir PDF
                  </a>
                  <a
                    className="btnSec"
                    href="/transparencia/relatorio-2025-2.pdf"
                    download
                  >
                    Baixar
                  </a>
                </div>
              </div>

              {/* Se quiser histórico, é só duplicar o bloco acima e mudar o nome */}
              {/* <div className="transparenciaItem">...</div> */}
            </div>
          </div>

          <div className="transparenciaCard">
            <h2>Sobre a publicação</h2>
            <p>
              A Happening Logística reforça o compromisso com equidade,
              transparência e inclusão, seguindo as diretrizes legais e boas
              práticas de gestão de pessoas.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
