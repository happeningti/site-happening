import { notFound } from "next/navigation";
import { noticias } from "../../noticias/noticias-data";
import NoticiaDetalheClient from "./NoticiaDetalheClient";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function NoticiaDetalhePage({ params }: Props) {
  const { slug } = await params;

  const noticia = noticias.find((item) => item.slug === slug);

  if (!noticia) {
    notFound();
  }

  return <NoticiaDetalheClient noticia={noticia} />;
}