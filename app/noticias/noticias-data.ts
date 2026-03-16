export type Noticia = {
  id: number;
  slug: string;
  categoria: "Treinamento" | "Empresa";
  titulo: string;
  data: string;
  resumo: string;
  imagem: string;
  conteudo: string[];
  galeria?: string[];
};

export const noticias: Noticia[] = [
  {
    id: 1,
    slug: "treinamento-lideres-santa-juliana-mg",
    categoria: "Treinamento",
    titulo: "Treinamento de Líderes é realizado na filial de Santa Juliana/MG",
    data: "15 de março de 2026",
    resumo:
      "A Happening realizou um treinamento voltado ao desenvolvimento de líderes na filial de Santa Juliana/MG, reforçando práticas de liderança e alinhamento das equipes.",
    imagem: "/noticias/treinamento-lideres-2026-1.jpg",
    conteudo: [
      "A Happening promoveu um Treinamento de Líderes na filial de Santa Juliana/MG, com foco no desenvolvimento da liderança, no alinhamento das equipes e no fortalecimento das rotinas de gestão.",
      "A iniciativa teve como objetivo reforçar a importância da liderança no dia a dia das operações, estimulando uma atuação mais estratégica, organizada e colaborativa entre os times.",
      "Momentos como esse contribuem para a evolução profissional das equipes e para a melhoria contínua dos processos internos, sempre buscando mais eficiência, comunicação e resultados para a empresa.",
    ],
    galeria: [
      "/noticias/treinamento-lideres-2026-1.jpg",
      "/noticias/treinamento-lideres-2026-2.jpg",
      "/noticias/treinamento-lideres-2026-3.jpg",
      "/noticias/treinamento-lideres-2026-4.jpg",
      "/noticias/treinamento-lideres-2026-5.jpg",
      "/noticias/treinamento-lideres-2026-6.jpg",
    ],
  },
  {
    id: 2,
    slug: "novo-site-happening-2026",
    categoria: "Empresa",
    titulo: "Happening lança seu novo site institucional",
    data: "12 de março de 2026",
    resumo:
      "A Happening colocou no ar seu novo site institucional com visual mais moderno, navegação mais clara e informações organizadas para clientes, parceiros e colaboradores.",
    imagem: "/noticias/divulgacao-novo-site-happening.jpg",
    conteudo: [
      "No dia 12 de março de 2026, a Happening lançou oficialmente seu novo site institucional.",
      "O novo portal foi desenvolvido com foco em modernização, organização das informações e fortalecimento da presença digital da empresa, oferecendo uma navegação mais clara, visual mais atual e acesso facilitado aos principais conteúdos institucionais.",
      "Com essa atualização, a Happening reforça seu compromisso com inovação, comunicação e melhoria contínua, aproximando ainda mais a empresa de clientes, parceiros e colaboradores.",
    ],
    galeria: ["/noticias/divulgacao-novo-site-happening.jpg"],
  },
];