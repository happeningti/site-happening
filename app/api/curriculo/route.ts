import nodemailer from "nodemailer";

export const runtime = "nodejs";

function missingEnv(keys: string[]) {
  return keys.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");
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

    const tipo = String(fd.get("tipo") || "espontaneo"); // vaga | espontaneo | pcd
    const nome = String(fd.get("nome") || "").trim();
    const telefone = String(fd.get("telefone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const unidade = String(fd.get("unidade") || "").trim();
    const mensagem = String(fd.get("mensagem") || "").trim();

    const vagaTitulo = String(fd.get("vagaTitulo") || "").trim();
    const vagaUnidade = String(fd.get("vagaUnidade") || "").trim();

    const arquivo = fd.get("arquivo");

    if (!nome || !telefone || !email) {
      return Response.json(
        { ok: false, message: "Preencha nome, telefone e e-mail." },
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

    const assuntoBase =
      tipo === "vaga"
        ? `Currículo - ${vagaTitulo || "Vaga"}`
        : tipo === "pcd"
        ? "Currículo - Programa de Inclusão PCD"
        : "Currículo - Banco de Talentos";

    const html = `
      <div style="font-family:Arial, sans-serif; line-height:1.4">
        <h2 style="margin:0 0 8px">${assuntoBase}</h2>
        <p style="margin:0 0 12px;color:#444">
          Recebido pelo site Happening Logística.
        </p>

        <table cellpadding="6" style="border-collapse:collapse">
          <tr><td><b>Nome:</b></td><td>${escapeHtml(nome)}</td></tr>
          <tr><td><b>Telefone:</b></td><td>${escapeHtml(telefone)}</td></tr>
          <tr><td><b>E-mail:</b></td><td>${escapeHtml(email)}</td></tr>
          ${unidade ? `<tr><td><b>Unidade desejada:</b></td><td>${escapeHtml(unidade)}</td></tr>` : ""}
          ${
            tipo === "vaga"
              ? `
                <tr><td><b>Vaga:</b></td><td>${escapeHtml(vagaTitulo || "-")}</td></tr>
                <tr><td><b>Unidade da vaga:</b></td><td>${escapeHtml(vagaUnidade || "-")}</td></tr>
              `
              : ""
          }
          <tr><td><b>Tipo:</b></td><td>${escapeHtml(tipo)}</td></tr>
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
      to: process.env.CURRICULO_TO,     // RH
      replyTo: email,                   // responder pro candidato
      subject: assuntoBase,
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
