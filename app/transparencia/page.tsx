import Link from "next/link";

type Relatorio = {
  id: string; // "2025-2"
  titulo: string;
  descricao: string;
  arquivoPdf: string; // em /public/transparencia/...
  publicadoEm: string; // "2026-02-16"
};

const RELATORIOS: Relatorio[] = [
  {
    id: "2025-2",
    titulo: "Relatório de Transparência e Igualdade Salarial — 2025/2",
    descricao:
      "Divulgação conforme Lei 14.611/2023, reforçando o compromisso da Happening Logística com equidade, diversidade e inclusão.",
    arquivoPdf: "/transparencia/relatorio-2025-2.pdf",
    publicadoEm: "2026-02-16",
  },
  // Adicione outros aqui:
  // { id:"2025-1", titulo:"...", descricao:"...", arquivoPdf:"/transparencia/relatorio-2025-1.pdf", publicadoEm:"2025-09-01" }
];

function formatBRDate(iso: string) {
  const [y, m, d] = iso.split("-");
  return `${d}/${m}/${y}`;
}

export default function TransparenciaPage() {
  return (
    <main className="transp">
      <section className="transpHero">
        <div className="transpHeroBg" />
        <div className="transpHeroContent">
          <div className="badge">Transparência</div>
          <h1>Relatórios de Transparência e Igualdade Salarial</h1>
          <p>
            Publicações oficiais conforme legislação vigente, reforçando nosso
            compromisso com equidade, diversidade e inclusão.
          </p>

          <div className="transpHeroActions">
            <Link className="btnSec" href="/trabalhe-conosco">
              Ver Vagas e Enviar Currículo
            </Link>
          </div>
        </div>
      </section>

      <section className="transpWrap">
        <div className="transpContainer">
          <div className="transpGrid">
            {RELATORIOS.map((r) => (
              <article key={r.id} className="transpCard">
                <h2>{r.titulo}</h2>
                <div className="transpMeta">
                  Publicado em {formatBRDate(r.publicadoEm)}
                </div>
                <p>{r.descricao}</p>

                <div className="transpActions">
                  <a className="btnPrim" href={r.arquivoPdf} target="_blank" rel="noreferrer">
                    Abrir PDF
                  </a>
                  <a className="btnSec" href={r.arquivoPdf} download>
                    Baixar
                  </a>
                </div>
              </article>
            ))}
          </div>

          <div className="transpNote">
            <b>Observação:</b> para publicar um novo relatório, basta colocar o PDF
            em <code>public/transparencia/</code> e adicionar um item no array{" "}
            <code>RELATORIOS</code>.
          </div>
        </div>
      </section>
    </main>
  );
}
