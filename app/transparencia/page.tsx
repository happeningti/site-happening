// app/transparencia/page.tsx
import Link from "next/link";

type Relatorio = {
  titulo: string;     // Ex: "Relatório 2025/2"
  arquivo: string;    // Ex: "/transparencia/relatorio-2025-2.pdf"
  data: string;       // ISO: "2025-12-01" (serve pra ordenar)
  descricao?: string; // opcional
};

const RELATORIOS: Relatorio[] = [
  {
    titulo: "Relatório 2025/2",
    arquivo: "/transparencia/relatorio-2025-2.pdf",
    data: "2025-12-01",
    descricao: "Relatório de Transparência e Igualdade Salarial (2º semestre/2025).",
  },
  // Quando subir um novo, só adicionar acima/abaixo:
  // {
  //   titulo: "Relatório 2026/1",
  //   arquivo: "/transparencia/relatorio-2026-1.pdf",
  //   data: "2026-06-01",
  // },
];

function formatarMesAno(iso: string) {
  // Mantém simples e sem depender de locale do servidor
  // iso: YYYY-MM-DD
  const [y, m] = iso.split("-");
  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const mm = Math.max(1, Math.min(12, Number(m || "1")));
  return `${meses[mm - 1]}/${y}`;
}

export default function TransparenciaPage() {
  const relatoriosOrdenados = [...RELATORIOS].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  const maisRecente = relatoriosOrdenados[0];

  return (
    <main className="transparencia">
      <section className="transparenciaHero">
        <div className="transparenciaHeroBg" />
        <div className="transparenciaHeroContent">
          <div className="badge">Transparência</div>
          <h1>Relatório de Transparência e Igualdade Salarial</h1>
          <p>
            Em conformidade com a Lei 14.611/2023, disponibilizamos nossos relatórios
            de transparência e igualdade salarial.
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
              {maisRecente ? (
                <>
                  {" "}O mais recente é{" "}
                  <strong>{maisRecente.titulo}</strong> ({formatarMesAno(maisRecente.data)}).
                </>
              ) : null}
            </p>

            {/* VISUALIZADOR DO PDF (mais recente) */}
            {maisRecente ? (
              <div className="transparenciaViewer">
                <div className="transparenciaViewerHeader">
                  <div className="transparenciaViewerTitle">
                    <span className="pillMini">Mais recente</span>
                    <div className="transparenciaViewerName">{maisRecente.titulo}</div>
                    <div className="transparenciaViewerMeta">{formatarMesAno(maisRecente.data)}</div>
                  </div>

                  <div className="transparenciaViewerActions">
                    <a
                      className="btnPrim"
                      href={maisRecente.arquivo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Abrir PDF
                    </a>
                    <a className="btnSec" href={maisRecente.arquivo} download>
                      Baixar
                    </a>
                    <a className="btnSec" href={maisRecente.arquivo} target="_blank" rel="noreferrer">
                      Ampliar
                    </a>
                  </div>
                </div>

                <div className="transparenciaIframeWrap">
                  <iframe
                    className="transparenciaIframe"
                    src={maisRecente.arquivo}
                    title={`Visualizador - ${maisRecente.titulo}`}
                  />
                </div>

                {maisRecente.descricao ? (
                  <p className="transparenciaViewerDesc">{maisRecente.descricao}</p>
                ) : null}
              </div>
            ) : (
              <div className="transparenciaEmpty">
                Nenhum relatório publicado ainda. Assim que você subir um PDF em{" "}
                <code>/public/transparencia/</code>, ele aparecerá aqui.
              </div>
            )}

            {/* LISTA / HISTÓRICO */}
            {relatoriosOrdenados.length > 0 ? (
              <div className="transparenciaList">
                {relatoriosOrdenados.map((r, idx) => (
                  <div className="transparenciaItem" key={`${r.arquivo}-${idx}`}>
                    <div className="transparenciaItemLeft">
                      <div className="transparenciaItemTitle">{r.titulo}</div>
                      <div className="transparenciaItemMeta">{formatarMesAno(r.data)}</div>
                      {r.descricao ? (
                        <div className="transparenciaItemDesc">{r.descricao}</div>
                      ) : null}
                    </div>

                    <div className="transparenciaItemActions">
                      <a className="btnPrim" href={r.arquivo} target="_blank" rel="noreferrer">
                        Abrir
                      </a>
                      <a className="btnSec" href={r.arquivo} download>
                        Baixar
                      </a>
                      <a className="btnSec" href={`#pdf-${idx}`}>
                        Ver aqui
                      </a>
                    </div>

                    {/* Preview embutido por item (fica “embaixo do mais atual”) */}
                    <div className="transparenciaItemPreview" id={`pdf-${idx}`}>
                      <iframe
                        className="transparenciaIframeMini"
                        src={r.arquivo}
                        title={`Preview - ${r.titulo}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="transparenciaCard">
            <h2>Sobre a publicação</h2>
            <p>
              A Happening Logística reforça o compromisso com equidade, transparência e inclusão,
              seguindo as diretrizes legais e boas práticas de gestão de pessoas.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
