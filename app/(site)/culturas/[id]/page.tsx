import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { culturas } from "@/data/culturas";

interface PageProps {
  params: Promise<{ id: string }> | { id: string };
}

// Gera os parâmetros estáticos para que o Next.js possa pré-renderizar todas as rotas de culturas em tempo de build
export async function generateStaticParams() {
  return culturas.map((c) => ({
    id: c.id,
  }));
}

// Gera dinamicamente os metadados de SEO para cada cultura
export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = typeof (params as any).then === 'function' ? await params : params as { id: string };
  const id = resolvedParams.id;
  const cultura = culturas.find((c) => c.id === id);

  if (!cultura) {
    return {
      title: "Cultura não encontrada | Círculo Verde",
    };
  }

  return {
    title: `${cultura.nome} & Irrigação de Precisão | Círculo Verde`,
    description: `Saiba como a irrigação de alta performance por pivô central KREBS otimiza a produtividade do cultivo de ${cultura.nome.toLowerCase()} no Nordeste.`,
  };
}

export default async function CulturaDetailPage({ params }: PageProps) {
  const resolvedParams = typeof (params as any).then === 'function' ? await params : params as { id: string };
  const id = resolvedParams.id;
  const cultura = culturas.find((c) => c.id === id);

  if (!cultura) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-24 bg-surface-container-lowest font-body text-on-surface">
        {/* Dynamic Detail Panel */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 pt-12">
          {/* Back button and breadcrumb navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <Link
              href="/culturas"
              className="inline-flex items-center gap-2 text-sm font-bold text-secondary hover:text-emerald-900 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">arrow_back</span>
              Voltar para Culturas
            </Link>
            
            <div className="flex items-center gap-2 text-xs font-semibold text-on-surface-variant/60">
              <Link href="/" className="hover:text-secondary transition-colors">Início</Link>
              <span>/</span>
              <Link href="/culturas" className="hover:text-secondary transition-colors">Culturas</Link>
              <span>/</span>
              <span className="text-secondary">{cultura.nome}</span>
            </div>
          </div>

          <div className="bg-surface-container-low rounded-3xl p-8 md:p-16 border border-outline-variant/10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Section Breadcrumb/Badge */}
            <div className="flex items-center gap-2 mb-6">
              <span className="h-1.5 w-8 bg-secondary rounded-full"></span>
              <h2 className="text-sm font-bold text-secondary tracking-widest uppercase">
                {cultura.tituloDoc}
              </h2>
            </div>

            {/* Title and Intro Paragraph (2 Columns) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-12">
              <div className="lg:col-span-6">
                <h3 className="text-3xl md:text-4.5xl font-headline font-black text-primary leading-tight">
                  {cultura.subtitulo1}
                </h3>
              </div>
              <div className="lg:col-span-6">
                <p className="text-base md:text-lg text-on-surface-variant leading-relaxed">
                  {cultura.texto1}
                </p>
              </div>
            </div>

            {/* Side-by-side Visuals */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg relative bg-white border border-outline-variant/10">
                <img
                  src={cultura.imagem_detail || cultura.imagem}
                  alt={cultura.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/55 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full font-bold">
                  Campo de {cultura.nome}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden aspect-[4/3] shadow-lg relative bg-white border border-outline-variant/10">
                <img
                  src={cultura.imagem2 || "/feira 2.png"}
                  alt={cultura.imagem2 ? `Campo de ${cultura.nome} Irrigado` : "Pivô Central KREBS"}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 bg-black/55 backdrop-blur-md text-white text-xs px-3.5 py-1.5 rounded-full font-bold">
                  {cultura.imagem2 ? "Irrigação de Precisão" : "Pivô KREBS em Ação"}
                </div>
              </div>
            </div>

            {/* Description and Key Benefits Row */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pt-6 border-t border-outline-variant/20 mb-12">
              <div className="lg:col-span-6 space-y-4">
                <h4 className="text-xl font-bold text-primary font-headline">
                  {cultura.subtitulo2}
                </h4>
                <p className="text-base text-on-surface-variant leading-relaxed">
                  {cultura.texto2}
                </p>
              </div>
              <div className="lg:col-span-6">
                <h4 className="text-sm font-bold text-emerald-950/40 tracking-wider uppercase mb-6">
                  Benefícios da Irrigação por Pivô
                </h4>
                <ul className="space-y-4">
                  {cultura.beneficios.map((beneficio, idx) => (
                    <li key={idx} className="flex gap-4 items-start">
                      <span className="w-6 h-6 rounded-full bg-secondary/15 text-secondary flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[16px] font-bold">check</span>
                      </span>
                      <span className="text-sm md:text-base text-on-surface-variant font-medium leading-normal">
                        {beneficio}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Card */}
            <div className="bg-white rounded-2xl p-8 border border-outline-variant/15 flex flex-col items-center justify-center text-center gap-6 shadow-sm">
              <h4 className="text-xl md:text-2xl font-bold text-primary font-headline">
                Pronto para otimizar sua lavoura de {cultura.nome}?
              </h4>
              <p className="text-sm md:text-base text-on-surface-variant max-w-xl leading-relaxed">
                Fale com nossos consultores para fazer um estudo de viabilidade hídrica e solicitar um orçamento sob medida para a sua propriedade.
              </p>
              <Link
                href="/#chamado"
                className="inline-flex items-center gap-2 bg-secondary text-white font-bold px-10 py-4 rounded-xl hover:opacity-90 transition-all active:scale-95 shadow-md text-base"
              >
                Solicite um Orçamento
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
