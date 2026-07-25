import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatalogoGrid from "@/components/CatalogoGrid";
import { getCategorias, getProdutos } from "@/lib/db";
import { Catalogo } from "@/lib/types";

export const metadata = {
  title: "Catálogo de Peças | Círculo Verde",
  description: "Catálogo completo de peças de reposição KREBS.",
};

interface Props {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function CatalogoPage({ searchParams }: Props) {
  const params = await searchParams;
  
  const dbCategorias = await getCategorias();
  const dbProdutos = await getProdutos();
  
  const formattedCategorias = dbCategorias.map(c => ({
    id: c.id,
    nome: c.nome,
    icone: c.icone || "build",
    produtos: dbProdutos
      .filter(p => p.categoria_id === c.id)
      .map(p => ({
        sku: p.sku,
        nome: p.nome,
        badge: p.badge || "KREBS Original",
        disponibilidade: p.disponibilidade || "Consulte Estoque",
        imagem: p.imagem || "",
        especificacoes: p.especificacoes || [],
        descricao: p.descricao || ""
      }))
  }));

  const catalogo: Catalogo = {
    categorias: formattedCategorias
  };

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Catálogo de Peças
            </span>
            <h1 className="text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-4">
              Peças de Reposição KREBS
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl">
              Componentes originais testados sob rigorosos padrões de qualidade.
              Clique em qualquer peça para ver especificações completas.
            </p>
          </div>
          <Suspense fallback={<div className="text-center py-24">Carregando...</div>}>
            <CatalogoGrid
              catalogo={catalogo}
              categoriaInicial={params.categoria}
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
