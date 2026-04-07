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

function formatarDataCompleta(iso: string) {
  const [y, m] = iso.split("-");
  const meses = [
    "janeiro",
    "fevereiro",
    "março",
    "abril",
    "maio",
    "junho",
    "julho",
    "agosto",
    "setembro",
    "outubro",
    "novembro",
    "dezembro",
  ];

  const mm = Math.max(1, Math.min(12, Number(m || "1")));
  return `${meses[mm - 1]} de ${y}`;
}

export default function TransparenciaPage() {
  const relatoriosOrdenados = [...RELATORIOS].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime()
  );

  const maisRecente = relatoriosOrdenados[0];
  const historico = relatoriosOrdenados.slice(1);

  return (
    <main className="transparencia">
      <section className="transparenciaHero">
        <div className="transparenciaHeroBg" />
        <div className="transparenciaHeroContent">
          <div className="badge">Transparência</div>

          <h1>Relatório de Transparência e Igualdade Salarial</h1>

          <p>
            Em conformidade com a Lei 14.611/2023, disponibilizamos nossos
            relatórios oficiais para consulta pública.
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
            "radial-gradient(circle at top left, rgba(16,185,129,0.08), transparent 22%), linear-gradient(180deg, #f8fbfc 0%, #eef4f3 52%, #e8f0ec 100%)",
          padding: "56px 0 84px",
        }}
      >
        <div className="transparenciaContainer">
          <div
            className="transparenciaCard"
            style={{
              background: "rgba(255,255,255,0.96)",
              border: "1px solid rgba(226,232,240,0.95)",
              boxShadow: "0 18px 50px rgba(15,23,42,0.08)",
              color: "#0f172a",
              backdropFilter: "blur(8px)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "26px 26px 0",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 14px",
                  borderRadius: 999,
                  background: "rgba(16,185,129,0.10)",
                  border: "1px solid rgba(16,185,129,0.18)",
                  color: "#047857",
                  fontWeight: 700,
                  fontSize: 13,
                  marginBottom: 18,
                }}
              >
                Publicação mais recente
              </div>

              <h2
                style={{
                  color: "#0f172a",
                  marginBottom: 10,
                }}
              >
                Relatórios publicados
              </h2>

              <p
                className="transparenciaHint"
                style={{
                  color: "#475569",
                  marginBottom: 24,
                }}
              >
                {maisRecente ? (
                  <>
                    O relatório mais recente disponível é{" "}
                    <strong>{maisRecente.titulo}</strong>, publicado em{" "}
                    {formatarDataCompleta(maisRecente.data)}.
                  </>
                ) : (
                  <>Os relatórios publicados aparecerão aqui para consulta.</>
                )}
              </p>
            </div>

            {maisRecente ? (
              <div
                style={{
                  padding: "0 26px 26px",
                }}
              >
                <div
                  style={{
                    background:
                      "linear-gradient(135deg, #ffffff 0%, #f8fbfc 45%, #eef7f2 100%)",
                    border: "1px solid rgba(226,232,240,0.95)",
                    borderRadius: 24,
                    padding: 28,
                    boxShadow: "0 16px 36px rgba(15,23,42,0.06)",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gap: 22,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 18,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 28,
                            fontWeight: 800,
                            color: "#0f172a",
                            lineHeight: 1.1,
                            marginBottom: 8,
                          }}
                        >
                          {maisRecente.titulo}
                        </div>

                        <div
                          style={{
                            color: "#64748b",
                            fontSize: 15,
                            marginBottom: 10,
                          }}
                        >
                          {formatarMesAno(maisRecente.data)}
                        </div>

                        {maisRecente.descricao ? (
                          <div
                            style={{
                              color: "#475569",
                              fontSize: 16,
                              lineHeight: 1.6,
                              maxWidth: 760,
                            }}
                          >
                            {maisRecente.descricao}
                          </div>
                        ) : null}
                      </div>

                      <div
                        style={{
                          display: "grid",
                          gap: 10,
                          minWidth: 230,
                        }}
                      >
                        <a
                          className="btnPrim"
                          href={maisRecente.arquivo}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            textAlign: "center",
                            justifyContent: "center",
                          }}
                        >
                          Abrir relatório
                        </a>

                        <a
                          className="btnSec"
                          href={maisRecente.arquivo}
                          download
                          style={{
                            textAlign: "center",
                            justifyContent: "center",
                          }}
                        >
                          Baixar PDF
                        </a>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: 14,
                      }}
                    >
                      <div
                        style={{
                          background: "#ffffff",
                          border: "1px solid rgba(226,232,240,0.95)",
                          borderRadius: 18,
                          padding: "18px 18px",
                        }}
                      >
                        <div
                          style={{
                            color: "#64748b",
                            fontSize: 13,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                            marginBottom: 8,
                          }}
                        >
                          Tipo de documento
                        </div>
                        <div
                          style={{
                            color: "#0f172a",
                            fontSize: 16,
                            fontWeight: 700,
                          }}
                        >
                          PDF oficial
                        </div>
                      </div>

                      <div
                        style={{
                          background: "#ffffff",
                          border: "1px solid rgba(226,232,240,0.95)",
                          borderRadius: 18,
                          padding: "18px 18px",
                        }}
                      >
                        <div
                          style={{
                            color: "#64748b",
                            fontSize: 13,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                            marginBottom: 8,
                          }}
                        >
                          Competência
                        </div>
                        <div
                          style={{
                            color: "#0f172a",
                            fontSize: 16,
                            fontWeight: 700,
                          }}
                        >
                          2º semestre
                        </div>
                      </div>

                      <div
                        style={{
                          background: "#ffffff",
                          border: "1px solid rgba(226,232,240,0.95)",
                          borderRadius: 18,
                          padding: "18px 18px",
                        }}
                      >
                        <div
                          style={{
                            color: "#64748b",
                            fontSize: 13,
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.04em",
                            marginBottom: 8,
                          }}
                        >
                          Publicação
                        </div>
                        <div
                          style={{
                            color: "#0f172a",
                            fontSize: 16,
                            fontWeight: 700,
                          }}
                        >
                          {formatarMesAno(maisRecente.data)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="transparenciaEmpty"
                style={{
                  margin: "0 26px 26px",
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

            <div
              style={{
                padding: "0 26px 26px",
              }}
            >
              <div
                style={{
                  background: "#ffffff",
                  border: "1px solid rgba(226,232,240,0.95)",
                  borderRadius: 24,
                  padding: 24,
                  boxShadow: "0 12px 30px rgba(15,23,42,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 16,
                    flexWrap: "wrap",
                    marginBottom: 18,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        color: "#0f172a",
                        fontSize: 24,
                        fontWeight: 800,
                      }}
                    >
                      Histórico de publicações
                    </h3>
                    <p
                      style={{
                        margin: "8px 0 0",
                        color: "#64748b",
                        fontSize: 15,
                      }}
                    >
                      Consulte os relatórios disponibilizados pela Happening.
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gap: 16,
                  }}
                >
                  {relatoriosOrdenados.map((r, idx) => (
                    <div
                      key={`${r.arquivo}-${idx}`}
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 18,
                        padding: "18px 20px",
                        borderRadius: 18,
                        border: "1px solid rgba(226,232,240,0.95)",
                        background: idx === 0 ? "#f8fdf9" : "#f8fafc",
                      }}
                    >
                      <div style={{ minWidth: 220, flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            gap: 10,
                            marginBottom: 6,
                          }}
                        >
                          <div
                            style={{
                              color: "#0f172a",
                              fontSize: 20,
                              fontWeight: 800,
                            }}
                          >
                            {r.titulo}
                          </div>

                          {idx === 0 ? (
                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                padding: "6px 10px",
                                borderRadius: 999,
                                background: "rgba(16,185,129,0.12)",
                                border: "1px solid rgba(16,185,129,0.18)",
                                color: "#047857",
                                fontSize: 12,
                                fontWeight: 800,
                              }}
                            >
                              Mais recente
                            </span>
                          ) : null}
                        </div>

                        <div
                          style={{
                            color: "#64748b",
                            fontSize: 14,
                            marginBottom: 6,
                          }}
                        >
                          {formatarMesAno(r.data)}
                        </div>

                        {r.descricao ? (
                          <div
                            style={{
                              color: "#475569",
                              fontSize: 15,
                              lineHeight: 1.6,
                            }}
                          >
                            {r.descricao}
                          </div>
                        ) : null}
                      </div>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 10,
                        }}
                      >
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
                      </div>
                    </div>
                  ))}
                </div>

                {historico.length === 0 ? (
                  <p
                    style={{
                      marginTop: 18,
                      color: "#64748b",
                      fontSize: 14,
                    }}
                  >
                    Assim que novas publicações forem adicionadas, elas passarão
                    a compor este histórico.
                  </p>
                ) : null}
              </div>
            </div>
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
                boxShadow: "0 18px 48px rgba(15,23,42,0.08)",
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
                Nesta página, disponibilizamos os relatórios oficiais para
                consulta pública de forma simples, organizada e permanente.
              </p>
            </div>

            <div
              className="transparenciaCard"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: "1px solid rgba(226,232,240,0.95)",
                boxShadow: "0 18px 48px rgba(15,23,42,0.08)",
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
                mesma página, formando um histórico de consulta.
              </p>
            </div>

            <div
              className="transparenciaCard"
              style={{
                background: "rgba(255,255,255,0.96)",
                border: "1px solid rgba(226,232,240,0.95)",
                boxShadow: "0 18px 48px rgba(15,23,42,0.08)",
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