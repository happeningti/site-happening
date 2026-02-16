// app/contato/page.tsx
import Link from "next/link";

const UNIDADES = [
  {
    nome: "Matriz — Sertãozinho/SP",
    tipo: "Matriz",
    endereco:
      "Av. Marginal Maurílio Bacega, 1950 — JD das Palmeiras — Sertãozinho/SP — CEP 14177-290",
    whatsapp: null,
    telefone: "+55 16 3946-4500",
  },
  {
    nome: "Filial — São Paulo/SP",
    tipo: "Filial",
    endereco: "São Paulo/SP ",
    whatsapp: "5516", // ajuste depois
    telefone: null,
  },
  {
    nome: "Filial — Aroeira/MG",
    tipo: "Filial",
    endereco: "Tupaciguara/MG",
    whatsapp: "5531999999999",
    telefone: null,
  },
  {
    nome: "Filial — Santa Juliana/MG",
    tipo: "Filial",
    endereco: "Santa Juliana/MG ",
    whatsapp: "5534999999999",
    telefone: null,
  },
  {
    nome: "Filial — Tropical/GO",
    tipo: "Filial",
    endereco: "Porteirão/GO",
    whatsapp: "5564999999999",
    telefone: null,
  },
];

const MAPA_MATRIZ_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13471.11640401829!2d-48.030750899999994!3d-21.13181205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b99f1a04f33915%3A0x4a19ec93eb924a55!2sHappening%20Empreendimentos%20Importa%C3%A7%C3%A3o%20e%20Exporta%C3%A7%C3%A3o%20LTDA!5e1!3m2!1spt-BR!2sbr!4v1771007221898!5m2!1spt-BR!2sbr";

function waLink(whats: string) {
  return `https://wa.me/${whats}?text=${encodeURIComponent(
    "Olá! Vim pelo site da Happening."
  )}`;
}

export default function ContatoPage() {
  return (
    <main className="contato">
      {/* HERO */}
      <section
        className="servicosHero"
        style={{ borderBottom: "1px solid #e7ebf3" }}
      >
        <div className="servicosHeroBg" />
        <div className="servicosHeroContent">
          <div className="badge">Contato</div>
          <h1>Fale com a Happening</h1>
          <p>
            <p>
  Entre em contato com a unidade mais próxima para dúvidas, atendimento e suporte.
</p>
 <strong>Trabalhe Conosco</strong>.
          </p>

          <div
            style={{
              marginTop: 18,
              display: "flex",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <Link className="btn btnPrimary" href="/trabalhe-conosco">
              Trabalhe Conosco
            </Link>

            <Link className="btn btnOutline" href="/cotacao">
              Cotação
            </Link>
          </div>
        </div>
      </section>

      {/* UNIDADES */}
      <section className="section">
        <div className="container">
          <h2 className="sectionTitle">Telefones e WhatsApp por unidade</h2>
          <p className="sectionDesc">
            Atendimento direto por WhatsApp em cada filial/base. Matriz com
            telefone principal.
          </p>

          <div className="grid3">
            {UNIDADES.map((u) => (
              <div key={u.nome} className="card">
                <h3>{u.nome}</h3>
                <p style={{ marginBottom: 10 }}>{u.endereco}</p>

                {u.telefone && (
                  <p style={{ marginBottom: 8 }}>
                    <strong>Telefone:</strong> {u.telefone}
                  </p>
                )}

                {u.whatsapp && (
                  <p style={{ marginBottom: 8 }}>
                    <strong>WhatsApp:</strong>{" "}
                    <a
                      href={waLink(u.whatsapp)}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#0b7a4b", fontWeight: 800 }}
                    >
                      Abrir conversa
                    </a>
                  </p>
                )}

                <p style={{ color: "#64748b", fontSize: 13 }}>
                  {u.tipo === "Base"
                    ? "Base operacional com escritório e oficina (suporte local)."
                    : "Unidade de atendimento e apoio operacional."}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAPA MATRIZ */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="contatoMapWrapper">
            <div className="contatoMapHeader">
              <h3>Mapa da Matriz</h3>
              <span>Sertãozinho/SP</span>
            </div>

            <iframe
              src={MAPA_MATRIZ_EMBED}
              className="contatoMapIframe"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
