"use client";

import { useMemo, useState } from "react";

type Vaga = {
  id: string;
  titulo: string;
  unidade: string; // ex: "Matriz - Sertãozinho/SP"
  resumo: string;
  descricao: string; // texto completo
  requisitos?: string[];
  pcd?: boolean;
  imagem: string; // /vagas/xxx.jpg
  ativa: boolean;
  publicadaEm: string; // "2026-02-16"
};

const VAGAS: Vaga[] = [
  {
    id: "operador-empilhadeira",
    titulo: "Operador de Empilhadeira",
    unidade: "Matriz — Sertãozinho/SP",
    resumo:
      "Atuação com empilhadeira e entregas de fracionados. Vaga disponível também para PCD.",
    descricao:
      "Responsável por movimentação de cargas, organização do pátio/depósito e apoio nas rotinas operacionais. Atuação com foco em segurança, cuidado com materiais e cumprimento de procedimentos.",
    requisitos: [
      "Experiência com empilhadeira e entregas de fracionados",
      "CNH categoria B",
      "Disponibilidade para rotina operacional",
    ],
    pcd: true,
    imagem: "/vagas/operador-empilhadeira.jpg",
    ativa: true,
    publicadaEm: "2026-02-16",
  },
  // Exemplo de vaga antiga (histórico):
  {
    id: "auxiliar-operacional",
    titulo: "Auxiliar Operacional",
    unidade: "Filial — São Paulo/SP",
    resumo: "Apoio nas atividades de carga/descarga e organização.",
    descricao:
      "Atuação em rotinas de armazém, separação e apoio à operação. Seguir procedimentos de segurança e padrões operacionais.",
    requisitos: ["Ensino fundamental", "Disponibilidade de horário"],
    pcd: true,
    imagem: "/vagas/auxiliar-operacional.jpg",
    ativa: false,
    publicadaEm: "2025-11-08",
  },
];

type TipoCandidatura = "vaga" | "espontaneo" | "pcd";

function formatBRDate(iso: string) {
  // iso: YYYY-MM-DD
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default function TrabalheConoscoPage() {
  const vagasAbertas = useMemo(() => VAGAS.filter((v) => v.ativa), []);
  const vagasHistorico = useMemo(() => VAGAS.filter((v) => !v.ativa), []);

  const [tipo, setTipo] = useState<TipoCandidatura>("vaga");
  const [vagaId, setVagaId] = useState<string>(vagasAbertas[0]?.id ?? "");
  const vagaSelecionada = useMemo(
    () => VAGAS.find((v) => v.id === vagaId),
    [vagaId]
  );

  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ ok: boolean; msg: string } | null>(
    null
  );

  const [lightbox, setLightbox] = useState<{
    open: boolean;
    src: string;
    alt: string;
  }>({ open: false, src: "", alt: "" });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFeedback(null);
    setLoading(true);

    const form = e.currentTarget;
    const fd = new FormData(form);

    // Define tipo/vaga no payload
    fd.set("tipo", tipo);
    if (tipo === "vaga") {
      const v = vagaSelecionada;
      if (v) {
        fd.set("vagaId", v.id);
        fd.set("vagaTitulo", v.titulo);
        fd.set("vagaUnidade", v.unidade);
      }
    } else {
      fd.delete("vagaId");
      fd.delete("vagaTitulo");
      fd.delete("vagaUnidade");
    }

    try {
      const res = await fetch("/api/curriculo", {
        method: "POST",
        body: fd,
      });

      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; message?: string }
        | null;

      if (!res.ok || !data?.ok) {
        const msg =
          data?.message ||
          "Não foi possível enviar agora. Verifique a configuração de e-mail.";
        setFeedback({ ok: false, msg });
      } else {
        setFeedback({
          ok: true,
          msg: "Currículo enviado com sucesso! O RH receberá sua candidatura.",
        });
        form.reset();
        // mantém seleção de tipo após reset
      }
    } catch {
      setFeedback({
        ok: false,
        msg: "Falha de conexão ao enviar. Tente novamente em alguns instantes.",
      });
    } finally {
      setLoading(false);
      setTimeout(() => setFeedback(null), 7000);
    }
  }

  return (
    <main className="carreiras">
      {/* HERO */}
      <section className="carreirasHero">
        <div className="carreirasHeroBg" />
        <div className="carreirasHeroContent">
          <div className="badge">Trabalhe Conosco</div>
          <h1>Venha fazer parte do nosso time</h1>
          <p>
            Confira as vagas abertas, envie seu currículo para uma oportunidade
            específica ou para o nosso banco de talentos. Também incentivamos
            candidaturas de profissionais PCD.
          </p>
        </div>
      </section>

      {/* CONTEÚDO */}
      <section className="carreirasWrap">
        <div className="carreirasContainer">
          {/* VAGAS ABERTAS */}
          {vagasAbertas.length > 0 && (
            <div className="carreirasSection">
              <div className="carreirasSectionHead">
                <h2>Vagas Abertas</h2>
                <p>Selecione uma vaga para ver detalhes e candidatar-se.</p>
              </div>

              <div className="carreirasCards">
                {vagasAbertas.map((v) => (
                  <article key={v.id} className="carreirasCard">
                    <button
                      type="button"
                      className="carreirasCardImgBtn"
                      onClick={() =>
                        setLightbox({ open: true, src: v.imagem, alt: v.titulo })
                      }
                      aria-label={`Ampliar imagem da vaga ${v.titulo}`}
                    >
                      <img
                        className="carreirasCardImg"
                        src={v.imagem}
                        alt={`Vaga: ${v.titulo}`}
                        loading="lazy"
                      />
                    </button>

                    <div className="carreirasCardBody">
                      <div className="carreirasCardTop">
                        <h3>{v.titulo}</h3>
                        <div className="carreirasMeta">
                          <span>{v.unidade}</span>
                          <span>•</span>
                          <span>Publicada em {formatBRDate(v.publicadaEm)}</span>
                        </div>

                        <div className="carreirasTags">
                          {v.pcd && <span className="tag tagPcd">PCD</span>}
                          <span className="tag tagAtiva">Aberta</span>
                        </div>
                      </div>

                      <p className="carreirasResumo">{v.resumo}</p>

                      <details className="carreirasDetails">
                        <summary>Ver descrição</summary>
                        <div className="carreirasDetailsBody">
                          <p>{v.descricao}</p>
                          {v.requisitos?.length ? (
                            <>
                              <div className="carreirasReqTitle">
                                Requisitos:
                              </div>
                              <ul className="carreirasReq">
                                {v.requisitos.map((r) => (
                                  <li key={r}>{r}</li>
                                ))}
                              </ul>
                            </>
                          ) : null}
                        </div>
                      </details>

                      <div className="carreirasCardActions">
                        <button
                          type="button"
                          className="btnPrim"
                          onClick={() => {
                            setTipo("vaga");
                            setVagaId(v.id);
                            // rola pro formulário
                            document
                              .getElementById("form-curriculo")
                              ?.scrollIntoView({ behavior: "smooth" });
                          }}
                        >
                          Candidatar-se
                        </button>

                        <button
                          type="button"
                          className="btnSec"
                          onClick={() =>
                            setLightbox({ open: true, src: v.imagem, alt: v.titulo })
                          }
                        >
                          Ampliar imagem
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* SE NÃO HOUVER VAGAS */}
          {vagasAbertas.length === 0 && (
            <div className="carreirasSection">
              <div className="carreirasEmpty">
                <h2>Não há vagas abertas no momento</h2>
                <p>
                  Você ainda pode enviar seu currículo para o banco de talentos
                  (currículo espontâneo) ou pelo Programa de Inclusão PCD.
                </p>
              </div>
            </div>
          )}

          {/* FORMULÁRIO */}
          <div className="carreirasSection" id="form-curriculo">
            <div className="carreirasSectionHead">
              <h2>Enviar Currículo</h2>
              <p>
                O envio é direcionado ao RH. Selecione a opção desejada e anexe
                seu currículo em PDF.
              </p>
            </div>

            <form className="carreirasForm" onSubmit={handleSubmit}>
              <div className="carreirasFormRow">
                <label className="carreirasLabel">
                  Tipo de candidatura
                  <select
                    className="carreirasInput"
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value as TipoCandidatura)}
                    required
                  >
                    <option value="vaga">Para uma vaga específica</option>
                    <option value="espontaneo">Currículo espontâneo</option>
                    <option value="pcd">🌱 Programa de Inclusão PCD</option>
                  </select>
                </label>

                <label className="carreirasLabel">
                  Vaga (quando aplicável)
                  <select
                    className="carreirasInput"
                    value={vagaId}
                    onChange={(e) => setVagaId(e.target.value)}
                    disabled={tipo !== "vaga" || vagasAbertas.length === 0}
                    required={tipo === "vaga" && vagasAbertas.length > 0}
                  >
                    {vagasAbertas.length === 0 ? (
                      <option value="">Sem vagas abertas</option>
                    ) : (
                      vagasAbertas.map((v) => (
                        <option key={v.id} value={v.id}>
                          {v.titulo} — {v.unidade}
                        </option>
                      ))
                    )}
                  </select>
                </label>
              </div>

              <div className="carreirasFormRow">
                <label className="carreirasLabel">
                  Nome
                  <input
                    className="carreirasInput"
                    name="nome"
                    placeholder="Seu nome completo"
                    required
                  />
                </label>

                <label className="carreirasLabel">
                  Telefone/WhatsApp
                  <input
                    className="carreirasInput"
                    name="telefone"
                    placeholder="(16) 99999-9999"
                    required
                  />
                </label>
              </div>

              <div className="carreirasFormRow">
                <label className="carreirasLabel">
                  E-mail
                  <input
                    className="carreirasInput"
                    type="email"
                    name="email"
                    placeholder="seuemail@exemplo.com"
                    required
                  />
                </label>

                <label className="carreirasLabel">
                  Unidade desejada (opcional)
                  <input
                    className="carreirasInput"
                    name="unidade"
                    placeholder="Ex: Matriz — Sertãozinho/SP"
                  />
                </label>
              </div>

              <label className="carreirasLabel">
                Mensagem (opcional)
                <textarea
                  className="carreirasTextarea"
                  name="mensagem"
                  placeholder="Conte um pouco sobre você (opcional)"
                  rows={4}
                />
              </label>

              <label className="carreirasLabel">
                Currículo (PDF)
                <input
                  className="carreirasFile"
                  type="file"
                  name="arquivo"
                  accept="application/pdf"
                  required
                />
                <div className="carreirasHint">
                  Envie em PDF. Tamanho recomendado até ~5MB.
                </div>
              </label>

              <div className="carreirasActions">
                <button className="btnPrim" type="submit" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar currículo"}
                </button>

                {tipo === "pcd" && (
                  <div className="carreirasPcdBox">
                    <div className="carreirasPcdTitle">🌱 Programa de Inclusão PCD</div>
                    <div className="carreirasPcdText">
                      A Happening Logística valoriza a diversidade e incentiva a candidatura
                      de profissionais com deficiência (PCD).
                    </div>
                  </div>
                )}
              </div>

              {feedback && (
                <div className={`carreirasAlert ${feedback.ok ? "ok" : "err"}`}>
                  {feedback.msg}
                </div>
              )}
            </form>
          </div>

          {/* HISTÓRICO */}
          {vagasHistorico.length > 0 && (
            <div className="carreirasSection">
              <div className="carreirasSectionHead">
                <h2>Histórico de Vagas</h2>
                <p>Postagens anteriores (apenas referência, sem candidatura).</p>
              </div>

              <div className="carreirasCards">
                {vagasHistorico.map((v) => (
                  <article key={v.id} className="carreirasCard carreirasCardClosed">
                    <button
                      type="button"
                      className="carreirasCardImgBtn"
                      onClick={() =>
                        setLightbox({ open: true, src: v.imagem, alt: v.titulo })
                      }
                      aria-label={`Ampliar imagem da vaga ${v.titulo}`}
                    >
                      <img
                        className="carreirasCardImg"
                        src={v.imagem}
                        alt={`Vaga: ${v.titulo}`}
                        loading="lazy"
                      />
                    </button>

                    <div className="carreirasCardBody">
                      <h3>{v.titulo}</h3>
                      <div className="carreirasMeta">
                        <span>{v.unidade}</span>
                        <span>•</span>
                        <span>Publicada em {formatBRDate(v.publicadaEm)}</span>
                      </div>
                      <div className="carreirasTags">
                        {v.pcd && <span className="tag tagPcd">PCD</span>}
                        <span className="tag tagFechada">Encerrada</span>
                      </div>

                      <p className="carreirasResumo">{v.resumo}</p>

                      <details className="carreirasDetails">
                        <summary>Ver descrição</summary>
                        <div className="carreirasDetailsBody">
                          <p>{v.descricao}</p>
                          {v.requisitos?.length ? (
                            <>
                              <div className="carreirasReqTitle">
                                Requisitos:
                              </div>
                              <ul className="carreirasReq">
                                {v.requisitos.map((r) => (
                                  <li key={r}>{r}</li>
                                ))}
                              </ul>
                            </>
                          ) : null}
                        </div>
                      </details>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox.open && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          onClick={() => setLightbox({ open: false, src: "", alt: "" })}
        >
          <button
            className="lightboxClose"
            onClick={() => setLightbox({ open: false, src: "", alt: "" })}
            aria-label="Fechar"
            type="button"
          >
            ✕
          </button>

          <img
            className="lightboxImg"
            src={lightbox.src}
            alt={lightbox.alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </main>
  );
}
