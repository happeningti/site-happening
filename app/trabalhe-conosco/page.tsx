"use client";

import { useMemo, useState } from "react";

type Vaga = {
  id: string;
  titulo: string;
  local: string;        // ex: "Sertãozinho/SP"
  descricao: string;    // texto livre
  imagem?: string;      // "/vagas/arquivo.jpg"
  requisitos?: string[]; // lista (opcional)
  pcd?: boolean;        // se aceita PCD (opcional)
  ativa?: boolean;      // pra histórico (opcional)
};

const UNIDADES = [
  "Matriz — Sertãozinho/SP",
  "Filial — São Paulo/SP",
  "Filial — Aroeira/MG",
  "Filial — Santa Juliana/MG",
  "Filial — Tropical/GO",
];

// ✅ VAGAS: quando não tiver vaga, deixe vazio mesmo: []
// Quando tiver, é só adicionar aqui que aparece no site automaticamente.
const VAGAS: Vaga[] = [
  {
    id: "auxiliar-operacional",
    titulo: "auxiliar-operacional",
    local: "Sertãozinho/SP",
    descricao:
      "Atuação com empilhadeira e entregas de fracionados.",
    imagem: "/vagas/operador-empilhadeira.jpg",
    requisitos: [
      "Experiência com empilhadeira e entregas de fracionados",
      "CNH categoria B",
      "Ensino médio completo"
    ],
    pcd: true,
    ativa: true,
  },
];

// Se você quiser esconder vagas encerradas, use isso na hora de renderizar:
// const VAGAS_ATIVAS = VAGAS.filter(v => v.ativa !== false);
//////////////////


type FormState = {
  unidade: string;
  cargo: string;
  nome: string;
  telefone: string;
  email: string;
  mensagem: string;
  arquivo?: File | null;
};

const initialForm = (cargoDefault = ""): FormState => ({
  unidade: UNIDADES[0],
  cargo: cargoDefault,
  nome: "",
  telefone: "",
  email: "",
  mensagem: "",
  arquivo: null,
});

export default function TrabalheConoscoPage() {
  const [open, setOpen] = useState(false);
  const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);
  const [isPCD, setIsPCD] = useState(false);

  const [form, setForm] = useState<FormState>(initialForm());
  const [status, setStatus] = useState<
    | { type: "idle" }
    | { type: "sending" }
    | { type: "ok"; msg: string }
    | { type: "err"; msg: string }
  >({ type: "idle" });

  const hasVagas = useMemo(() => VAGAS.length > 0, []);

  function abrirModalBancoTalentos(pcd: boolean) {
    setIsPCD(pcd);
    setVagaSelecionada(null);
    setForm(initialForm(""));
    setStatus({ type: "idle" });
    setOpen(true);
  }

  function abrirModalParaVaga(v: Vaga) {
    setIsPCD(false); // a vaga pode ser pcd também, mas aqui é candidatura normal
    setVagaSelecionada(v);
    setForm(initialForm(v.titulo)); // ✅ cargo pretendido vem preenchido com o título da vaga
    setStatus({ type: "idle" });
    setOpen(true);
  }

  function closeModal() {
    setOpen(false);
    setVagaSelecionada(null);
    setIsPCD(false);
    setStatus({ type: "idle" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ type: "sending" });

    try {
      if (!form.arquivo) {
        setStatus({ type: "err", msg: "Por favor, anexe o currículo em PDF." });
        return;
      }

      const fd = new FormData();
      fd.append("unidade", form.unidade);
      fd.append("cargo", form.cargo);
      fd.append("nome", form.nome);
      fd.append("telefone", form.telefone);
      fd.append("email", form.email);
      fd.append("mensagem", form.mensagem || "");
      fd.append("pcd", isPCD ? "1" : "0");

      // ✅ info da vaga (se existir)
      fd.append("vaga_id", vagaSelecionada?.id || "");
      fd.append("vaga_titulo", vagaSelecionada?.titulo || "");
      fd.append("vaga_local", vagaSelecionada?.local || "");

      fd.append("arquivo", form.arquivo);

      const res = await fetch("/api/curriculo", { method: "POST", body: fd });
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

      // opcional: limpar form após sucesso
      setForm(initialForm(vagaSelecionada?.titulo || ""));
    } catch (err) {
      setStatus({
        type: "err",
        msg: "Falha ao enviar. Verifique sua conexão e tente novamente.",
      });
    }
  }

  return (
    <main className="contato">
      {/* HERO */}
      <section className="servicosHero" style={{ borderBottom: "1px solid #e7ebf3" }}>
        <div className="servicosHeroBg" />
        <div className="servicosHeroContent">
          <div className="badge">Trabalhe Conosco</div>
          <h1>Trabalhe na Happening</h1>
          <p>
            Veja as vagas abertas ou envie seu currículo para nosso banco de talentos.
            Também incentivamos candidaturas de profissionais com deficiência (PCD).
          </p>

          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              className="btn btnPrimary"
              onClick={() => abrirModalBancoTalentos(false)}
              type="button"
            >
              Enviar currículo
            </button>

            <button
              className="btn btnSoft"
              onClick={() => abrirModalBancoTalentos(true)}
              type="button"
            >
              Enviar Currículo PCD
            </button>
          </div>
        </div>
      </section>

      {/* VAGAS */}
      <section className="section">
        <div className="container">
          <h2 className="sectionTitle">Vagas disponíveis</h2>
          <p className="sectionDesc">
            Quando houver vaga aberta, ela aparecerá aqui com a descrição e o botão para candidatura.
          </p>

          {!hasVagas ? (
            <div className="card" style={{ padding: 18 }}>
              <h3 style={{ marginTop: 0 }}>Não há vagas disponíveis no momento</h3>
              <p style={{ marginBottom: 0, color: "#475569" }}>
                Você ainda pode enviar seu currículo para o banco de talentos (inclusive PCD) pelos botões acima.
              </p>
            </div>
          ) : (
            <div className="grid3">
              {VAGAS.map((v) => (
                <div key={v.id} className="card">
                  <h3 style={{ marginTop: 0 }}>{v.titulo}</h3>

                  <p style={{ color: "#64748b", marginTop: 6 }}>
                    {v.local ? <span><strong>Local:</strong> {v.local}</span> : <span>&nbsp;</span>}
                  </p>

                  <p style={{ marginTop: 10 }}>{v.descricao}</p>

                  {v.requisitos?.length ? (
                    <>
                      <p style={{ fontWeight: 800, marginTop: 12, marginBottom: 8 }}>Requisitos</p>
                      <ul style={{ marginTop: 0, paddingLeft: 18 }}>
                        {v.requisitos.map((r) => (
                          <li key={r}>{r}</li>
                        ))}
                      </ul>
                    </>
                  ) : null}

                  {v.pcd ? (
                    <div style={{ marginTop: 10, fontWeight: 800, color: "#0b7a4b" }}>
                      Vaga disponível também para PCD
                    </div>
                  ) : null}

                  <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button className="btn btnPrimary" type="button" onClick={() => abrirModalParaVaga(v)}>
                      Candidatar-se
                    </button>

                    <button className="btn btnSoft" type="button" onClick={() => abrirModalBancoTalentos(true)}>
                      Candidatura PCD
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MODAL FORM */}
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
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
              <div>
                <h2 style={{ marginTop: 0, marginBottom: 6 }}>
                  {vagaSelecionada ? "Candidatura para vaga" : "Enviar currículo"}
                </h2>

                <p style={{ marginTop: 0, color: "#475569" }}>
                  {vagaSelecionada ? (
                    <>
                      <strong>{vagaSelecionada.titulo}</strong>
                      {vagaSelecionada.local ? ` — ${vagaSelecionada.local}` : ""}
                    </>
                  ) : isPCD ? (
                    "Programa de Inclusão PCD — envie seu currículo para o RH."
                  ) : (
                    "Banco de talentos — envie seu currículo para o RH."
                  )}
                </p>
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
              <div className="grid2" style={{ marginTop: 10 }}>
                <div>
                  <label style={{ fontWeight: 800 }}>Unidade desejada</label>
                  <select
                    value={form.unidade}
                    onChange={(e) => setForm((p) => ({ ...p, unidade: e.target.value }))}
                    style={{ width: "100%", marginTop: 8 }}
                  >
                    {UNIDADES.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ fontWeight: 800 }}>Cargo pretendido</label>
                  <input
                    value={form.cargo}
                    onChange={(e) => setForm((p) => ({ ...p, cargo: e.target.value }))}
                    placeholder="Ex: Operador de Empilhadeira"
                    style={{ width: "100%", marginTop: 8 }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontWeight: 800 }}>Nome</label>
                  <input
                    value={form.nome}
                    onChange={(e) => setForm((p) => ({ ...p, nome: e.target.value }))}
                    style={{ width: "100%", marginTop: 8 }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontWeight: 800 }}>Telefone/WhatsApp</label>
                  <input
                    value={form.telefone}
                    onChange={(e) => setForm((p) => ({ ...p, telefone: e.target.value }))}
                    style={{ width: "100%", marginTop: 8 }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontWeight: 800 }}>E-mail</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    style={{ width: "100%", marginTop: 8 }}
                    required
                  />
                </div>

                <div>
                  <label style={{ fontWeight: 800 }}>Currículo (PDF)</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setForm((p) => ({ ...p, arquivo: e.target.files?.[0] || null }))}
                    style={{ width: "100%", marginTop: 8 }}
                    required
                  />
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <label style={{ fontWeight: 800 }}>Mensagem (opcional)</label>
                <textarea
                  value={form.mensagem}
                  onChange={(e) => setForm((p) => ({ ...p, mensagem: e.target.value }))}
                  style={{ width: "100%", marginTop: 8, minHeight: 90 }}
                  placeholder="Conte algo sobre sua experiência, disponibilidade, etc."
                />
              </div>

              {isPCD ? (
                <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: "#f1f5f9" }}>
                  <strong>🌱 Programa de Inclusão PCD</strong>
                  <div style={{ color: "#475569", marginTop: 6 }}>
                    A Happening Logística valoriza a diversidade e incentiva a candidatura de profissionais com deficiência (PCD).
                  </div>
                </div>
              ) : null}

              <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn btnPrimary" type="submit" disabled={status.type === "sending"}>
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
