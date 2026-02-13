// app/api/curriculo/route.ts
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_MB = 5;
const ALLOWED = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

// Rate limit simples (memória). Em produção, o ideal é Redis/Upstash.
const hits = new Map<string, { count: number; ts: number }>();
function rateLimit(ip: string, limit = 3, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const cur = hits.get(ip);
  if (!cur || now - cur.ts > windowMs) {
    hits.set(ip, { count: 1, ts: now });
    return true;
  }
  if (cur.count >= limit) return false;
  cur.count += 1;
  return true;
}

function getIP(req: Request) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "local"
  );
}

function missingEnv(keys: string[]) {
  return keys.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");
}

export async function POST(req: Request) {
  const ip = getIP(req);
  if (!rateLimit(ip)) {
    return Response.json(
      { error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." },
      { status: 429 }
    );
  }

  // Verifica config do currículo (separada)
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
    return Response.json(
      { error: `Configuração de e-mail incompleta: faltando ${miss.join(", ")}` },
      { status: 400 }
    );
  }

  const form = await req.formData();

  // Honeypot anti-bot
  const website = String(form.get("website") || "");
  if (website.trim()) {
    return Response.json({ ok: true });
  }

  const unidade = String(form.get("unidade") || "").trim();
  const cargo = String(form.get("cargo") || "").trim();
  const nome = String(form.get("nome") || "").trim();
  const email = String(form.get("email") || "").trim();
  const telefone = String(form.get("telefone") || "").trim();
  const mensagem = String(form.get("mensagem") || "").trim();

  const file = form.get("curriculo");
  if (!(file instanceof File)) {
    return Response.json({ error: "Currículo não encontrado." }, { status: 400 });
  }

  const sizeMb = file.size / (1024 * 1024);
  if (sizeMb > MAX_MB) {
    return Response.json(
      { error: `Arquivo excede o limite de ${MAX_MB}MB.` },
      { status: 400 }
    );
  }

  if (!ALLOWED.has(file.type)) {
    return Response.json(
      { error: "Formato inválido. Envie PDF, DOC ou DOCX." },
      { status: 400 }
    );
  }

  const buf = Buffer.from(await file.arrayBuffer());

  // SMTP do CURRÍCULO (separado da cotação)
  const transporter = nodemailer.createTransport({
    host: process.env.CURRICULO_HOST,
    port: Number(process.env.CURRICULO_PORT),
    secure: String(process.env.CURRICULO_SECURE).toLowerCase() === "true",
    auth: {
      user: process.env.CURRICULO_USER,
      pass: process.env.CURRICULO_PASS,
    },
  });

  const to = process.env.CURRICULO_TO!;
  const subject = `Currículo — ${nome} (${cargo}) — ${unidade}`;

  const text = `Novo currículo recebido pelo site:

Unidade desejada: ${unidade}
Cargo pretendido: ${cargo}

Nome: ${nome}
E-mail: ${email}
Telefone: ${telefone}

Mensagem:
${mensagem || "(não informada)"}

IP: ${ip}
Arquivo: ${file.name} (${file.type}, ${sizeMb.toFixed(2)}MB)
`;

  await transporter.sendMail({
    from: process.env.CURRICULO_USER, // <- AGORA envia como curriculo@...
    to,
    replyTo: email || undefined,
    subject,
    text,
    attachments: [
      {
        filename: file.name,
        content: buf,
        contentType: file.type,
      },
    ],
  });

  return Response.json({ ok: true });
}
