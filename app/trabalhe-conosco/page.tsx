// app/trabalhe-conosco/page.tsx
"use client";

import { useMemo, useState } from "react";

type Vaga = {
  id: string;
  titulo: string;
  local: string; // ex: "Sertãozinho/SP"
  descricao: string;
  imagem?: string; // ex: "/vagas/operador-empilhadeira.jpg"
  requisitos?: string[];
  pcd?: boolean; // se true, mostra "vaga disponível também para PCD"
  ativa?: boolean; // se false, não aparece na lista
};

const UNIDADES = [
  "Matriz — Sertãozinho/SP",
  "Filial — São Paulo/SP",
  "Filial — Aroeira/MG",
  "Filial — Santa Juliana/MG",
  "Filial — Tropical/GO",
] as const;

// ✅ VAGAS: quando não tiver vaga, deixe vazio: []
// Quando tiver, é só adicionar aqui que aparece no site automaticamente.
const VAGAS: Vaga[] = [
  {
    id: "operador-empilhadeira",
    titulo: "Operador de Empilhadeira",
    local: "Sertãozinho/SP",
    descricao:
      "Atuação com empilhadeira e entregas de fracionados.",
    imagem: "/vagas/operador-empilhadeira.jpg",
    requisitos: [
      "Experiência com empilhadeira e entregas de fracionados",
      "CNH categoria B",
      "Ensino médio completo",
    ],
    pcd: true, // ✅ mostra frase PCD
    ativa: true,
  },

  // Exemplo de vaga NÃO PCD:
  // {
  //   id: "motorista-carreteiro",
  //   titulo: "Motorista Carreteiro",
  //   local: "São Paulo/SP",
  //   descricao: "Operação rodoviária com foco em segurança e cumprimento de janelas.",
  //   imagem: "/vagas/motorista-carreteiro.jpg",
  //   requisitos: ["CNH E", "Experiência comprovada", "Disponibilidade de horário"],
  //   pcd: false, // ✅ NÃO mostra a frase PCD
  //   ativa: true,
  // },
];

type FormTipo = "espontaneo" | "pcd" | "vaga";

function onlyDigits(s: string) {
  return (s || "").replace(/\D+/g, "");
}

export default function TrabalheConoscoPage() {
  const vagasAtivas = useMemo(
    () => VAGAS.filter((v) => v.ativa !== false),
    []
  );

  const [tipo, setTipo] = useState<FormTipo>("espontaneo");
  const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  // Campos do formulário
  const [unidade, setUnidade] = useState<string>(String(UNIDADES[0]));
  const [cargoPretendido, setCargoPretendido] = useState<string>("");
  const [nome, setNome] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mensagem, setMensagem] = useState<string>("");
  const [arquivo, setArquivo] = useState<File | null>(null);

  function abrirFormularioEspontaneo(isPcd: boolean) {
    setTipo(isPcd ? "pcd" : "espontaneo");
    setVagaSelecionada(null);
    setCargoPretendido("");
    setMsg(null);

    // rola para o formulário
    setTimeout(() => {
      document.getElementById("form-curriculo")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  function candidatarVaga(v: Vaga) {
    setTipo("vaga");
    setVagaSelecionada(v);
    setCargoPretendido(v.titulo); // ✅ cargo pretendido vai preenchido com a vaga
    setMsg(null);

    setTimeout(() => {
      document.getElementById("form-curriculo")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);

    // validações simples
    if (!nome.trim() || !telefone.trim() || !email.trim()) {
      setMsg({ ok: false, text: "Preencha nome, telefone e e-mail." });
      return;
    }

    // cargo pretendido obrigatório (você pediu isso)
    if (!cargoPretendido.trim()) {
      setMsg({ ok: false, text: "Preencha o cargo pretendido." });
      return;
    }

    if (!arquivo) {
      setMsg({ ok: false, text: "Anexe seu currículo em PDF." });
      return;
    }
    if (arquivo.type !== "application/pdf") {
      setMsg({ ok: false, text: "O currículo deve ser um arquivo PDF." });
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.set("tipo", tipo); // espontaneo | pcd | vaga
      fd.set("nome", nome);
      fd.set("telefone", telefone);
      fd.set("email", email);
      fd.set("unidade", unidade);
      fd.set("mensagem", mensagem);
      fd.set("cargoPretendido", cargoPretendido); // ✅ NOVO (vai no e-mail)

      if (tipo === "vaga" && vagaSelecionada) {
        fd.set("vagaTitulo", vagaSelecionada.titulo);
        fd.set("vagaUnidade", vagaSelecionada.local);
      }

      fd.set("arquivo", arquivo);

      const res = await fetch("/api/curriculo", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setMsg({ ok: false, text: data?.message || "Erro ao enviar. Tente novamente." });
        return;
      }

      setMsg({ ok: true, text: "Currículo enviado com sucesso! Em breve o RH pode entrar em contato." });

      // limpa só alguns campos
      setMensagem("");
      setArquivo(null);

      // se foi vaga, mantém selecionada (opcional)
    } catch {
      setMsg({ ok: false, text: "Erro ao enviar. Verifique sua conexão e tente novamente." });
    } finally {
      setLoading(false);
    }
  }

  const tituloHero =
    tipo === "vaga" && vagaSelecionada
      ? `Candidatura — ${vagaSelecionada.titulo}`
      : tipo === "pcd"
      ? "Programa de Inclusão PCD"
      : "Banco de Talentos";

  return (
    <main className="contato">
      {/* HERO (mesma identidade do site) */}
      <section className="servicosHero" style={{ borderBottom: "1px solid #e7ebf3" }}>
        <div className="servicosHeroBg" />
        <div className="servicosHeroContent">
          <div className="badge">Trabalhe Conosco</div>
          <h1>Trabalhe na Happening</h1>
          <p>
            Veja as vagas abertas ou envie seu currículo para nosso banco de talentos. Também incentivamos
            candidaturas de profissionais com deficiência (PCD).
          </p>

          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              type="button"
              className="btn btnPrimary"
              onClick={() => abrirFormularioEspontaneo(false)}
            >
              Enviar currículo
            </button>

            <button
              type="button"
              className="btn btnSoft"
              onClick={() => abrirFormularioEspontaneo(true)}
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

          {vagasAtivas.length === 0 ? (
            <div className="card" style={{ padding: 18 }}>
              <h3 style={{ marginTop: 0 }}>Não há vagas disponíveis no momento</h3>
              <p style={{ marginBottom: 0, color: "#334155" }}>
                Você ainda pode enviar seu currículo para o banco de talentos (inclusive PCD) pelos botões acima.
              </p>
            </div>
          ) : (
            <div className="grid3" style={{ alignItems: "stretch" }}>
              {vagasAtivas.map((v) => (
                <div key={v.id} className="card" style={{ overflow: "hidden" }}>
                  {v.imagem ? (
                    <div style={{ margin: "-18px -18px 14px" }}>
                      <img
                        src={v.imagem}
                        alt={`Vaga: ${v.titulo}`}
                        style={{ width: "100%", height: 180, objectFit: "cover", display: "block" }}
                      />
                    </div>
                  ) : null}

                  <h3 style={{ marginTop: 0 }}>{v.titulo}</h3>

                  <p style={{ marginBottom: 10 }}>
                    <strong>Local:</strong> {v.local}
                  </p>

                  <p style={{ marginBottom: 12, color: "#334155" }}>
                    {v.descricao}{" "}
                    {/* ✅ Só mostra se a vaga permitir PCD */}
                    {v.pcd ? (
                      <span style={{ fontWeight: 800 }}>Vaga disponível também para PCD.</span>
                    ) : null}
                  </p>

                  {/* ✅ Só renderiza requisitos se existir */}
                  {v.requisitos && v.requisitos.length > 0 ? (
                    <div style={{ marginTop: 6 }}>
                      <strong>Requisitos</strong>
                      <ul style={{ marginTop: 8, paddingLeft: 18, color: "#0f172a" }}>
                        {v.requisitos.map((r: string) => (
                          <li key={r} style={{ marginBottom: 4 }}>
                            {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  <div style={{ marginTop: 14 }}>
                    <button
                      type="button"
                      className="btn btnPrimary"
                      onClick={() => candidatarVaga(v)}
                    >
                      Candidatar-se
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FORMULÁRIO */}
      <section className="section" id="form-curriculo" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="card" style={{ padding: 18 }}>
            <h2 style={{ marginTop: 0 }}>{tituloHero}</h2>
            <p style={{ color: "#334155" }}>
              Preencha os dados abaixo e anexe seu currículo em PDF. O envio vai direto para o RH e o retorno será
              feito pelo e-mail informado.
            </p>

            <form onSubmit={onSubmit} style={{ marginTop: 14 }}>
              <div className="grid2">
                <div>
                  <label className="label">Unidade desejada</label>
                  <select
                    className="input"
                    value={unidade}
                    onChange={(e) => setUnidade(e.target.value)}
                  >
                    {UNIDADES.map((u) => (
                      <option key={u} value={u}>
                        {u}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="label">Cargo pretendido</label>
                  <input
                    className="input"
                    value={cargoPretendido}
                    onChange={(e) => setCargoPretendido(e.target.value)}
                    placeholder="Ex: Operador de Empilhadeira, Auxiliar, Administrativo..."
                    disabled={tipo === "vaga"} // ✅ em vaga fica travado (igual a vaga)
                  />
                </div>

                <div>
                  <label className="label">Nome</label>
                  <input className="input" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>

                <div>
                  <label className="label">Telefone/WhatsApp</label>
                  <input
                    className="input"
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(16) 99999-9999"
                  />
                </div>

                <div>
                  <label className="label">E-mail</label>
                  <input
                    className="input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                  />
                </div>

                <div>
                  <label className="label">Currículo (PDF)</label>
                  <input
                    className="input"
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setArquivo(e.target.files?.[0] || null)}
                  />
                  {arquivo ? (
                    <small style={{ color: "#64748b" }}>
                      Selecionado: {arquivo.name} — {(arquivo.size / 1024 / 1024).toFixed(2)}MB
                    </small>
                  ) : null}
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <label className="label">Mensagem (opcional)</label>
                <textarea
                  className="input"
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  rows={4}
                  placeholder="Escreva algo se quiser (ex: experiência, disponibilidade, etc.)"
                />
              </div>

              {msg ? (
                <div
                  style={{
                    marginTop: 12,
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid #e2e8f0",
                    background: msg.ok ? "rgba(11,122,75,0.08)" : "rgba(239,68,68,0.08)",
                    color: "#0f172a",
                    fontWeight: 700,
                  }}
                >
                  {msg.text}
                </div>
              ) : null}

              <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn btnPrimary" type="submit" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar currículo"}
                </button>

                {tipo === "vaga" && vagaSelecionada ? (
                  <button
                    type="button"
                    className="btn btnSoft"
                    onClick={() => abrirFormularioEspontaneo(false)}
                    disabled={loading}
                  >
                    Enviar para Banco de Talentos
                  </button>
                ) : null}
              </div>

              <p style={{ marginTop: 10, color: "#64748b", fontSize: 13 }}>
                * O envio é direcionado ao RH e o retorno será feito pelo e-mail informado.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
