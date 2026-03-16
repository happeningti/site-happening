//app/cotacao/page.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Vendedor = { label: string; email: string; mostrar?: boolean };

const VENDEDORES: Vendedor[] = [
  { label: "Marcos Rueda", email: "comercial@happening.com.br", mostrar: true },

  { label: "Ricardo", email: "comercial1@happening.com.br", mostrar: false },
  { label: "Rafael", email: "comercial3@happening.com.br", mostrar: false },
  { label: "Beatriz", email: "comercial4@happening.com.br", mostrar: false },

  { label: "Giovanna", email: "comercial2@happening.com.br", mostrar: true },
];

function isValidEmail(email: string) {
  return /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@([a-z0-9-]+\.)+[a-z]{2,}$/i.test(
    email.trim()
  );
}

function maskTelefone(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const ddd = digits.slice(0, 2);
  const part1 = digits.slice(2, 7);
  const part2 = digits.slice(7, 11);

  if (!digits) return "";
  if (digits.length <= 2) return `(${ddd}`;
  if (digits.length <= 7) return `(${ddd}) ${digits.slice(2)}`;
  return `(${ddd}) ${part1}-${part2}`;
}

export default function CotacaoPage() {
  const [modo, setModo] = useState<"todos" | "um">("todos");

  const vendedoresParaEscolha = useMemo(
    () => VENDEDORES.filter((v) => v.mostrar !== false),
    []
  );

  const firstVisibleEmail =
    VENDEDORES.find((v) => v.mostrar !== false)?.email || VENDEDORES[0].email;

  const [vendedorEmail, setVendedorEmail] =
    useState<string>(firstVisibleEmail);

  const [nome, setNome] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [origem, setOrigem] = useState("");
  const [destino, setDestino] = useState("");
  const [tipo, setTipo] = useState("");
  const [peso, setPeso] = useState("");
  const [observacoes, setObservacoes] = useState("");

  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState<{ protocolo: string } | null>(null);

  const feedbackRef = useRef<HTMLDivElement | null>(null);

  const podeEnviar = useMemo(() => {
    if (!nome.trim()) return false;
    if (!empresa.trim()) return false;
    if (!telefone.trim()) return false;
    if (!email.trim()) return false;
    if (!origem.trim()) return false;
    if (!destino.trim()) return false;
    if (!tipo.trim()) return false;
    if (!peso.trim()) return false;

    if (!isValidEmail(email)) return false;

    if (modo === "um" && !vendedorEmail) return false;

    return true;
  }, [
    nome,
    empresa,
    telefone,
    email,
    origem,
    destino,
    tipo,
    peso,
    modo,
    vendedorEmail,
  ]);

  useEffect(() => {
    if (!sucesso && !erro) return;

    const s = window.setTimeout(() => {
      feedbackRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 50);

    const t = window.setTimeout(() => {
      setSucesso(null);
      setErro("");
    }, 5000);

    return () => {
      clearTimeout(s);
      clearTimeout(t);
    };
  }, [sucesso, erro]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErro("");
    setSucesso(null);

    if (!isValidEmail(email)) {
      setErro("Digite um e-mail válido.");
      return;
    }

    if (telefone.replace(/\D/g, "").length < 10) {
      setErro("Digite um telefone válido com DDD.");
      return;
    }

    setLoading(true);
    try {
      const payload: any = {
        nome: nome.trim(),
        empresa: empresa.trim(),
        telefone: telefone.trim(),
        email: email.trim(),
        origem: origem.trim(),
        destino: destino.trim(),
        tipo: tipo.trim(),
        peso: peso.trim(),
        observacoes: observacoes.trim() || undefined,
      };

      if (modo === "todos") {
        payload.enviarTodos = true;
      } else {
        payload.enviarTodos = false;
        payload.vendedorEmail = vendedorEmail;
      }

      const r = await fetch("/api/cotacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await r.json();

      if (!r.ok || !data?.success) {
        setErro(
          data?.error || "Não foi possível enviar sua cotação. Tente novamente."
        );
        return;
      }

      setSucesso({ protocolo: data.protocolo });

      setNome("");
      setEmpresa("");
      setTelefone("");
      setEmail("");
      setOrigem("");
      setDestino("");
      setTipo("");
      setPeso("");
      setObservacoes("");
      setModo("todos");
      setVendedorEmail(firstVisibleEmail);
    } catch {
      setErro("Erro inesperado ao enviar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        background:
          "linear-gradient(180deg,#021b16 0%, #063d2f 50%, #021b16 100%)",
        color: "#ffffff",
        minHeight: "100vh",
      }}
    >
      {/* HERO */}
      <div
        style={{
          background:
            "radial-gradient(1200px 600px at 22% 25%, rgba(11,122,75,0.22), transparent 60%)," +
            "radial-gradient(900px 520px at 80% 35%, rgba(34,197,94,0.14), transparent 55%)," +
            "linear-gradient(180deg, #0b1220 0%, #0b1220 70%, rgba(11,18,32,0.96) 100%)",
          padding: "44px 16px 36px",
          color: "#fff",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 14px",
              borderRadius: 999,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "rgba(255,255,255,0.88)",
              fontWeight: 700,
              fontSize: 13,
              marginBottom: 14,
            }}
          >
            Cotação
          </div>

          <h1
            style={{
              margin: 0,
              fontSize: 40,
              lineHeight: 1.1,
              fontWeight: 900,
              letterSpacing: -0.6,
              color: "#ffffff",
            }}
          >
            Solicite sua cotação
          </h1>

          <p
            style={{
              margin: "10px 0 0",
              maxWidth: 760,
              color: "rgba(255,255,255,0.88)",
              fontSize: 16,
              lineHeight: 1.7,
            }}
          >
            Preencha os dados da operação e envie sua solicitação. Nossa equipe
            comercial retornará por e-mail com o atendimento da sua cotação.
          </p>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 16px 48px" }}>
        <form
          onSubmit={onSubmit}
          style={{
            maxWidth: 760,
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: 18,
            boxShadow: "0 12px 28px rgba(0,0,0,0.10)",
            padding: 22,
            border: "1px solid #e7ebf3",
          }}
        >
          {/* SELEÇÃO */}
          <div
            style={{
              border: "1px solid #e7ebf3",
              borderRadius: 14,
              padding: 16,
              marginBottom: 18,
              background: "#f8fafc",
            }}
          >
            <div
              style={{
                fontWeight: 800,
                marginBottom: 10,
                color: "#0f172a",
              }}
            >
              Para quem deseja enviar?
            </div>

            <label
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="radio"
                name="modo"
                checked={modo === "todos"}
                onChange={() => setModo("todos")}
              />
              <span>
                Enviar para todos os vendedores{" "}
                <span style={{ color: "#667085" }}>(padrão)</span>
              </span>
            </label>

            <div style={{ height: 8 }} />

            <label
              style={{
                display: "flex",
                gap: 10,
                alignItems: "center",
                cursor: "pointer",
                color: "#334155",
              }}
            >
              <input
                type="radio"
                name="modo"
                checked={modo === "um"}
                onChange={() => setModo("um")}
              />
              <span>Escolher um vendedor</span>
            </label>

            <div style={{ marginTop: 12, opacity: modo === "um" ? 1 : 0.55 }}>
              <select
                disabled={modo !== "um"}
                value={vendedorEmail}
                onChange={(e) => setVendedorEmail(e.target.value)}
                style={{
                  width: "100%",
                  height: 44,
                  borderRadius: 10,
                  border: "1px solid #d9e1f0",
                  padding: "0 12px",
                  background: modo === "um" ? "#fff" : "#f3f5f9",
                  color: "#0f172a",
                }}
              >
                {vendedoresParaEscolha.map((v) => (
                  <option key={v.email} value={v.email}>
                    {v.label} — {v.email}
                  </option>
                ))}
              </select>

              <div style={{ marginTop: 6, fontSize: 12, color: "#667085" }}>
                Se escolher “um vendedor”, ele receberá a cotação e responderá
                diretamente para seu e-mail.
              </div>
            </div>
          </div>

          {/* CAMPOS */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
            }}
          >
            <Field label="Nome">
              <input
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
                style={inputStyle}
              />
            </Field>

            <Field label="Empresa">
              <input
                value={empresa}
                onChange={(e) => setEmpresa(e.target.value)}
                placeholder="Nome da empresa"
                style={inputStyle}
              />
            </Field>

            <Field label="Telefone">
              <input
                value={telefone}
                onChange={(e) => setTelefone(maskTelefone(e.target.value))}
                placeholder="(16) 99999-9999"
                style={inputStyle}
                inputMode="tel"
              />
            </Field>

            <Field label="E-mail">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="seuemail@empresa.com.br"
                style={inputStyle}
                inputMode="email"
              />
            </Field>

            <Field label="Origem">
              <input
                value={origem}
                onChange={(e) => setOrigem(e.target.value)}
                placeholder="Cidade/UF"
                style={inputStyle}
              />
            </Field>

            <Field label="Destino">
              <input
                value={destino}
                onChange={(e) => setDestino(e.target.value)}
                placeholder="Cidade/UF"
                style={inputStyle}
              />
            </Field>

            <Field label="Tipo de carga">
              <input
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                placeholder="Ex: Carga fracionada"
                style={inputStyle}
              />
            </Field>

            <Field label="Peso (kg)">
              <input
                value={peso}
                onChange={(e) => setPeso(e.target.value.replace(/[^\d.,]/g, ""))}
                placeholder="Ex: 1000"
                style={inputStyle}
                inputMode="numeric"
              />
            </Field>
          </div>

          {/* OBS */}
          <div style={{ marginTop: 14 }}>
            <div
              style={{
                fontWeight: 700,
                marginBottom: 6,
                color: "#0f172a",
              }}
            >
              Observações
            </div>

            <textarea
              value={observacoes}
              onChange={(e) => setObservacoes(e.target.value)}
              placeholder="Descreva detalhes importantes: volumes, medidas, coleta/entrega, urgência, etc."
              style={{
                width: "100%",
                minHeight: 110,
                borderRadius: 10,
                border: "1px solid #d9e1f0",
                padding: 12,
                resize: "vertical",
                outline: "none",
                color: "#0f172a",
                background: "#ffffff",
              }}
            />
          </div>

          {/* BOTÃO */}
          <div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <button
              type="submit"
              disabled={!podeEnviar || loading}
              style={{
                height: 44,
                padding: "0 18px",
                borderRadius: 10,
                border: "none",
                background: !podeEnviar || loading ? "#9ec8b5" : "#0b7a4b",
                color: "#fff",
                fontWeight: 800,
                cursor: !podeEnviar || loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Enviando..." : "Enviar cotação"}
            </button>

            <div style={{ fontSize: 12, color: "#667085" }}>
              Após enviar, você receberá um e-mail de confirmação.
            </div>
          </div>

          <div style={{ marginTop: 10, fontSize: 12, color: "#667085" }}>
            • O vendedor responderá diretamente para o e-mail informado no
            formulário.
          </div>

          {/* FEEDBACK */}
          <div ref={feedbackRef}>
            {sucesso && (
              <div
                style={{
                  marginTop: 14,
                  padding: 12,
                  backgroundColor: "#e6f4ea",
                  color: "#1e7e34",
                  borderRadius: 8,
                  fontWeight: 700,
                }}
              >
                ✅ Cotação enviada com sucesso! Protocolo:{" "}
                <b>{sucesso.protocolo}</b>
                <div
                  style={{
                    fontWeight: 400,
                    marginTop: 6,
                    fontSize: 12,
                  }}
                >
                  Esta mensagem será ocultada automaticamente em 5 segundos.
                </div>
              </div>
            )}

            {erro && (
              <div
                style={{
                  marginTop: 14,
                  padding: 12,
                  backgroundColor: "#fdecea",
                  color: "#c82333",
                  borderRadius: 8,
                  fontWeight: 700,
                }}
              >
                ❌ {erro}
                <div
                  style={{
                    fontWeight: 400,
                    marginTop: 6,
                    fontSize: 12,
                  }}
                >
                  Esta mensagem será ocultada automaticamente em 5 segundos.
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div
        style={{
          fontWeight: 700,
          marginBottom: 6,
          color: "#0f172a",
        }}
      >
        {label}
      </div>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  height: 44,
  borderRadius: 10,
  border: "1px solid #d9e1f0",
  padding: "0 12px",
  outline: "none",
  color: "#0f172a",
  background: "#ffffff",
};