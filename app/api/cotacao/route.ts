import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type CotacaoBody = {
  nome: string;
  empresa: string;
  telefone: string;
  email: string; // email do cliente
  origem: string;
  destino: string;
  tipo: string;
  peso: string;
  observacoes?: string;

  // seleção simplificada
  vendedorEmail?: string; // um vendedor
  enviarTodos?: boolean;  // todos
};

function parseEmailList(value?: string): string[] {
  if (!value) return [];
  return value
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function escapeHtml(str: string) {
  return str
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as CotacaoBody;

    // --- validações básicas ---
    const required = ["nome", "empresa", "telefone", "email", "origem", "destino", "tipo", "peso"] as const;
    for (const k of required) {
      const v = (body as any)[k];
      if (!v || String(v).trim() === "") {
        return NextResponse.json(
          { success: false, error: `Campo obrigatório ausente: ${k}` },
          { status: 400 }
        );
      }
    }

    const clienteEmail = String(body.email).trim().toLowerCase();
    if (!isValidEmail(clienteEmail)) {
      return NextResponse.json({ success: false, error: "E-mail do cliente inválido" }, { status: 400 });
    }

    // --- ENV ---
    const EMAIL_HOST = process.env.EMAIL_HOST;
    const EMAIL_PORT = process.env.EMAIL_PORT;
    const EMAIL_USER = process.env.EMAIL_USER;
    const EMAIL_PASS = process.env.EMAIL_PASS;

    const VENDORES_FIXOS = parseEmailList(process.env.VENDEDORES_EMAILS).map((e) => e.toLowerCase());
    const GERENTES = parseEmailList(process.env.GERENTE_EMAIL).map((e) => e.toLowerCase());
    const TI_BCC = parseEmailList(process.env.TI_EMAIL).map((e) => e.toLowerCase());

    if (!EMAIL_HOST || !EMAIL_PORT || !EMAIL_USER || !EMAIL_PASS) {
      return NextResponse.json(
        { success: false, error: "Configuração de e-mail incompleta no .env.local" },
        { status: 500 }
      );
    }

    if (VENDORES_FIXOS.length !== 5) {
      return NextResponse.json(
        { success: false, error: `VENDEDORES_EMAILS deve ter exatamente 5 e-mails. Hoje tem: ${VENDORES_FIXOS.length}` },
        { status: 500 }
      );
    }

    // --- resolve destino (um ou todos) ---
    const enviarTodos = !!body.enviarTodos;

    const vendedoresSelecionados = (() => {
      if (enviarTodos) return [...VENDORES_FIXOS];

      const chosen = (body.vendedorEmail || "").trim().toLowerCase();
      if (!chosen) return [];
      return [chosen];
    })();

    if (vendedoresSelecionados.length === 0) {
      return NextResponse.json(
        { success: false, error: "Selecione um vendedor ou marque 'enviar para todos'." },
        { status: 400 }
      );
    }

    // segurança: só permite os fixos
    const invalidos = vendedoresSelecionados.filter((e) => !VENDORES_FIXOS.includes(e));
    if (invalidos.length) {
      return NextResponse.json(
        { success: false, error: `Vendedor inválido (não permitido): ${invalidos.join(", ")}` },
        { status: 400 }
      );
    }

    // --- transporter ---
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: true,
      auth: { user: EMAIL_USER, pass: EMAIL_PASS },
    });

    // (opcional, mas ajuda a diagnosticar)
    // await transporter.verify();

    const protocolo = `COT-${Date.now()}-${Math.floor(Math.random() * 9000 + 1000)}`;

    const obs = (body.observacoes || "").trim();

    // --- HTML interno (vendedores/gerente/TI oculto) ---
    const htmlInterno = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color:#111;">
        <h2 style="margin:0 0 8px;">Nova Cotação Recebida</h2>
        <p style="margin:0 0 12px; color:#666;">Protocolo: <b>${escapeHtml(protocolo)}</b></p>

        <table cellpadding="6" cellspacing="0" style="border-collapse: collapse;">
          <tr><td><b>Nome:</b></td><td>${escapeHtml(body.nome)}</td></tr>
          <tr><td><b>Empresa:</b></td><td>${escapeHtml(body.empresa)}</td></tr>
          <tr><td><b>Telefone:</b></td><td>${escapeHtml(body.telefone)}</td></tr>
          <tr><td><b>E-mail:</b></td><td><a href="mailto:${escapeHtml(clienteEmail)}">${escapeHtml(clienteEmail)}</a></td></tr>
          <tr><td><b>Origem:</b></td><td>${escapeHtml(body.origem)}</td></tr>
          <tr><td><b>Destino:</b></td><td>${escapeHtml(body.destino)}</td></tr>
          <tr><td><b>Tipo:</b></td><td>${escapeHtml(body.tipo)}</td></tr>
          <tr><td><b>Peso:</b></td><td>${escapeHtml(body.peso)}</td></tr>
          <tr>
            <td><b>Observações:</b></td>
            <td style="white-space: pre-line;">${escapeHtml(obs || "—")}</td>
          </tr>
        </table>

        <p style="margin:16px 0 0; color:#666; font-size:12px;">
          Enviado automaticamente pelo site Happening.
        </p>
      </div>
    `;

    // --- HTML cliente (confirmação) ---
    const htmlCliente = `
      <div style="font-family: Arial, sans-serif; font-size: 14px; color:#111;">
        <h2 style="margin:0 0 8px;">Recebemos sua solicitação de cotação</h2>
        <p style="margin:0 0 12px; color:#444;">
          Olá <b>${escapeHtml(body.nome)}</b>, sua solicitação foi recebida com sucesso.
          Em breve um de nossos vendedores entrará em contato.
        </p>

        <p style="margin:0 0 10px; color:#666;">
          Protocolo: <b>${escapeHtml(protocolo)}</b>
        </p>

        <div style="padding:12px; border:1px solid #eee; border-radius:8px; background:#fafafa;">
          <p style="margin:0 0 6px;"><b>Origem:</b> ${escapeHtml(body.origem)}</p>
          <p style="margin:0 0 6px;"><b>Destino:</b> ${escapeHtml(body.destino)}</p>
          <p style="margin:0 0 6px;"><b>Tipo:</b> ${escapeHtml(body.tipo)}</p>
          <p style="margin:0 0 6px;"><b>Peso:</b> ${escapeHtml(body.peso)}</p>
          <p style="margin:0;"><b>Observações:</b> <span style="white-space: pre-line;">${escapeHtml(obs || "—")}</span></p>
        </div>

        <p style="margin:16px 0 0; color:#666; font-size:12px;">
          Esta é uma mensagem automática do site Happening.
        </p>
      </div>
    `;

    const fromName = "Happening Logística";
    const fromEmail = EMAIL_USER;

    // LOGS (pra você bater o olho e ver se está indo CC/BCC certo)
    console.log("[COTACAO] protocolo:", protocolo);
    console.log("[COTACAO] to(vendedores):", vendedoresSelecionados.join(", "));
    console.log("[COTACAO] cc(gerentes):", GERENTES.join(", ") || "(vazio)");
    console.log("[COTACAO] bcc(TI):", TI_BCC.join(", ") || "(vazio)");

    // 1) Email para vendedor(es) + CC gerentes + BCC TI
    await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: vendedoresSelecionados.join(", "),
      cc: GERENTES.length ? GERENTES.join(", ") : undefined,
      bcc: TI_BCC.length ? TI_BCC.join(", ") : undefined,

      // quando o vendedor clicar Responder, vai direto pro cliente
      replyTo: clienteEmail,

      subject: `Nova Cotação Recebida - ${protocolo}`,
      html: htmlInterno,
    });

    // 2) Confirmação automática para o cliente
    await transporter.sendMail({
      from: `${fromName} <${fromEmail}>`,
      to: clienteEmail,

      // se o cliente responder a confirmação, vai pro cotacao@
      replyTo: fromEmail,

      subject: `Recebemos sua solicitação de cotação - ${protocolo}`,
      html: htmlCliente,
    });

    return NextResponse.json({ success: true, protocolo });
  } catch (error) {
    console.error("Erro /api/cotacao:", error);
    return NextResponse.json({ success: false, error: "Erro ao enviar e-mail" }, { status: 500 });
  }
}
