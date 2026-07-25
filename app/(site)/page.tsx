import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChamadoForm from "@/components/ChamadoForm";
import { getBlogPosts } from "@/lib/db";

export default async function HomePage() {
  const latestBlogPosts = await getBlogPosts({ status: "publicado", limit: 3 });

  return (
    <>
      <Navbar />
      <main className="bg-background min-h-screen font-body text-on-surface">
        {/* Full-Screen Pure Photography Hero (Uncluttered, Direct & Assertive) */}
        <header className="relative min-h-screen flex flex-col justify-between overflow-hidden bg-black text-white pt-28 pb-6">
          {/* Natural Full-Bleed Background Image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/imagem 1.jpeg"
            alt="Pivô central de irrigação KREBS no campo"
            className="absolute inset-0 w-full h-full object-cover object-center contrast-[1.05]"
          />

          {/* Minimal Dark Left Vignette for High Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/25 to-transparent z-10"></div>

          {/* Clean & Assertive Text Area */}
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-20 w-full my-auto py-12">
            <div className="max-w-3xl space-y-6 text-left">
              {/* Smaller Discreet Badge */}
              <div className="inline-flex items-center gap-2 bg-[#47a934]/20 text-[#47a934] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full border border-[#47a934]/40 backdrop-blur-md shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#47a934] animate-pulse"></span>
                Revenda Oficial KREBS
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-headline tracking-tight leading-[1.08] text-white drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)]">
                O Nordeste cada <br />
                <span className="text-[#47a934] font-black">
                  vez mais verde.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-white/95 text-base sm:text-xl font-medium leading-relaxed max-w-2xl drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
                Elevando a produtividade do agronegócio com engenharia de precisão e suporte técnico ininterrupto.
              </p>

              {/* 2 Clear Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <Link
                  href="/catalogo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#47a934] hover:bg-[#3b9329] text-white font-black text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-2xl transition-all active:scale-95 cursor-pointer"
                >
                  Ver Pivôs & Catálogo de Peças
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>

                <a
                  href="#chamado"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-black/60 hover:bg-black/80 text-white font-bold text-sm px-7 py-4 rounded-2xl border border-white/30 backdrop-blur-md shadow-lg transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#47a934]">support_agent</span>
                  Solicitar Suporte Técnico
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Video Presentation Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="bg-white p-8 md:p-12 rounded-3xl border border-outline-variant/10 shadow-lg">
            <div className="max-w-3xl mx-auto text-center mb-8 space-y-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase">
                <span className="material-symbols-outlined text-[16px]">play_circle</span>
                Vídeo de Apresentação
              </span>
              <h2 className="text-3xl font-headline font-black text-primary">
                Círculo Verde & KREBS no Campo
              </h2>
              <p className="text-on-surface-variant text-sm md:text-base font-body">
                Veja os pivôs de alta precisão operando nas lavouras do Nordeste.
              </p>
            </div>
            <div className="max-w-4xl mx-auto aspect-video rounded-2xl overflow-hidden shadow-2xl border border-outline-variant/10 bg-black">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/3OD2VdQYRvg"
                title="Equipamentos KREBS em Ação"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* Pivôs KREBS Section */}
        <section id="produtos" className="bg-gradient-to-b from-surface-container-low to-background py-20 border-y border-outline-variant/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 space-y-12">
            <div className="max-w-3xl space-y-3">
              <span className="inline-flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-widest bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
                Engenharia Hídrica
              </span>
              <h2 className="text-4xl font-headline font-black text-primary">
                Venda & Montagem de Pivôs Centrais KREBS
              </h2>
              <p className="text-on-surface-variant text-base md:text-lg leading-relaxed">
                Referência em alta resistência estrutural e eficiência energética. Soluções customizadas para as demandas da Bahia, Piauí e Pernambuco.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden shadow-xl border border-outline-variant/10 group flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface-container-low">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      alt="Pivô KREBS em operação no campo"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      src="/imagem 2.jpeg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                      <span className="bg-emerald-400 text-emerald-950 text-[11px] font-black uppercase px-3 py-1 rounded-full tracking-wider">
                        Atendimento Regional
                      </span>
                      <h3 className="text-2xl font-bold font-headline">
                        O Pivô do Brasil no Nordeste
                      </h3>
                      <p className="text-emerald-100/80 text-xs max-w-lg">
                        Atendimento com equipe móvel e estoque de peças prontas na Bahia, Piauí e Pernambuco.
                      </p>
                    </div>
                  </div>

                  <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 bg-surface-container-lowest border-t border-outline-variant/10 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-primary/70 uppercase">Cobertura</span>
                      <p className="font-bold text-primary text-sm mt-0.5">BA • PI • PE</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-primary/70 uppercase">Automação</span>
                      <p className="font-bold text-primary text-sm mt-0.5">Kube By B-Hyve</p>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-primary/70 uppercase">Garantia</span>
                      <p className="font-bold text-primary text-sm mt-0.5">Estrutural Completa</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-outline-variant/10">
                  <a
                    href="#chamado"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white py-3.5 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95"
                  >
                    Solicitar Orçamento de Pivô
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </a>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="bg-gradient-to-br from-emerald-950 via-primary to-emerald-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden flex flex-col justify-center space-y-6">
                  <h4 className="text-lg font-black font-headline text-emerald-300 uppercase tracking-wider">
                    Diferenciais do Pivô KREBS
                  </h4>
                  <div className="space-y-4 text-xs font-semibold text-emerald-100">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-400 text-emerald-950 font-black flex items-center justify-center shrink-0">✓</span>
                      <span>Estrutura de aço galvanizado a fogo de alta durabilidade</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-400 text-emerald-950 font-black flex items-center justify-center shrink-0">✓</span>
                      <span>Motoredutores de alta eficiência e menor consumo energético</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-emerald-400 text-emerald-950 font-black flex items-center justify-center shrink-0">✓</span>
                      <span>Peças 100% nacionais com pronta entrega regional</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/10 flex-1 space-y-4">
                  <h4 className="text-base font-bold text-primary font-headline flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">verified_user</span>
                    Assistência Técnica Círculo Verde
                  </h4>
                  <p className="text-xs text-on-surface-variant/80 font-body leading-relaxed">
                    Nossa equipe realiza preventivas, alinhamentos de lances, trocas de anel coletor e revisão de contatores elétricos com velocidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Support Section */}
        <section id="chamado" className="max-w-7xl mx-auto px-6 md:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="order-2 lg:order-1">
              <ChamadoForm />
            </div>
            <div className="order-1 lg:order-2 space-y-8 lg:sticky lg:top-32">
              <div className="space-y-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  Plantão de Emergência
                </span>
                <h2 className="text-4xl lg:text-5xl font-headline font-black text-primary leading-tight">
                  Suporte Técnico que Não Para.
                </h2>
                <p className="text-on-surface-variant text-base lg:text-lg leading-relaxed font-body">
                  No agronegócio, cada hora com o pivô parado pode representar perda na colheita. Nossa equipe técnica atende chamados preventivos e emergenciais.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 bg-white rounded-2xl border border-outline-variant/10 shadow-xs space-y-2">
                  <span className="material-symbols-outlined text-3xl text-secondary">speed</span>
                  <h3 className="font-bold text-primary text-base font-headline">Atendimento Ágil</h3>
                  <p className="text-xs text-on-surface-variant/75 font-body">
                    Equipe móvel pronta para ir até a sua fazenda.
                  </p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-outline-variant/10 shadow-xs space-y-2">
                  <span className="material-symbols-outlined text-3xl text-secondary">local_shipping</span>
                  <h3 className="font-bold text-primary text-base font-headline">Logística Própria</h3>
                  <p className="text-xs text-on-surface-variant/75 font-body">
                    Frota e estoque de peças nos 3 estados operacionais.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Spare Parts Section */}
        <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="max-w-2xl space-y-2">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Catálogo Digital</span>
              <h2 className="text-3xl font-headline font-black text-primary">
                Peças de Reposição Originais
              </h2>
              <p className="text-on-surface-variant text-sm sm:text-base font-body">
                Componentes de altíssima resistência testados para os pivôs centrais KREBS.
              </p>
            </div>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-primary/5 hover:bg-primary text-primary hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all border border-primary/10"
            >
              Ver Catálogo Completo
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                sku: "K-001",
                nome: "Anel Coletor",
                badge: "KREBS Original",
                imagem: "/produtos/Anel coletor.jpg",
              },
              {
                sku: "K-004",
                nome: "Bocais Especiais",
                badge: "Irrigação KREBS",
                imagem: "/produtos/Bocais (R$9,05).jpg",
              },
              {
                sku: "K-023",
                nome: "Câmara de Ar 14-9-24",
                badge: "Reposição Oficial",
                imagem: "/produtos/Câmara de ar 14-9-24.jpg",
              },
            ].map((produto) => (
              <div
                key={produto.sku}
                className="bg-white rounded-3xl border border-outline-variant/10 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
                      {produto.badge}
                    </span>
                    <span className="text-on-surface-variant/60 text-[10px] font-semibold">
                      SKU: {produto.sku}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-primary font-headline">
                    {produto.nome}
                  </h3>
                  <div className="relative h-48 w-full flex items-center justify-center bg-surface-container-low rounded-2xl overflow-hidden p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={produto.imagem}
                      alt={produto.nome}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <Link
                  href="/catalogo"
                  className="mt-6 w-full block text-center bg-primary/5 hover:bg-primary text-primary hover:text-white font-bold py-2.5 rounded-xl text-xs transition-colors"
                >
                  Consultar no Catálogo
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Latest News Section */}
        {latestBlogPosts.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 md:px-8 py-16 border-t border-outline-variant/10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div className="max-w-2xl space-y-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold tracking-widest uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  Notícias & Informação
                </span>
                <h2 className="text-3xl font-headline font-black text-primary">
                  Últimas Notícias Agrícolas
                </h2>
                <p className="text-on-surface-variant text-sm sm:text-base font-body">
                  Artigos técnicos sobre manejo de irrigação, pivôs centrais e produtividade.
                </p>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-primary/5 hover:bg-primary text-primary hover:text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all border border-primary/10"
              >
                Ver Todas as Notícias
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestBlogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-3xl border border-outline-variant/10 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-low">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.capa_url || "https://images.unsplash.com/photo-1595838787766-3d7178a5e3e2?q=80&w=1200&auto=format&fit=crop"}
                        alt={post.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <span className="bg-white/95 backdrop-blur-md text-primary font-bold text-[11px] px-3 py-1 rounded-full shadow-xs">
                          {post.categoria}
                        </span>
                      </div>
                    </div>

                    <div className="p-5 space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-on-surface-variant/60 font-medium">
                        <span>{new Date(post.published_at || post.created_at).toLocaleDateString("pt-BR")}</span>
                        <span>•</span>
                        <span>{post.tempo_leitura}</span>
                      </div>

                      <h3 className="text-base font-black text-primary font-headline leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                        <Link href={`/blog/${post.slug}`}>
                          {post.titulo}
                        </Link>
                      </h3>

                      <p className="text-xs text-on-surface-variant/75 font-body leading-relaxed line-clamp-2">
                        {post.subtitulo}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-outline-variant/5 text-xs">
                    <span className="font-bold text-on-surface-variant/70">
                      {post.autor}
                    </span>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-primary group-hover:text-secondary transition-colors"
                    >
                      Ler Notícia
                      <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                        chevron_right
                      </span>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </>
  );
}
