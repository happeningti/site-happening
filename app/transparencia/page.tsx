// app/transparencia/page.tsx
import Link from "next/link";

type Relatorio = {
  titulo: string;
  arquivo: string;
  data: string;
  descricao?: string;
};

const RELATORIOS: Relatorio[] = [
  {
    titulo: "Relatório 2025/2",
    arquivo: "/transparencia/relatorio-2025-02.pdf",
    data: "2025-12-01",
    descricao:
      "Relatório de Transparência e Igualdade Salarial (2º semestre/2025).",
  },
  {
    titulo: "Relatório 2024/2",
    arquivo: "/transparencia/relatorio-2024-2.pdf",
    data: "2024-12-01",
    descricao:
      "Relatório de Transparência e Igualdade Salarial (2º semestre/2024).",
  },
];

function formatarMesAno(iso: string) {
  const [y, m] = iso.split("-");
  const meses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

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

      <section
        className="transparenciaWrap"
        id="relatorios"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(16,185,129,0.10), transparent 22%), linear-gradient(180deg, #f8fafc 0%, #eef5f9 50%, #e7f1ec 100%)",
          padding: "56px 0 72px",
        }}
      >
        <div className="transparenciaContainer">
          <div
            className="transparenciaCard"
            style={{
              background: "rgba(255,255,255,0.96)",
              border: "1px solid rgba(226,232,240,0.95)",
              boxShadow: "0 18px 48px rgba(15,23,42,0.10)",
              color: "#0f172a",
              backdropFilter: "blur(8px)",
            }}
          >
            <h2 style={{ color: "#0f172a" }}>Relatórios publicados</h2>

            <p className="transparenciaHint" style={{ color: "#475569" }}>
              {maisRecente ? (
                <>
                  O mais recente é <strong>{maisRecente.titulo}</strong> (
                  {formatarMesAno(maisRecente.data)}).
                </>
              ) : (
                <>Os relatórios publicados aparecerão aqui para consulta.</>
              )}
            </p>

            {maisRecente ? (
              <div
                className="transparenciaViewer"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(226,232,240,0.9)",
                  borderRadius: 20,
                  overflow: "hidden",
                  boxShadow: "0 12px 30px rgba(15,23,42,0.08)",
                }}
              >
                <div
                  className="transparenciaViewerHeader"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(248,250,252,0.98) 0%, rgba(241,245,249,0.98) 100%)",
                    borderBottom: "1px solid rgba(226,232,240,0.9)",
                    padding: "18px 18px 16px",
                  }}
                >
                  <div className="transparenciaViewerTitle">
                    <span
                      className="pillMini"
                      style={{
                        background: "rgba(16,185,129,0.12)",
                        color: "#047857",
                        border: "1px solid rgba(16,185,129,0.18)",
                      }}
                    >
                      Mais recente
                    </span>

                    <div
                      className="transparenciaViewerName"
                      style={{ color: "#0f172a" }}
                    >
                      {maisRecente.titulo}
                    </div>

                    <div
                      className="transparenciaViewerMeta"
                      style={{ color: "#64748b" }}
                    >
                      {formatarMesAno(maisRecente.data)}
                    </div>
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

                    <a
                      className="btnSec"
                      href={maisRecente.arquivo}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ampliar
                    </a>
                  </div>
                </div>

                <div
                  className="transparenciaIframeWrap"
                  style={{
                    background:
                      "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
                    padding: 12,
                  }}
                >
                  <div
                    style={{
                      background: "#ffffff",
                      borderRadius: 16,
                      overflow: "hidden",
                      border: "1px solid rgba(226,232,240,0.95)",
                      boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)",
                    }}
                  >
                    <iframe
                      className="transparenciaIframe"
                      src={maisRecente.arquivo}
                      title={`Visualizador - ${maisRecente.titulo}`}
                      style={{
                        background: "#ffffff",
                        border: "none",
                        minHeight: 720,
                      }}
                    />
                  </div>
                </div>

                {maisRecente.descricao ? (
                  <p
                    className="transparenciaViewerDesc"
                    style={{
                      color: "#475569",
                      padding: "14px 18px 18px",
                      margin: 0,
                      borderTop: "1px solid rgba(226,232,240,0.7)",
                      background: "#ffffff",
                    }}
                  >
                    {maisRecente.descricao}
                  </p>
                ) : null}
              </div>
            ) : (
              <div
                className="transparenciaEmpty"
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(226,232,240,0.9)",
                  borderRadius: 18,
                  color: "#475569",
                  boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
                }}
              >
                Nenhum relatório publicado ainda. Assim que você subir um PDF em{" "}
                <code>/public/transparencia/</code>, ele aparecerá aqui.
              </div>
            )}

            {relatoriosOrdenados.length > 0 ? (
              <div className="transparenciaList" style={{ marginTop: 22 }}>
                {relatoriosOrdenados.map((r, idx) => (
                  <div
                    className="transparenciaItem"
                    key={`${r.arquivo}-${idx}`}
                    style={{
                      background: "#ffffff",
                      border: "1px solid rgba(226,232,240,0.9)",
                      borderRadius: 18,
                      overflow: "hidden",
                      boxShadow: "0 10px 24px rgba(15,23,42,0.06)",
                    }}
                  >
                    <div
                      style={{
                        padding: "18px 18px 14px",
                        borderBottom: "1px solid rgba(226,232,240,0.7)",
                        background:
                          "linear-gradient(180deg, rgba(248,250,252,0.98) 0%, rgba(255,255,255,0.98) 100%)",
                      }}
                    >
                      <div className="transparenciaItemLeft">
                        <div
                          className="transparenciaItemTitle"
                          style={{ color: "#0f172a" }}
                        >
                          {r.titulo}
                        </div>

                        <div
                          className="transparenciaItemMeta"
                          style={{ color: "#64748b" }}
                        >
                          {formatarMesAno(r.data)}
                        </div>

                        {r.descricao ? (
                          <div
                            className="transparenciaItemDesc"
                            style={{ color: "#475569" }}
                          >
                            {r.descricao}
                          </div>
                        ) : null}
                      </div>

                      <div className="transparenciaItemActions">
                        <a
                          className="btnPrim"
                          href={r.arquivo}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Abrir
                        </a>

                        <a className="btnSec" href={r.arquivo} download>
                          Baixar
                        </a>

                        <a className="btnSec" href={`#pdf-${idx}`}>
                          Ver aqui
                        </a>
                      </div>
                    </div>

                    <div
                      className="transparenciaItemPreview"
                      id={`pdf-${idx}`}
                      style={{
                        background:
                          "linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)",
                        padding: 12,
                      }}
                    >
                      <div
                        style={{
                          background: "#ffffff",
                          borderRadius: 14,
                          overflow: "hidden",
                          border: "1px solid rgba(226,232,240,0.95)",
                        }}
                      >
                        <iframe
                          className="transparenciaIframeMini"
                          src={r.arquivo}
                          title={`Preview - ${r.titulo}`}
                          style={{
                            background: "#ffffff",
                            border: "none",
                            minHeight: 420,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div
            style={{
              display: "grid",
              gap: 18,
              alignContent: "start",
            }}
          >
            <div
              className="transparenciaCard"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: "1px solid rgba(226,232,240,0.95)",
                boxShadow: "0 18px 48px rgba(15,23,42,0.10)",
                color: "#0f172a",
                backdropFilter: "blur(8px)",
              }}
            >
              <h2 style={{ color: "#0f172a" }}>Sobre a publicação</h2>

              <p style={{ color: "#475569" }}>
                A Happening Logística reforça o compromisso com equidade,
                transparência e inclusão, seguindo as diretrizes legais e boas
                práticas de gestão de pessoas.
              </p>

              <p style={{ color: "#475569" }}>
                Nesta página, disponibilizamos os relatórios publicados para
                consulta pública, permitindo acesso rápido aos documentos
                oficiais de transparência e igualdade salarial.
              </p>
            </div>

            <div
              className="transparenciaCard"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: "1px solid rgba(226,232,240,0.95)",
                boxShadow: "0 18px 48px rgba(15,23,42,0.10)",
                color: "#0f172a",
                backdropFilter: "blur(8px)",
              }}
            >
              <h2 style={{ color: "#0f172a" }}>Base legal</h2>

              <p style={{ color: "#475569" }}>
                Os relatórios são disponibilizados em conformidade com a Lei nº
                14.611/2023, que trata da igualdade salarial e de critérios
                remuneratórios entre mulheres e homens.
              </p>

              <p style={{ color: "#475569" }}>
                Novas publicações podem ser adicionadas periodicamente nesta
                mesma página, formando um histórico para consulta.
              </p>
            </div>

            <div
              className="transparenciaCard"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: "1px solid rgba(226,232,240,0.95)",
                boxShadow: "0 18px 48px rgba(15,23,42,0.10)",
                color: "#0f172a",
                backdropFilter: "blur(8px)",
              }}
            >
              <h2 style={{ color: "#0f172a" }}>Dúvidas e contato</h2>

              <p style={{ color: "#475569" }}>
                Em caso de dúvidas sobre as publicações, a Happening permanece à
                disposição por meio de seus canais oficiais de atendimento.
              </p>

              <div style={{ marginTop: 14 }}>
                <Link className="btnSec" href="/contato">
                  Falar com a Happening
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}