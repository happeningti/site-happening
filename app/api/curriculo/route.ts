//pp/api/curriculo/route.ts
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_PDF_BYTES = 5 * 1024 * 1024; // 5MB
const MAX_FIELD_LENGTH = 1000;
const MAX_MESSAGE_LENGTH = 4000;

function missingEnv(keys: string[]) {
  return keys.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function normalizeText(s: string) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function cleanOneLine(value: FormDataEntryValue | null, max = MAX_FIELD_LENGTH) {
  return String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function cleanMultiLine(value: FormDataEntryValue | null, max = MAX_MESSAGE_LENGTH) {
  return String(value || "")
    .replace(/\r/g, "")
    .trim()
    .slice(0, max);
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function looksSuspicious(value: string) {
  const t = normalizeText(value);

  const patterns = [
    "http://",
    "https://",
    "<a ",
    "<script",
    "viagra",
    "casino",
    "bitcoin",
    "seo",
    "loan",
    "porn",
  ];

  return patterns.some((p) => t.includes(p));
}

function maskEmail(email: string) {
  const [user, domain] = email.split("@");
  if (!user || !domain) return "***";
  if (user.length <= 2) return `${user[0] || "*"}***@${domain}`;
  return `${user.slice(0, 2)}***@${domain}`;
}

function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length < 4) return "***";
  return `***${digits.slice(-4)}`;
}

function resolveDestination(params: { unidade: string; vagaLocal: string }) {
  const base = String(process.env.CURRICULO_TO || "").trim();
  const text = normalizeText(`${params.vagaLocal} ${params.unidade}`);

  if (text.includes("aroeira") || text.includes("tupaciguara")) {
    return String(process.env.CURRICULO_TO_AROEIRA || base).trim();
  }

  if (text.includes("santa juliana")) {
    return String(process.env.CURRICULO_TO_SANTA_JULIANA || base).trim();
  }

  if (text.includes("tropical")) {
    return String(process.env.CURRICULO_TO_TROPICAL || base).trim();
  }

  if (text.includes("sao paulo")) {
    return String(process.env.CURRICULO_TO_SP || base).trim();
  }

  if (text.includes("sertaozinho") || text.includes("matriz")) {
    return String(process.env.CURRICULO_TO_SERTOZINHO || base).trim();
  }

  return base;
}

function resolveUnitLabel(params: { unidade: string; vagaLocal: string; isVaga: boolean }) {
  const source = params.isVaga ? params.vagaLocal || params.unidade : params.unidade;
  const text = normalizeText(source);

  if (text.includes("aroeira") || text.includes("tupaciguara")) {
    return "Filial Aroeira / Tupaciguara-MG";
  }

  if (text.includes("santa juliana")) {
    return "Filial Santa Juliana/MG";
  }

  if (text.includes("tropical")) {
    return "Filial Tropical/GO";
  }

  if (text.includes("sao paulo")) {
    return "Filial São Paulo/SP";
  }

  if (text.includes("sertaozinho") || text.includes("matriz")) {
    return "Matriz Sertãozinho/SP";
  }

  return source || "Não identificado";
}

function buildSubject(params: {
  isVaga: boolean;
  vagaTitulo: string;
  cargo: string;
  unidadeLabel: string;
  pcd: boolean;
}) {
  const prefix = params.pcd ? "[PCD] " : "";
  const base = params.isVaga
    ? `Currículo - ${params.vagaTitulo || params.cargo || "Vaga"}`
    : `Currículo - Banco de Talentos`;

  return `${prefix}${base} | ${params.unidadeLabel}`;
}

function getClientIp(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "ip-nao-informado"
  );
}

export async function POST(req: Request) {
  try {
    const required = [
      "CURRICULO_HOST",
      "CURRICULO_PORT",
      "CURRICULO_SECURE",
      "CURRICULO_USER",
      "CURRICULO_PASS",
      "CURRICULO_TO",
    ];

    const miss = missingEnv(required);
    if (miss.length) {
      console.error("[curriculo] configuração incompleta:", miss);
      return Response.json(
        {
          ok: false,
          error: `Configuração de e-mail incompleta: faltando ${miss.join(", ")}.`,
        },
        { status: 400 }
      );
    }

    const ip = getClientIp(req);
    const userAgent = req.headers.get("user-agent") || "user-agent-nao-informado";
    const referer = req.headers.get("referer") || "referer-nao-informado";

    const fd = await req.formData();

    // honeypot anti-spam
    const website = cleanOneLine(fd.get("website"), 200);
    if (website) {
      console.warn("[curriculo][spam-blocked] honeypot preenchido", {
        ip,
        referer,
        userAgent,
      });
      return Response.json({ ok: true });
    }

    // campos principais
    const nome = cleanOneLine(fd.get("nome"));
    const telefone = cleanOneLine(fd.get("telefone"), 50);
    const email = cleanOneLine(fd.get("email"), 150);
    const unidade = cleanOneLine(fd.get("unidade"), 200);
    const cargo = cleanOneLine(fd.get("cargo"), 200);
    const mensagem = cleanMultiLine(fd.get("mensagem"));

    // vaga
    const vagaId = cleanOneLine(fd.get("vaga_id"), 100);
    const vagaTitulo = cleanOneLine(fd.get("vaga_titulo"), 200);
    const vagaLocal = cleanOneLine(fd.get("vaga_local"), 250);
    const vagaSafra = cleanOneLine(fd.get("vaga_safra"), 100);

    // pcd
    const pcd = cleanOneLine(fd.get("pcd"), 5) === "1";
    const pcdTipo = cleanOneLine(fd.get("pcd_tipo"), 100);
    const pcdAdaptacao = cleanOneLine(fd.get("pcd_adaptacao"), 300);

    const arquivo = fd.get("arquivo");

    if (!nome || !telefone || !email) {
      return Response.json(
        { ok: false, error: "Preencha nome, telefone e e-mail." },
        { status: 400 }
      );
    }

    if (!cargo) {
      return Response.json(
        { ok: false, error: "Preencha o cargo pretendido." },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return Response.json(
        { ok: false, error: "Informe um e-mail válido." },
        { status: 400 }
      );
    }

    if (!(arquivo instanceof File)) {
      return Response.json(
        { ok: false, error: "Anexe seu currículo em PDF." },
        { status: 400 }
      );
    }

    if (arquivo.type !== "application/pdf") {
      return Response.json(
        { ok: false, error: "O currículo deve ser um arquivo PDF." },
        { status: 400 }
      );
    }

    const fileName = cleanOneLine(arquivo.name || "curriculo.pdf", 200);
    const fileNameLower = fileName.toLowerCase();

    if (fileName && !fileNameLower.endsWith(".pdf")) {
      return Response.json(
        { ok: false, error: "O arquivo anexado deve ter a extensão .pdf." },
        { status: 400 }
      );
    }

    const size = Number((arquivo as File).size ?? 0);
    if (size > MAX_PDF_BYTES) {
      return Response.json(
        { ok: false, error: "O PDF excede o tamanho máximo permitido de 5MB." },
        { status: 400 }
      );
    }

    // filtro simples anti-spam
    const combinedText = [nome, email, cargo, mensagem, pcdTipo, pcdAdaptacao].join(" ");
    if (looksSuspicious(combinedText)) {
      console.warn("[curriculo][spam-blocked] conteúdo suspeito", {
        ip,
        email: maskEmail(email),
        telefone: maskPhone(telefone),
      });
      return Response.json(
        { ok: false, error: "Não foi possível processar o envio." },
        { status: 400 }
      );
    }

    const buf = Buffer.from(await arquivo.arrayBuffer());

    if (buf.length > MAX_PDF_BYTES) {
      return Response.json(
        { ok: false, error: "O PDF excede o tamanho máximo permitido de 5MB." },
        { status: 400 }
      );
    }

    const isVaga = Boolean(vagaId || vagaTitulo || vagaLocal);
    const unidadeLabel = resolveUnitLabel({ unidade, vagaLocal, isVaga });
    const destination = resolveDestination({ unidade, vagaLocal });
    const subject = buildSubject({
      isVaga,
      vagaTitulo,
      cargo,
      unidadeLabel,
      pcd,
    });

    const transport = nodemailer.createTransport({
      host: process.env.CURRICULO_HOST,
      port: Number(process.env.CURRICULO_PORT),
      secure: String(process.env.CURRICULO_SECURE) === "true",
      auth: {
        user: process.env.CURRICULO_USER,
        pass: process.env.CURRICULO_PASS,
      },
    });

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif; line-height:1.5; color:#0f172a;">
        <div style="max-width:760px; margin:0 auto; border:1px solid #e2e8f0; border-radius:14px; overflow:hidden;">
          <div style="background:#0f5132; color:#fff; padding:18px 20px;">
            <div style="font-size:12px; opacity:.9; text-transform:uppercase; letter-spacing:.4px;">
              Site Happening Logística
            </div>
            <h2 style="margin:8px 0 0; font-size:22px;">${escapeHtml(subject)}</h2>
          </div>

          <div style="padding:20px;">
            <div style="margin-bottom:18px; padding:14px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
              <div style="font-size:12px; font-weight:700; color:#64748b; text-transform:uppercase; margin-bottom:10px;">
                Resumo do envio
              </div>
              <table cellpadding="6" style="border-collapse:collapse; width:100%;">
                <tr><td style="width:180px;"><b>Nome</b></td><td>${escapeHtml(nome)}</td></tr>
                <tr><td><b>Telefone</b></td><td>${escapeHtml(telefone)}</td></tr>
                <tr><td><b>E-mail</b></td><td>${escapeHtml(email)}</td></tr>
                <tr><td><b>Unidade</b></td><td>${escapeHtml(unidadeLabel)}</td></tr>
                <tr><td><b>Cargo pretendido</b></td><td>${escapeHtml(cargo)}</td></tr>
                <tr><td><b>PCD</b></td><td>${pcd ? "Sim" : "Não"}</td></tr>
                ${
                  pcd && pcdTipo
                    ? `<tr><td><b>Tipo PCD</b></td><td>${escapeHtml(pcdTipo)}</td></tr>`
                    : ""
                }
                ${
                  pcd && pcdAdaptacao
                    ? `<tr><td><b>Adaptação solicitada</b></td><td>${escapeHtml(pcdAdaptacao)}</td></tr>`
                    : ""
                }
              </table>
            </div>

            ${
              isVaga
                ? `
                  <div style="margin-bottom:18px; padding:14px; background:#fffbeb; border:1px solid #fde68a; border-radius:12px;">
                    <div style="font-size:12px; font-weight:700; color:#92400e; text-transform:uppercase; margin-bottom:10px;">
                      Dados da vaga
                    </div>
                    <table cellpadding="6" style="border-collapse:collapse; width:100%;">
                      <tr><td style="width:180px;"><b>ID da vaga</b></td><td>${escapeHtml(vagaId || "-")}</td></tr>
                      <tr><td><b>Título da vaga</b></td><td>${escapeHtml(vagaTitulo || cargo || "-")}</td></tr>
                      <tr><td><b>Local da vaga</b></td><td>${escapeHtml(vagaLocal || "-")}</td></tr>
                      ${
                        vagaSafra
                          ? `<tr><td><b>Safra / período</b></td><td>${escapeHtml(vagaSafra)}</td></tr>`
                          : ""
                      }
                    </table>
                  </div>
                `
                : `
                  <div style="margin-bottom:18px; padding:14px; background:#eff6ff; border:1px solid #bfdbfe; border-radius:12px;">
                    <div style="font-size:12px; font-weight:700; color:#1d4ed8; text-transform:uppercase;">
                      Banco de talentos
                    </div>
                    <div style="margin-top:6px;">
                      Candidato enviou currículo sem selecionar uma vaga específica.
                    </div>
                  </div>
                `
            }

            ${
              mensagem
                ? `
                  <div style="margin-bottom:18px; padding:14px; background:#f8fafc; border:1px solid #e2e8f0; border-radius:12px;">
                    <div style="font-size:12px; font-weight:700; color:#64748b; text-transform:uppercase; margin-bottom:10px;">
                      Mensagem do candidato
                    </div>
                    <div>${escapeHtml(mensagem).replaceAll("\n", "<br/>")}</div>
                  </div>
                `
                : ""
            }

            <div style="padding:14px; background:#f8fafc; border:1px dashed #cbd5e1; border-radius:12px;">
              <div style="font-size:12px; font-weight:700; color:#64748b; text-transform:uppercase; margin-bottom:10px;">
                Controle interno
              </div>
              <table cellpadding="6" style="border-collapse:collapse; width:100%;">
                <tr><td style="width:180px;"><b>Destino automático</b></td><td>${escapeHtml(destination)}</td></tr>
                <tr><td><b>Reply-To</b></td><td>${escapeHtml(email)}</td></tr>
                <tr><td><b>Anexo</b></td><td>${escapeHtml(fileName || "curriculo.pdf")}</td></tr>
                <tr><td><b>Tamanho do PDF</b></td><td>${(buf.length / 1024 / 1024).toFixed(2)} MB</td></tr>
              </table>
            </div>

            <p style="margin:18px 0 0; color:#64748b; font-size:12px;">
              Observação: a Happening valoriza a diversidade e não realiza qualquer tipo de discriminação em seus processos seletivos.
            </p>
          </div>
        </div>
      </div>
    `;

    await transport.sendMail({
      from: process.env.CURRICULO_USER,
      to: destination,
      replyTo: email,
      subject,
      html,
      attachments: [
        {
          filename: fileName || "curriculo.pdf",
          content: buf,
          contentType: "application/pdf",
        },
      ],
      headers: {
        "X-Happening-Form": "curriculo-site",
        "X-Happening-Unit": unidadeLabel,
        "X-Happening-Job": vagaTitulo || cargo || "Banco de Talentos",
      },
    });

    console.info("[curriculo][sent]", {
      ip,
      nome,
      email: maskEmail(email),
      telefone: maskPhone(telefone),
      unidade: unidadeLabel,
      destino: destination,
      vaga: vagaTitulo || "banco-de-talentos",
      tamanhoMb: Number((buf.length / 1024 / 1024).toFixed(2)),
    });

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[curriculo][error]", err);
    return Response.json(
      { ok: false, error: "Erro ao enviar. Verifique logs/configuração de e-mail." },
      { status: 500 }
    );
  }
}