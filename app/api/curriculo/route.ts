import nodemailer from "nodemailer";

export const runtime = "nodejs";

function missingEnv(keys: string[]) {
  return keys.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");
}

function pickFirst(fd: FormData, keys: string[]) {
  for (const k of keys) {
    const v = fd.get(k);
    if (v !== null && String(v).trim() !== "") return String(v).trim();
  }
  return "";
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
      return Response.json(
        {
          ok: false,
          message: `Configuração de e-mail incompleta: faltando ${miss.join(", ")}.`,
        },
        { status: 400 }
      );
    }

    const fd = await req.formData();

    // ✅ Compatibilidade: aceita campos novos e antigos
    const nome = pickFirst(fd, ["nome"]);
    const telefone = pickFirst(fd, ["telefone"]);
    const email = pickFirst(fd, ["email"]);
    const unidade = pickFirst(fd, ["unidade"]);
    const mensagem = pickFirst(fd, ["mensagem"]);

    // ✅ NOVO: cargo pretendido (front novo manda "cargo")
    const cargo = pickFirst(fd, ["cargo", "cargoPretendido", "cargo_pretendido"]);

    // ✅ NOVO: pcd (front novo manda "pcd" = "1"/"0")
    const pcdFlag = pickFirst(fd, ["pcd"]);
    const isPCD = pcdFlag === "1" || pcdFlag.toLowerCase() === "true";

    // ✅ Vaga (novo) + compatibilidade (antigo)
    const vagaTitulo = pickFirst(fd, ["vaga_titulo", "vagaTitulo"]);
    const vagaLocal = pickFirst(fd, ["vaga_local", "vagaUnidade"]);
    const vagaId = pickFirst(fd, ["vaga_id", "vagaId"]);

    // ✅ Tipo: aceita o antigo "tipo" se vier, senão deduz
    // tipos possíveis: vaga | espontaneo | pcd
    const tipoIncoming = pickFirst(fd, ["tipo"]);
    const tipo =
      tipoIncoming ||
      (vagaTitulo ? "vaga" : isPCD ? "pcd" : "espontaneo");

    const arquivo = fd.get("arquivo");

    if (!nome || !telefone || !email) {
      return Response.json(
        { ok: false, message: "Preencha nome, telefone e e-mail." },
        { status: 400 }
      );
    }

    if (!cargo) {
      return Response.json(
        { ok: false, message: "Informe o cargo pretendido." },
        { status: 400 }
      );
    }

    if (!(arquivo instanceof File)) {
      return Response.json(
        { ok: false, message: "Anexe seu currículo em PDF." },
        { status: 400 }
      );
    }

    // valida PDF simples
    if (arquivo.type !== "application/pdf") {
      return Response.json(
        { ok: false, message: "O currículo deve ser um arquivo PDF." },
        { status: 400 }
      );
    }

    const buf = Buffer.from(await arquivo.arrayBuffer());

    const transport = nodemailer.createTransport({
      host: process.env.CURRICULO_HOST,
      port: Number(process.env.CURRICULO_PORT),
      secure: String(process.env.CURRICULO_SECURE) === "true",
      auth: {
        user: process.env.CURRICULO_USER,
        pass: process.env.CURRICULO_PASS,
      },
    });

    const tipoLabel =
      tipo === "vaga"
        ? "Vaga"
        : tipo === "pcd"
        ? "Programa de Inclusão PCD"
        : "Banco de Talentos";

    // ✅ Assunto: claro e útil pro RH
    // Ex: "Currículo (Vaga) - Operador de Empilhadeira - João Silva"
    // Ex: "Currículo (PCD) - Analista de Sistemas - Maria"
    const assuntoBase =
      tipo === "vaga"
        ? `Currículo (Vaga) - ${vagaTitulo || cargo}`
        : tipo === "pcd" || isPCD
        ? `Currículo (PCD) - ${cargo}`
        : `Currículo (Banco) - ${cargo}`;

    const subject = `${assuntoBase} - ${nome}`;

    const html = `
      <div style="font-family:Arial, sans-serif; line-height:1.4">
        <h2 style="margin:0 0 8px">${escapeHtml(subject)}</h2>
        <p style="margin:0 0 12px;color:#444">
          Recebido pelo site Happening Logística.
        </p>

        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><b>Nome:</b></td><td>${escapeHtml(nome)}</td></tr>
          <tr><td><b>Telefone:</b></td><td>${escapeHtml(telefone)}</td></tr>
          <tr><td><b>E-mail:</b></td><td>${escapeHtml(email)}</td></tr>

          ${unidade ? `<tr><td><b>Unidade desejada:</b></td><td>${escapeHtml(unidade)}</td></tr>` : ""}

          <tr><td><b>Cargo pretendido:</b></td><td>${escapeHtml(cargo)}</td></tr>
          <tr><td><b>PCD:</b></td><td>${isPCD ? "Sim" : "Não"}</td></tr>

          <tr><td><b>Canal:</b></td><td>${escapeHtml(tipoLabel)}</td></tr>

          ${
            vagaTitulo
              ? `
                <tr><td><b>Vaga:</b></td><td>${escapeHtml(vagaTitulo)}</td></tr>
                ${vagaLocal ? `<tr><td><b>Local/Unidade da vaga:</b></td><td>${escapeHtml(vagaLocal)}</td></tr>` : ""}
                ${vagaId ? `<tr><td><b>ID da vaga:</b></td><td>${escapeHtml(vagaId)}</td></tr>` : ""}
              `
              : `<tr><td><b>Vaga:</b></td><td>(Banco de Talentos)</td></tr>`
          }
        </table>

        ${
          mensagem
            ? `<p style="margin:12px 0 0"><b>Mensagem:</b><br/>${escapeHtml(mensagem).replaceAll("\n", "<br/>")}</p>`
            : ""
        }
      </div>
    `;

    await transport.sendMail({
      from: process.env.CURRICULO_USER, // remetente autenticado
      to: process.env.CURRICULO_TO, // RH
      replyTo: email, // responder pro candidato
      subject,
      html,
      attachments: [
        {
          filename: arquivo.name || "curriculo.pdf",
          content: buf,
          contentType: "application/pdf",
        },
      ],
    });

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, message: "Erro ao enviar. Verifique logs/configuração de e-mail." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
