import nodemailer from "nodemailer";

export const runtime = "nodejs";

const MAX_PDF_BYTES = 5 * 1024 * 1024; // ✅ 5MB

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
        { ok: false, error: `Configuração de e-mail incompleta: faltando ${miss.join(", ")}.` },
        { status: 400 }
      );
    }

    const fd = await req.formData();

    // ✅ Campos principais
    const nome = String(fd.get("nome") || "").trim();
    const telefone = String(fd.get("telefone") || "").trim();
    const email = String(fd.get("email") || "").trim();
    const unidade = String(fd.get("unidade") || "").trim();
    const cargo = String(fd.get("cargo") || "").trim();
    const mensagem = String(fd.get("mensagem") || "").trim();

    // ✅ Info da vaga (se existir)
    const vaga_id = String(fd.get("vaga_id") || "").trim();
    const vaga_titulo = String(fd.get("vaga_titulo") || "").trim();
    const vaga_local = String(fd.get("vaga_local") || "").trim();

    // ✅ PCD (opcional)
    const pcd = String(fd.get("pcd") || "0").trim() === "1" ? "1" : "0";
    const pcd_tipo = String(fd.get("pcd_tipo") || "").trim();
    const pcd_adaptacao = String(fd.get("pcd_adaptacao") || "").trim();

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

    if (!(arquivo instanceof File)) {
      return Response.json(
        { ok: false, error: "Anexe seu currículo em PDF." },
        { status: 400 }
      );
    }

    // ✅ valida MIME
    if (arquivo.type !== "application/pdf") {
      return Response.json(
        { ok: false, error: "O currículo deve ser um arquivo PDF." },
        { status: 400 }
      );
    }

    // ✅ valida extensão .pdf (além do MIME)
    const fileName = String(arquivo.name || "").trim();
    const fileNameLower = fileName.toLowerCase();

    // se vier sem nome, a gente aceita, mas se tiver nome tem que terminar em .pdf
    if (fileName && !fileNameLower.endsWith(".pdf")) {
      return Response.json(
        { ok: false, error: "O arquivo anexado deve ter a extensão .pdf." },
        { status: 400 }
      );
    }

    // ✅ valida tamanho máximo (5MB)
    const size = Number((arquivo as any).size ?? 0);
    if (size > MAX_PDF_BYTES) {
      return Response.json(
        { ok: false, error: "O PDF excede o tamanho máximo permitido de 5MB." },
        { status: 400 }
      );
    }

    const buf = Buffer.from(await arquivo.arrayBuffer());

    // (extra) garante tamanho após buffer também
    if (buf.length > MAX_PDF_BYTES) {
      return Response.json(
        { ok: false, error: "O PDF excede o tamanho máximo permitido de 5MB." },
        { status: 400 }
      );
    }

    const transport = nodemailer.createTransport({
      host: process.env.CURRICULO_HOST,
      port: Number(process.env.CURRICULO_PORT),
      secure: String(process.env.CURRICULO_SECURE) === "true",
      auth: {
        user: process.env.CURRICULO_USER,
        pass: process.env.CURRICULO_PASS,
      },
    });

    const isVaga = Boolean(vaga_id || vaga_titulo || vaga_local);
    const prefixo = pcd === "1" ? "[PCD] " : "";

    const assuntoBase = isVaga
      ? `Currículo - ${vaga_titulo || cargo || "Vaga"}`
      : `Currículo - Banco de Talentos`;

    const subject = `${prefixo}${assuntoBase}`;

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
          ${cargo ? `<tr><td><b>Cargo pretendido:</b></td><td>${escapeHtml(cargo)}</td></tr>` : ""}
          <tr><td><b>PCD:</b></td><td>${pcd === "1" ? "Sim" : "Não"}</td></tr>

          ${
            pcd === "1" && (pcd_tipo || pcd_adaptacao)
              ? `
                ${pcd_tipo ? `<tr><td><b>Tipo (opcional):</b></td><td>${escapeHtml(pcd_tipo)}</td></tr>` : ""}
                ${pcd_adaptacao ? `<tr><td><b>Adaptação (opcional):</b></td><td>${escapeHtml(pcd_adaptacao)}</td></tr>` : ""}
              `
              : ""
          }

          ${
            isVaga
              ? `
                <tr><td><b>Vaga (ID):</b></td><td>${escapeHtml(vaga_id || "-")}</td></tr>
                <tr><td><b>Vaga (título):</b></td><td>${escapeHtml(vaga_titulo || "-")}</td></tr>
                <tr><td><b>Local da vaga:</b></td><td>${escapeHtml(vaga_local || "-")}</td></tr>
              `
              : ""
          }
        </table>

        ${
          mensagem
            ? `<p style="margin:12px 0 0"><b>Mensagem:</b><br/>${escapeHtml(mensagem).replaceAll("\n", "<br/>")}</p>`
            : ""
        }

        <p style="margin:12px 0 0;color:#64748b;font-size:12px">
          Observação: a Happening valoriza a diversidade e não realiza qualquer tipo de discriminação em seus processos seletivos.
        </p>
      </div>
    `;

    await transport.sendMail({
      from: process.env.CURRICULO_USER,
      to: process.env.CURRICULO_TO,
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
    });

    return Response.json({ ok: true });
  } catch (err) {
    return Response.json(
      { ok: false, error: "Erro ao enviar. Verifique logs/configuração de e-mail." },
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
