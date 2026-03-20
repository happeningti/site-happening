//app/trabalhe-conosco/page.tsx
"use client";

import { useMemo, useState } from "react";

type Vaga = {
  id: string;
  titulo: string;
  local: string;
  descricao: string;
  imagem?: string;
  requisitos?: string[];
  responsabilidades?: string[];
  beneficios?: string[];
  safra?: string;
  pcd?: boolean;
  ativa?: boolean;
};

const UNIDADES = [
  "Matriz — Sertãozinho/SP",
  "Filial — São Paulo/SP",
  "Filial — Aroeira/MG",
  "Filial — Santa Juliana/MG",
  "Filial — Tropical/GO",
];

const VAGAS: Vaga[] = [
  {
    id: "mecanico-linha-pesada-tupaciguara",
    titulo: "Mecânico (Linha Pesada)",
    local: "Filial — Aroeira/MG (Tupaciguara-MG)",
    descricao:
      "Vaga para atuação na unidade de Tupaciguara-MG, com foco em manutenção de linha pesada, conjuntos canavieiros, pneumática e suspensão.",
    requisitos: [
      "CNH categoria B",
      "Ser proativo",
      "Experiência com manutenção de linha pesada",
      "Experiência com conjuntos canavieiros, pneumática e suspensão",
      "Disponibilidade para trabalhar em diferentes escalas",
      "Residir em Tupaciguara-MG",
    ],
    responsabilidades: [
      "Priorizar sempre a segurança",
      "Realizar manutenções preventivas e corretivas",
      "Atuar em caminhões e/ou conjuntos",
    ],
    beneficios: [
      "Salário compatível com a função",
      "Ticket alimentação",
      "Premiação mensal",
      "Seguro de vida",
      "Plano de saúde",
      "Plano odontológico",
      "Transporte fornecido pela empresa",
    ],
    safra: "Safra 2026",
    pcd: false,
    ativa: true,
  },
  {
    id: "tecnico-seguranca-trabalho-tupaciguara",
    titulo: "Técnico em Segurança do Trabalho",
    local: "Filial — Aroeira/MG (Tupaciguara-MG)",
    descricao:
      "Vaga para atuação na unidade de Tupaciguara-MG, com foco em segurança do trabalho, prevenção de acidentes, orientação operacional e apoio às rotinas da filial.",
    requisitos: [
      'CNH categoria "B"',
      "Residir em Tupaciguara/MG",
      "Experiência na função",
      "Curso e registro válidos",
    ],
    responsabilidades: [
      "Acompanhar rotinas de segurança do trabalho na unidade",
      "Orientar equipes quanto ao cumprimento das normas de segurança",
      "Apoiar ações preventivas e inspeções internas",
      "Promover práticas seguras no ambiente de trabalho",
    ],
    beneficios: [
      "Salário compatível com a função",
      "Vale alimentação",
      "Premiação de segurança",
      "Seguro de vida",
      "Plano de saúde",
      "Plano odontológico",
      "Transporte fornecido pela empresa",
    ],
    safra: "Safra 2026",
    pcd: true,
    ativa: true,
  },
  {
    id: "motoristas-canavieiros-porteirao",
    titulo: "Motoristas Canavieiros",
    local: "Filial — Tropical/GO (Porteirão-GO)",
    descricao:
      "Vaga para atuação na unidade de Porteirão-GO, voltada para motoristas com experiência em transporte canavieiro e vivência em operação agrícola.",
    requisitos: [
      "CNH E com EAR",
      "Experiência de 6 meses em transporte canavieiro (CTPS)",
      "Respeito aos valores da empresa",
      "Bom relacionamento interpessoal",
      "Residir em Porteirão, Turvelândia, Maurilândia ou Santa Helena",
    ],
    responsabilidades: [
      "Realizar o transporte de cana com segurança e responsabilidade",
      "Cumprir procedimentos operacionais da empresa",
      "Zelar pelo veículo e pelos equipamentos",
      "Atuar em conformidade com os valores e normas internas",
    ],
    beneficios: [
      "Salário compatível",
      "PPR",
      "Vale alimentação",
      "Plano odontológico",
      "Seguro de vida",
      "Transporte próprio",
    ],
    safra: "Safra 2026",
    pcd: true,
    ativa: true,
  },
];

type PcdTipo =
  | ""
  | "Física"
  | "Auditiva"
  | "Visual"
  | "Intelectual/Psicossocial"
  | "Reabilitado pelo INSS"
  | "Outra";

type FormState = {
  unidade: string;
  cargo: string;
  nome: string;
  telefone: string;
  email: string;
  mensagem: string;
  arquivo?: File | null;
  pcd: "0" | "1";
  pcd_tipo: PcdTipo;
  pcd_adaptacao: string;
};

const initialForm = (
  cargoDefault = "",
  unidadeDefault = UNIDADES[0]
): FormState => ({
  unidade: unidadeDefault,
  cargo: cargoDefault,
  nome: "",
  telefone: "",
  email: "",
  mensagem: "",
  arquivo: null,
  pcd: "0",
  pcd_tipo: "",
  pcd_adaptacao: "",
});

export default function TrabalheConoscoPage() {
  const [open, setOpen] = useState(false);
  const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);

  const [form, setForm] = useState<FormState>(initialForm());
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "sending" }
    | { type: "ok"; msg: string }
    | { type: "err"; msg: string }
  >({ type: "idle" });

  const vagasAtivas = useMemo(() => VAGAS.filter((v) => v.ativa !== false), []);
  const hasVagas = vagasAtivas.length > 0;

  function normalizarUnidadeDoLocal(local: string) {
    if (local.includes("Filial — Aroeira/MG")) return "Filial — Aroeira/MG";
    if (local.includes("Matriz — Sertãozinho/SP")) return "Matriz — Sertãozinho/SP";
    if (local.includes("Filial — São Paulo/SP")) return "Filial — São Paulo/SP";
    if (local.includes("Filial — Santa Juliana/MG")) return "Filial — Santa Juliana/MG";
    if (local.includes("Filial — Tropical/GO")) return "Filial — Tropical/GO";
    return UNIDADES[0];
  }

  function abrirModalBancoTalentos() {
    setVagaSelecionada(null);
    setForm(initialForm(""));
    setStatus({ type: "idle" });
    setOpen(true);
  }

  function abrirModalParaVaga(v: Vaga) {
    setVagaSelecionada(v);
    setForm(initialForm(v.titulo, normalizarUnidadeDoLocal(v.local)));
    setStatus({ type: "idle" });
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setVagaSelecionada(null);
    setStatus({ type: "idle" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ type: "sending" });

    try {
      if (!form.arquivo) {
        setStatus({ type: "err", msg: "Por favor, anexe o currículo em PDF." });
        return;
      }

      const fd = new FormData(e.currentTarget);

      fd.set("unidade", form.unidade);
      fd.set("cargo", form.cargo);
      fd.set("nome", form.nome);
      fd.set("telefone", form.telefone);
      fd.set("email", form.email);
      fd.set("mensagem", form.mensagem || "");

      fd.set("pcd", form.pcd);
      fd.set("pcd_tipo", form.pcd_tipo || "");
      fd.set("pcd_adaptacao", form.pcd_adaptacao || "");

      fd.set("vaga_id", vagaSelecionada?.id || "");
      fd.set("vaga_titulo", vagaSelecionada?.titulo || "");
      fd.set("vaga_local", vagaSelecionada?.local || "");
      fd.set("vaga_safra", vagaSelecionada?.safra || "");

      fd.set("arquivo", form.arquivo);

      const res = await fetch("/api/curriculo", {
        method: "POST",
        body: fd,
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus({
          type: "err",
          msg: data?.error || "Não foi possível enviar. Tente novamente.",
        });
        return;
      }

      setStatus({
        type: "ok",
        msg: "Currículo enviado com sucesso! Em breve o RH fará o contato, se houver aderência ao perfil.",
      });

      setForm(
        initialForm(
          vagaSelecionada?.titulo || "",
          vagaSelecionada
            ? normalizarUnidadeDoLocal(vagaSelecionada.local)
            : UNIDADES[0]
        )
      );
    } catch {
      setStatus({
        type: "err",
        msg: "Falha ao enviar. Verifique sua conexão e tente novamente.",
      });
    }
  }

  const pcdAtivo = form.pcd === "1";

  return (
    <main className="contato">
      <section
        className="servicosHero"
        style={{ borderBottom: "1px solid #e7ebf3" }}
      >
        <div className="servicosHeroBg" />
        <div className="servicosHeroContent">
          <div className="badge">Trabalhe Conosco</div>
          <h1>Trabalhe na Happening</h1>
          <p>
            Veja as vagas abertas ou envie seu currículo para nosso banco de
            talentos. Todas as nossas oportunidades também são destinadas a
            profissionais com deficiência (PCD).
          </p>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <button
              className="btn btnPrimary"
              onClick={abrirModalBancoTalentos}
              type="button"
            >
              Enviar currículo
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="sectionTitle">Vagas disponíveis</h2>
          <p
            className="sectionDesc"
            style={{ color: "rgba(255,255,255,0.82)" }}
          >
            Quando houver vaga aberta, ela aparecerá aqui com a descrição e o
            botão para candidatura.
          </p>

          {!hasVagas ? (
            <div className="card" style={{ padding: 18 }}>
              <h3 style={{ marginTop: 0 }}>Não há vagas disponíveis no momento</h3>
              <p style={{ marginBottom: 0, color: "#475569" }}>
                Você ainda pode enviar seu currículo para o banco de talentos
                pelo botão acima.
              </p>
            </div>
          ) : (
            <div className="grid3" style={{ alignItems: "stretch" }}>
              {vagasAtivas.map((v) => (
                <div
                  key={v.id}
                  className="card"
                  style={{
                    padding: 0,
                    overflow: "hidden",
                    borderRadius: 20,
                    border: "1px solid #dbe4f0",
                    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.10)",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #0f5132 0%, #0d6a43 48%, #198754 100%)",
                      color: "#fff",
                      padding: "18px 18px 16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 10,
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                      }}
                    >
                      {v.safra ? (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "6px 12px",
                            borderRadius: 999,
                            background: "rgba(255,255,255,0.16)",
                            border: "1px solid rgba(255,255,255,0.18)",
                            fontSize: 12,
                            fontWeight: 800,
                            letterSpacing: ".3px",
                          }}
                        >
                          {v.safra}
                        </div>
                      ) : (
                        <div />
                      )}

                      {v.pcd ? (
                        <div
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            padding: "6px 12px",
                            borderRadius: 999,
                            background: "#ecfdf5",
                            color: "#0f766e",
                            fontSize: 12,
                            fontWeight: 800,
                          }}
                        >
                          Vaga também para PCD
                        </div>
                      ) : null}
                    </div>

                    <h3
                      style={{
                        margin: "16px 0 8px",
                        fontSize: 25,
                        lineHeight: 1.15,
                        color: "#fff",
                      }}
                    >
                      {v.titulo}
                    </h3>

                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "8px 12px",
                        borderRadius: 12,
                        background: "rgba(255,255,255,0.10)",
                        border: "1px solid rgba(255,255,255,0.14)",
                        fontSize: 13,
                        fontWeight: 700,
                      }}
                    >
                      📍 {v.local}
                    </div>
                  </div>

                  <div
                    style={{
                      padding: 18,
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                      flex: 1,
                      color: "#0f172a",
                    }}
                  >
                    <p style={{ margin: 0, color: "#334155", lineHeight: 1.6 }}>
                      {v.descricao}
                    </p>

                    {v.requisitos?.length ? (
                      <div
                        style={{
                          background: "#f8fafc",
                          border: "1px solid #e2e8f0",
                          borderRadius: 16,
                          padding: 14,
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 800,
                            marginTop: 0,
                            marginBottom: 8,
                            color: "#0f172a",
                          }}
                        >
                          Requisitos
                        </p>
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: 18,
                            color: "#334155",
                            lineHeight: 1.6,
                          }}
                        >
                          {v.requisitos.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {v.responsabilidades?.length ? (
                      <div
                        style={{
                          background: "#fff",
                          border: "1px solid #e2e8f0",
                          borderRadius: 16,
                          padding: 14,
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 800,
                            marginTop: 0,
                            marginBottom: 8,
                            color: "#0f172a",
                          }}
                        >
                          Responsabilidades
                        </p>
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: 18,
                            color: "#334155",
                            lineHeight: 1.6,
                          }}
                        >
                          {v.responsabilidades.map((r) => (
                            <li key={r}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    {v.beneficios?.length ? (
                      <div
                        style={{
                          background: "#f0fdf4",
                          border: "1px solid #bbf7d0",
                          borderRadius: 16,
                          padding: 14,
                        }}
                      >
                        <p
                          style={{
                            fontWeight: 800,
                            marginTop: 0,
                            marginBottom: 8,
                            color: "#166534",
                          }}
                        >
                          Benefícios
                        </p>
                        <ul
                          style={{
                            margin: 0,
                            paddingLeft: 18,
                            color: "#166534",
                            lineHeight: 1.6,
                          }}
                        >
                          {v.beneficios.map((b) => (
                            <li key={b}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ) : null}

                    <div
                      style={{
                        marginTop: "auto",
                        display: "flex",
                        gap: 10,
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        className="btn btnPrimary"
                        type="button"
                        onClick={() => abrirModalParaVaga(v)}
                      >
                        Candidatar-se
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={closeModal}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,.55)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 14,
            zIndex: 9999,
          }}
        >
          <div
            className="card"
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "min(860px, 100%)",
              padding: 18,
              borderRadius: 16,
              maxHeight: "calc(100vh - 28px)",
              overflow: "auto",
              color: "#0f172a",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 10,
                alignItems: "flex-start",
              }}
            >
              <div style={{ flex: 1 }}>
                <h2 style={{ marginTop: 0, marginBottom: 6 }}>
                  {vagaSelecionada ? "Candidatura para vaga" : "Enviar currículo"}
                </h2>

                <p style={{ marginTop: 0, color: "#475569" }}>
                  {vagaSelecionada ? (
                    <strong>{vagaSelecionada.titulo}</strong>
                  ) : (
                    "Banco de talentos — envie seu currículo para o RH."
                  )}
                </p>

                {vagaSelecionada ? (
                  <div
                    style={{
                      marginTop: 10,
                      background: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      borderRadius: 14,
                      padding: 14,
                    }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(180px, 1fr))",
                        gap: 12,
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: "#64748b",
                            textTransform: "uppercase",
                          }}
                        >
                          Vaga
                        </div>
                        <div style={{ marginTop: 4, fontWeight: 700 }}>
                          {vagaSelecionada.titulo}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: 12,
                            fontWeight: 800,
                            color: "#64748b",
                            textTransform: "uppercase",
                          }}
                        >
                          Unidade
                        </div>
                        <div style={{ marginTop: 4, fontWeight: 700 }}>
                          {vagaSelecionada.local}
                        </div>
                      </div>

                      {vagaSelecionada.safra ? (
                        <div>
                          <div
                            style={{
                              fontSize: 12,
                              fontWeight: 800,
                              color: "#64748b",
                              textTransform: "uppercase",
                            }}
                          >
                            Período
                          </div>
                          <div style={{ marginTop: 4, fontWeight: 700 }}>
                            {vagaSelecionada.safra}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Fechar"
                className="btn btnSoft"
                style={{ height: 40 }}
              >
                Fechar
              </button>
            </div>

            <form onSubmit={onSubmit}>
              <div style={{ display: "none" }} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid2" style={{ marginTop: 10 }}>
                <div>
                  <label style={{ fontWeight: 800 }}>Unidade desejada</label>
                  <select
                    name="unidade"
                    value={form.unidade}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, unidade: e.target.value }))
                    }
                    disabled={vagaSelecionada !== null}
                    style={{
                      width: "100%",
                      marginTop: 8,
                      background: vagaSelecionada ? "#f1f5f9" : "#fff",
                      cursor: vagaSelecionada ? "not-allowed" : "pointer",
                      opacity: 1,
                    }}
                  >
                    {UNIDADES.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>

                  {vagaSelecionada ? (
                    <p style={{ marginTop: 6, color: "#64748b", fontSize: 12 }}>
                      Unidade bloqueada automaticamente conforme a vaga
                      selecionada.
                    </p>
                  ) : null}
                </div>

                <div>
                  <label style={{ fontWeight: 800 }}>Cargo pretendido</label>
                  <input
                    name="cargo"
                    value={form.cargo}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, cargo: e.target.value }))
                    }
                    placeholder="Ex: Operador de Empilhadeira"
                    style={{ width: "100%", marginTop: 8, color: "#0f172a" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontWeight: 800 }}>Nome</label>
                  <input
                    name="nome"
                    value={form.nome}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, nome: e.target.value }))
                    }
                    style={{ width: "100%", marginTop: 8 }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontWeight: 800 }}>Telefone/WhatsApp</label>
                  <input
                    name="telefone"
                    value={form.telefone}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, telefone: e.target.value }))
                    }
                    style={{ width: "100%", marginTop: 8 }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontWeight: 800 }}>E-mail</label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, email: e.target.value }))
                    }
                    style={{ width: "100%", marginTop: 8, color: "#0f172a" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontWeight: 800 }}>Currículo (PDF)</label>
                  <input
                    name="arquivo"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        arquivo: e.target.files?.[0] || null,
                      }))
                    }
                    style={{ width: "100%", marginTop: 8 }}
                    required
                  />
                </div>
              </div>

              <div
                style={{
                  marginTop: 12,
                  padding: 12,
                  borderRadius: 12,
                  background: "#f1f5f9",
                }}
              >
                <strong>♿ Informações adicionais (opcional)</strong>

                <div style={{ marginTop: 10 }}>
                  <label style={{ fontWeight: 800 }}>
                    Você é pessoa com deficiência (PCD)?
                  </label>
                  <div
                    style={{
                      marginTop: 8,
                      display: "flex",
                      gap: 14,
                      flexWrap: "wrap",
                    }}
                  >
                    <label
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <input
                        type="radio"
                        name="pcd"
                        value="0"
                        checked={form.pcd === "0"}
                        onChange={() =>
                          setForm((p) => ({
                            ...p,
                            pcd: "0",
                            pcd_tipo: "",
                            pcd_adaptacao: "",
                          }))
                        }
                      />
                      Não
                    </label>

                    <label
                      style={{ display: "flex", alignItems: "center", gap: 8 }}
                    >
                      <input
                        type="radio"
                        name="pcd"
                        value="1"
                        checked={form.pcd === "1"}
                        onChange={() => setForm((p) => ({ ...p, pcd: "1" }))}
                      />
                      Sim
                    </label>
                  </div>
                </div>

                {pcdAtivo && (
                  <div className="grid2" style={{ marginTop: 12 }}>
                    <div>
                      <label style={{ fontWeight: 800 }}>Tipo (opcional)</label>
                      <select
                        name="pcd_tipo"
                        value={form.pcd_tipo}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            pcd_tipo: e.target.value as PcdTipo,
                          }))
                        }
                        style={{ width: "100%", marginTop: 8 }}
                      >
                        <option value="">Selecione (opcional)</option>
                        <option value="Física">Física</option>
                        <option value="Auditiva">Auditiva</option>
                        <option value="Visual">Visual</option>
                        <option value="Intelectual/Psicossocial">
                          Intelectual/Psicossocial
                        </option>
                        <option value="Reabilitado pelo INSS">
                          Reabilitado pelo INSS
                        </option>
                        <option value="Outra">Outra</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontWeight: 800 }}>
                        Precisa de adaptação para participar do processo?
                        (opcional)
                      </label>
                      <input
                        name="pcd_adaptacao"
                        value={form.pcd_adaptacao}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            pcd_adaptacao: e.target.value,
                          }))
                        }
                        placeholder="Ex.: intérprete de Libras, acessibilidade, etc."
                        style={{ width: "100%", marginTop: 8 }}
                      />
                    </div>

                    <div
                      style={{
                        gridColumn: "1 / -1",
                        color: "#475569",
                        fontSize: 13,
                      }}
                    >
                      A Happening valoriza a diversidade e não realiza qualquer
                      tipo de discriminação em seus processos seletivos.
                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 12 }}>
                <label style={{ fontWeight: 800 }}>Mensagem (opcional)</label>
                <textarea
                  name="mensagem"
                  value={form.mensagem}
                  onChange={(e) =>
                    setForm((p) => ({ ...p, mensagem: e.target.value }))
                  }
                  style={{ width: "100%", marginTop: 8, minHeight: 90 }}
                  placeholder="Conte algo sobre sua experiência, disponibilidade, etc."
                />
              </div>

              <div
                style={{
                  marginTop: 14,
                  display: "flex",
                  gap: 10,
                  flexWrap: "wrap",
                }}
              >
                <button
                  className="btn btnPrimary"
                  type="submit"
                  disabled={status.type === "sending"}
                >
                  {status.type === "sending" ? "Enviando..." : "Enviar currículo"}
                </button>

                {status.type === "ok" && (
                  <div className="alertOk" style={{ alignSelf: "center" }}>
                    {status.msg}
                  </div>
                )}

                {status.type === "err" && (
                  <div className="alertErr" style={{ alignSelf: "center" }}>
                    {status.msg}
                  </div>
                )}
              </div>

              <p style={{ marginTop: 10, color: "#64748b", fontSize: 13 }}>
                * O envio é direcionado para o RH.
              </p>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}