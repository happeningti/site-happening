// app/trabalhe-conosco/page.tsx
"use client";

import { useMemo, useState } from "react";

type Vaga = {
  id: string;
  titulo: string;
  local?: string;
  pcd?: boolean;
  ativa: boolean;
  imagem?: string; // ex: "/vagas/operador-empilhadeira.jpg"
  descricao?: string; // texto curto
  data?: string; // ex: "2025/2"
};

// >>>>>> CADASTRE SUAS VAGAS AQUI <<<<<<
// - Para “subir imagem”: coloque em /public/vagas/ e referencie como "/vagas/arquivo.jpg"
// - Para ativar/desativar: ativa: true/false
const VAGAS: Vaga[] = [
  {
    id: "operador-empilhadeira",
    titulo: "Operador de Empilhadeira",
    local: "Sertãozinho/SP",
    pcd: true,
    ativa: true,
    imagem: "/vagas/operador-empilhadeira.jpg",
    descricao:
      "Experiência com empilhadeira e entregas fracionadas. CNH categoria B.",
    data: "2025/2",
  },
  // {
  //   id: "auxiliar-logistica",
  //   titulo: "Auxiliar de Logística",
  //   local: "São Paulo/SP",
  //   pcd: false,
  //   ativa: false,
  //   imagem: "/vagas/auxiliar-logistica.jpg",
  //   descricao: "Separação, conferência e apoio operacional.",
  //   data: "2025/1",
  // },
];

export default function TrabalheConoscoPage() {
  const vagasAtivas = useMemo(() => VAGAS.filter((v) => v.ativa), []);
  const vagasHistorico = useMemo(() => VAGAS.filter((v) => !v.ativa), []);

  const [vagaSelecionada, setVagaSelecionada] = useState<string>(() => {
    if (vagasAtivas.length > 0) return vagasAtivas[0].id;
    return "banco-talentos";
  });

  const [enviando, setEnviando] = useState(false);
  const [msg, setMsg] = useState<{ type: "ok" | "err"; text: string } | null>(
    null
  );

  const vagaAtual = useMemo(() => {
    return VAGAS.find((v) => v.id === vagaSelecionada);
  }, [vagaSelecionada]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMsg(null);
    setEnviando(true);

    try {
      const form = e.currentTarget;
      const fd = new FormData(form);

      // campo extra pro backend entender o contexto
      fd.set("vaga", vagaSelecionada);
      fd.set("vaga_titulo", vagaAtual?.titulo ?? "");

      // >>> IMPORTANTE:
      // Este POST usa seu endpoint atual de currículo.
      // Se no seu projeto o endpoint for outro, troque aqui.
      const res = await fetch("/api/curriculo", { method: "POST", body: fd });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || "Falha ao enviar currículo.");
      }

      setMsg({ type: "ok", text: "Currículo enviado com sucesso! ✅" });
      form.reset();
    } catch (err: any) {
      setMsg({
        type: "err",
        text:
          err?.message ||
          "Não foi possível enviar agora. Tente novamente em instantes.",
      });
    } finally {
      setEnviando(false);
      setTimeout(() => setMsg(null), 7000);
    }
  }

  return (
    <main className="trabalhe">
      <section className="trabalheHero">
        <div className="trabalheHeroBg" />
        <div className="trabalheHeroContent">
          <div className="badge">Carreiras</div>
          <h1>Trabalhe Conosco</h1>
          <p>
            Confira vagas abertas, histórico de oportunidades e envie seu currículo
            para o RH.
          </p>
        </div>
      </section>

      <section className="trabalheWrap">
        <div className="trabalheContainer">
          <div className="trabalheGrid">
            {/* COLUNA ESQUERDA: vagas / histórico */}
            <div className="trabalheLeft">
              <div className="trabalheCard">
                <h2>Vagas</h2>

                {vagasAtivas.length > 0 ? (
                  <>
                    <p className="trabalheHint">
                      Selecione a vaga para ver detalhes e enviar seu currículo.
                    </p>

                    <div className="trabalheSelectRow">
                      <label className="trabalheLabel" htmlFor="vaga">
                        Vaga desejada
                      </label>

                      <select
                        id="vaga"
                        className="trabalheSelect"
                        value={vagaSelecionada}
                        onChange={(e) => setVagaSelecionada(e.target.value)}
                      >
                        {vagasAtivas.map((v) => (
                          <option key={v.id} value={v.id}>
                            {v.titulo}
                            {v.local ? ` — ${v.local}` : ""}
                            {v.pcd ? " (PCD)" : ""}
                          </option>
                        ))}

                        <option value="banco-talentos">
                          Banco de Talentos (sem vaga específica)
                        </option>
                        <option value="pcd">
                          🌱 Programa de Inclusão PCD
                        </option>
                      </select>
                    </div>

                    {vagaAtual && (
                      <div className="vagaPreview">
                        <div className="vagaPreviewHeader">
                          <div className="vagaTitle">{vagaAtual.titulo}</div>
                          <div className="vagaMeta">
                            {vagaAtual.local ? <span>{vagaAtual.local}</span> : null}
                            {vagaAtual.pcd ? <span className="vagaPcd">PCD</span> : null}
                          </div>
                        </div>

                        {vagaAtual.descricao ? (
                          <p className="vagaDesc">{vagaAtual.descricao}</p>
                        ) : null}

                        {vagaAtual.imagem ? (
                          <a
                            className="vagaImgWrap"
                            href={vagaAtual.imagem}
                            target="_blank"
                            rel="noreferrer"
                            title="Abrir imagem em tela cheia"
                          >
                            <img
                              className="vagaImg"
                              src={vagaAtual.imagem}
                              alt={`Vaga: ${vagaAtual.titulo}`}
                            />
                            <div className="vagaImgHint">
                              Clique para ampliar
                            </div>
                          </a>
                        ) : null}
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <p className="trabalheHint">
                      No momento não há vagas abertas. Você pode enviar seu currículo
                      para o <strong>Banco de Talentos</strong> ou para o{" "}
                      <strong>Programa de Inclusão PCD</strong>.
                    </p>

                    <div className="trabalheSelectRow">
                      <label className="trabalheLabel" htmlFor="vaga">
                        Tipo de envio
                      </label>

                      <select
                        id="vaga"
                        className="trabalheSelect"
                        value={vagaSelecionada}
                        onChange={(e) => setVagaSelecionada(e.target.value)}
                      >
                        <option value="banco-talentos">
                          Banco de Talentos (sem vaga específica)
                        </option>
                        <option value="pcd">
                          🌱 Programa de Inclusão PCD
                        </option>
                      </select>
                    </div>
                  </>
                )}
              </div>

              {vagasHistorico.length > 0 && (
                <div className="trabalheCard">
                  <h2>Histórico de vagas publicadas</h2>
                  <p className="trabalheHint">
                    Mantemos aqui um histórico de oportunidades divulgadas.
                  </p>

                  <div className="historicoGrid">
                    {vagasHistorico.map((v) => (
                      <div key={v.id} className="historicoItem">
                        <div className="historicoTitle">{v.titulo}</div>
                        <div className="historicoMeta">
                          {v.data ? <span>{v.data}</span> : null}
                          {v.local ? <span>{v.local}</span> : null}
                          {v.pcd ? <span className="vagaPcd">PCD</span> : null}
                        </div>

                        {v.imagem ? (
                          <a
                            className="historicoImgWrap"
                            href={v.imagem}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              className="historicoImg"
                              src={v.imagem}
                              alt={`Histórico: ${v.titulo}`}
                            />
                          </a>
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* COLUNA DIREITA: formulário */}
            <div className="trabalheRight">
              <div className="trabalheCard">
                <h2>Enviar currículo</h2>
                <p className="trabalheHint">
                  O envio vai diretamente para o <strong>RH</strong>.
                </p>

                <form className="trabalheForm" onSubmit={onSubmit}>
                  <div className="trabalheRow2">
                    <div>
                      <label className="trabalheLabel">Nome</label>
                      <input
                        className="trabalheInput"
                        name="nome"
                        required
                        placeholder="Seu nome completo"
                      />
                    </div>

                    <div>
                      <label className="trabalheLabel">Telefone/WhatsApp</label>
                      <input
                        className="trabalheInput"
                        name="telefone"
                        required
                        placeholder="(16) 99999-9999"
                      />
                    </div>
                  </div>

                  <div className="trabalheRow2">
                    <div>
                      <label className="trabalheLabel">E-mail</label>
                      <input
                        className="trabalheInput"
                        type="email"
                        name="email"
                        required
                        placeholder="seuemail@exemplo.com"
                      />
                    </div>

                    <div>
                      <label className="trabalheLabel">Unidade desejada</label>
                      <select className="trabalheSelect" name="unidade">
                        <option value="Matriz - Sertãozinho/SP">
                          Matriz — Sertãozinho/SP
                        </option>
                        <option value="Filial - São Paulo/SP">
                          Filial — São Paulo/SP
                        </option>
                        <option value="Filial - Aroeira/MG">
                          Filial — Aroeira/MG
                        </option>
                        <option value="Outra">Outra</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="trabalheLabel">Mensagem (opcional)</label>
                    <textarea
                      className="trabalheTextarea"
                      name="mensagem"
                      placeholder="Conte rapidamente sua experiência, disponibilidade, etc."
                    />
                  </div>

                  <div>
                    <label className="trabalheLabel">Currículo (PDF)</label>
                    <input
                      className="trabalheFile"
                      type="file"
                      name="arquivo"
                      accept="application/pdf"
                      required
                    />
                    <div className="trabalheHintSmall">
                      Envie em PDF. (Se você quiser aceitar DOC/DOCX, eu ajusto.)
                    </div>
                  </div>

                  <button className="btnPrim" disabled={enviando}>
                    {enviando ? "Enviando..." : "Enviar currículo"}
                  </button>

                  {msg && (
                    <div
                      className={`trabalheMsg ${
                        msg.type === "ok" ? "ok" : "err"
                      }`}
                    >
                      {msg.text}
                    </div>
                  )}
                </form>
              </div>

              <div className="trabalheCard">
                <h2>🌱 Programa de Inclusão PCD</h2>
                <p>
                  A Happening Logística valoriza a diversidade e incentiva a
                  candidatura de profissionais com deficiência (PCD).
                  <br />
                  Se você é PCD e deseja fazer parte do nosso time, envie seu
                  currículo.
                </p>

                <div className="pcdBox">
                  <button
                    className="btnSec"
                    onClick={() => setVagaSelecionada("pcd")}
                    type="button"
                  >
                    Enviar Currículo PCD
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="trabalheFooterNote">
            <span>
              Dica: para postar uma vaga igual do LinkedIn, suba a imagem em{" "}
              <code>/public/vagas/</code> e cadastre a vaga no array{" "}
              <code>VAGAS</code> acima.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
