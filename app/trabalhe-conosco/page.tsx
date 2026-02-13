// app/trabalhe-conosco/page.tsx
"use client";

import { useMemo, useState } from "react";

const MAX_MB = 5;

const UNIDADES = [
  "Matriz — Sertãozinho/SP",
  "Filial — São Paulo/SP",
  "Filial — Aroeira/MG",
  "Filial — Santa Juliana/MG",
  "Filial — Tropical/GO",
];

export default function TrabalheConoscoPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [msg, setMsg] = useState<string>("");

  const [unidade, setUnidade] = useState(UNIDADES[0]);
  const [cargo, setCargo] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const fileHint = useMemo(() => {
    if (!file) return `Aceitamos PDF até ${MAX_MB}MB.`;
    const sizeMb = file.size / (1024 * 1024);
    return `${file.name} — ${sizeMb.toFixed(2)}MB`;
  }, [file]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setMsg("");

    if (!nome.trim() || !email.trim() || !telefone.trim() || !cargo.trim()) {
      setStatus("err");
      setMsg("Preencha Nome, E-mail, Telefone e Cargo pretendido.");
      return;
    }

    if (!file) {
      setStatus("err");
      setMsg("Anexe o currículo em PDF.");
      return;
    }

    const sizeMb = file.size / (1024 * 1024);
    if (sizeMb > MAX_MB) {
      setStatus("err");
      setMsg(`Arquivo excede o limite de ${MAX_MB}MB.`);
      return;
    }

    if (file.type !== "application/pdf") {
      setStatus("err");
      setMsg("Formato inválido. Envie apenas PDF.");
      return;
    }

    setStatus("sending");

    const fd = new FormData();
    fd.append("unidade", unidade);
    fd.append("cargo", cargo);
    fd.append("nome", nome);
    fd.append("email", email);
    fd.append("telefone", telefone);
    fd.append("mensagem", mensagem);
    fd.append("curriculo", file);

    // honeypot
    fd.append("website", "");

    try {
      const res = await fetch("/api/curriculo", { method: "POST", body: fd });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("err");
        setMsg(data?.error || "Não foi possível enviar. Tente novamente.");
        return;
      }

      setStatus("ok");
      setMsg("Currículo enviado com sucesso! Obrigado.");
      // opcional: limpar campos
      // setCargo(""); setNome(""); setEmail(""); setTelefone(""); setMensagem(""); setFile(null);
    } catch {
      setStatus("err");
      setMsg("Falha de rede. Verifique sua conexão e tente novamente.");
    }
  }

  return (
    <main className="servicos" style={{ background: "#f5f7fb" }}>
      <section className="servicosHero" style={{ paddingBottom: 26 }}>
        <div className="servicosHeroBg" />
        <div className="servicosHeroContent">
          <div className="badge">Trabalhe Conosco</div>
          <h1>Envie seu currículo</h1>
          <p>
            Selecione a unidade desejada, informe o cargo pretendido e anexe seu currículo em PDF.
          </p>
        </div>
      </section>

      <section className="servicosWrap" style={{ paddingTop: 26 }}>
        <div className="servicosContainer" style={{ gridTemplateColumns: "1fr", maxWidth: 860 }}>
          <div className="card" style={{ borderRadius: 22, padding: 18 }}>
            <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
              <div style={{ display: "grid", gap: 8 }}>
                <label style={{ fontWeight: 800, color: "#0f172a" }}>Unidade desejada</label>
                <select
                  value={unidade}
                  onChange={(e) => setUnidade(e.target.value)}
                  style={{
                    height: 44,
                    borderRadius: 12,
                    border: "1px solid #e7ebf3",
                    padding: "0 12px",
                    fontWeight: 700,
                    background: "#fff",
                  }}
                >
                  {UNIDADES.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ display: "grid", gap: 8 }}>
                  <label style={{ fontWeight: 800, color: "#0f172a" }}>Cargo pretendido</label>
                  <input
                    value={cargo}
                    onChange={(e) => setCargo(e.target.value)}
                    placeholder="Ex: Motorista, Mecânico, Administrativo..."
                    style={{
                      height: 44,
                      borderRadius: 12,
                      border: "1px solid #e7ebf3",
                      padding: "0 12px",
                      fontWeight: 700,
                    }}
                  />
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                  <label style={{ fontWeight: 800, color: "#0f172a" }}>Telefone/WhatsApp</label>
                  <input
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="(xx) xxxxx-xxxx"
                    style={{
                      height: 44,
                      borderRadius: 12,
                      border: "1px solid #e7ebf3",
                      padding: "0 12px",
                      fontWeight: 700,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gap: 10, gridTemplateColumns: "1fr 1fr" }}>
                <div style={{ display: "grid", gap: 8 }}>
                  <label style={{ fontWeight: 800, color: "#0f172a" }}>Nome</label>
                  <input
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Seu nome completo"
                    style={{
                      height: 44,
                      borderRadius: 12,
                      border: "1px solid #e7ebf3",
                      padding: "0 12px",
                      fontWeight: 700,
                    }}
                  />
                </div>

                <div style={{ display: "grid", gap: 8 }}>
                  <label style={{ fontWeight: 800, color: "#0f172a" }}>E-mail</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@exemplo.com"
                    style={{
                      height: 44,
                      borderRadius: 12,
                      border: "1px solid #e7ebf3",
                      padding: "0 12px",
                      fontWeight: 700,
                    }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                <label style={{ fontWeight: 800, color: "#0f172a" }}>Mensagem (opcional)</label>
                <textarea
                  value={mensagem}
                  onChange={(e) => setMensagem(e.target.value)}
                  placeholder="Conte rapidamente sua disponibilidade, experiência, etc."
                  rows={4}
                  style={{
                    borderRadius: 12,
                    border: "1px solid #e7ebf3",
                    padding: 12,
                    fontWeight: 600,
                  }}
                />
              </div>

              <div style={{ display: "grid", gap: 8 }}>
                <label style={{ fontWeight: 800, color: "#0f172a" }}>Currículo (PDF)</label>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                />
                <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>{fileHint}</div>
              </div>

              {msg ? (
                <div
                  style={{
                    padding: 12,
                    borderRadius: 12,
                    border: "1px solid #e7ebf3",
                    background: status === "ok" ? "#ecfdf5" : status === "err" ? "#fff1f2" : "#f8fafc",
                    color: "#0f172a",
                    fontWeight: 800,
                  }}
                >
                  {msg}
                </div>
              ) : null}

              <button
                className="btn btnPrimary"
                type="submit"
                disabled={status === "sending"}
                style={{ width: "fit-content" }}
              >
                {status === "sending" ? "Enviando..." : "Enviar currículo"}
              </button>

              <div style={{ fontSize: 12, color: "#64748b", fontWeight: 700 }}>
                * O envio é direcionado para o RH (em teste você pode apontar para outro e-mail via CURRICULO_TO).
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
