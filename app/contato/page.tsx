// app/contato/page.tsx
import Link from "next/link";

type Unidade = {
  nome: string;
  tipo: "Matriz" | "Filial" | "Base";
  endereco: string;
  responsavel?: string;
  // guardar em formato "somente dígitos" para o WhatsApp
  whatsapp?: string | null;
  // telefone em formato exibível (com espaços) + também usaremos telLink
  telefone?: string | null;
};

// helpers
function onlyDigits(v: string) {
  return (v || "").replace(/\D/g, "");
}

function waLink(whatsDigits: string) {
  return `https://wa.me/${whatsDigits}?text=${encodeURIComponent(
    "Olá! Vim pelo site da Happening."
  )}`;
}

function telLink(phone: string) {
  // tel aceita + e dígitos; vamos manter + e limpar o resto
  const digits = onlyDigits(phone);
  return `tel:+${digits}`;
}

const UNIDADES: Unidade[] = [
  {
    nome: "Matriz — Sertãozinho/SP",
    tipo: "Matriz",
    endereco:
    "Av. Marginal Maurílio Bacega, 1950 — JD das Palmeiras — Sertãozinho/SP — CEP 14177-290",
    telefone: "+55 16 3946-4500",
    whatsapp: //"", //
  },
  {
    nome: "Filial — São Paulo/SP",
    tipo: "Filial",
    endereco: "São Paulo/SP",    
    telefone: "+55 16 99102-9083",
    whatsapp: "5516991029083", // mesmo da Matriz (como você pediu)
  },
  {
    nome: "Filial — Santa Juliana/MG",
    tipo: "Filial",
    endereco: "Santa Juliana/MG",
    telefone: "+55 16 99337-4115",
    whatsapp: "5516993374115",
  },
  {
    nome: "Filial — Aroeira/MG",
    tipo: "Filial",
    endereco: "Tupaciguara/MG",    
    telefone: "+55 17 99734-0783",
    whatsapp: "5517997340783",
  },
  {
    nome: "Filial — Tropical/GO",
    tipo: "Filial",
    endereco: "Porteirão/GO",
    telefone: "+55 16 99322-4643",
    whatsapp: "5516993224643",
  },
];

const MAPA_MATRIZ_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13471.11640401829!2d-48.030750899999994!3d-21.13181205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94b99f1a04f33915%3A0x4a19ec93eb924a55!2sHappening%20Empreendimentos%20Importa%C3%A7%C3%A3o%20e%20Exporta%C3%A7%C3%A3o%20LTDA!5e1!3m2!1spt-BR!2sbr!4v1771007221898!5m2!1spt-BR!2sbr";

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
            Entre em contato com a unidade mais próxima para dúvidas, atendimento
            e suporte.
          </p>
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

                {u.responsavel && (
                  <p style={{ marginBottom: 8 }}>
                    <strong>Responsável:</strong> {u.responsavel}
                  </p>
                )}

                {/* TELEFONE (clicável) */}
                {u.telefone && (
                  <p style={{ marginBottom: 8 }}>
                    <strong>Telefone:</strong>{" "}
                    <a
                      href={telLink(u.telefone)}
                      style={{ color: "#0b7a4b", fontWeight: 800 }}
                    >
                      {u.telefone}
                    </a>
                  </p>
                )}

                {/* WHATSAPP (abrir conversa) */}
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
