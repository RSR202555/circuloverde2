"use client";

import { useState } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types";

interface BlogClientViewProps {
  initialPosts: BlogPost[];
}

const CATEGORIAS = [
  { name: "Todas", icon: "dataset" },
  { name: "Agronomia", icon: "eco" },
  { name: "Manejo de Solo", icon: "landscape" },
  { name: "Tecnologia & Pivôs", icon: "precision_manufacturing" },
  { name: "Culturas", icon: "agriculture" },
  { name: "Notícias", icon: "newspaper" }
];

// Helper Image component with graceful fallback to real pivot photos
function SafeImage({ src, alt, className }: { src: string; alt: string; className: string }) {
  const [error, setError] = useState(false);
  const imageSrc = error || !src ? "/imagem 1.jpeg" : src;

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={imageSrc}
      alt={alt || "Notícia Círculo Verde"}
      onError={() => setError(true)}
      className={className}
    />
  );
}

export default function BlogClientView({ initialPosts }: BlogClientViewProps) {
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"recentes" | "populares">("recentes");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Sorting and filtering
  const featuredPost = initialPosts.find(p => p.destaque) || initialPosts[0];

  let filteredPosts = initialPosts.filter((post) => {
    const matchesCategory = selectedCategoria === "Todas" || post.categoria === selectedCategoria;
    const matchesSearch =
      post.titulo.toLowerCase().includes(search.toLowerCase()) ||
      post.subtitulo.toLowerCase().includes(search.toLowerCase()) ||
      post.autor.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (sortBy === "populares") {
    filteredPosts = [...filteredPosts].sort((a, b) => (b.views || 0) - (a.views || 0));
  } else {
    filteredPosts = [...filteredPosts].sort((a, b) => new Date(b.published_at || b.created_at).getTime() - new Date(a.published_at || a.created_at).getTime());
  }

  // Top read posts for sidebar widget
  const topReadPosts = [...initialPosts].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);

  function handleCopyShare(slug: string, id: string, e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof window !== "undefined") {
      const fullUrl = `${window.location.origin}/blog/${slug}`;
      navigator.clipboard.writeText(fullUrl);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  }

  return (
    <div className="pb-24 bg-background min-h-screen font-body text-on-surface">
      {/* Dynamic Modern Hero Banner */}
      <section className="relative bg-gradient-to-br from-emerald-950 via-primary to-emerald-900 text-white pt-28 sm:pt-36 pb-16 overflow-hidden">
        {/* Decorative Grid Patterns & Ambient Light */}
        <div className="absolute inset-0 bg-[radial-gradient(#87f886_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Title Area */}
            <div className="space-y-5 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-emerald-400/30 backdrop-blur-md shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                Notícias & Inteligência Agrícola
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-headline leading-tight tracking-tight text-white drop-shadow-md">
                Informação Técnica que <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-300 via-lime-200 to-emerald-400 bg-clip-text text-transparent">
                  Transforma o Campo
                </span>
              </h1>

              <p className="text-emerald-100/80 text-base sm:text-lg leading-relaxed font-normal">
                Análises de manejo hídrico, inovações em pivôs de irrigação KREBS, boletins de safra e estratégias para maximizar a produtividade do agronegócio.
              </p>

              {/* Stats Pulse Chips */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-bold text-emerald-200">
                  <span className="material-symbols-outlined text-[16px] text-emerald-400">article</span>
                  <span>+{initialPosts.length * 100 + 42} Artigos Publicados</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 text-xs font-bold text-emerald-200">
                  <span className="material-symbols-outlined text-[16px] text-emerald-400">verified_user</span>
                  <span>5.000+ Produtores Atendidos</span>
                </div>
              </div>
            </div>

            {/* Right Search & Filter Card */}
            <div className="w-full lg:w-96 bg-white/10 backdrop-blur-xl p-6 rounded-3xl border border-white/20 shadow-2xl space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-300 font-headline flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">search</span>
                Pesquisar Conteúdo
              </h3>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Ex: Pivô central, soja, painel elétrico..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-10 py-3.5 rounded-xl bg-white text-on-surface font-body text-sm outline-none shadow-inner focus:ring-2 focus:ring-emerald-400"
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px]">
                  search
                </span>
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-on-surface-variant/60 hover:text-primary"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Order selector */}
              <div className="flex items-center justify-between text-xs text-emerald-200 pt-2 border-t border-white/10">
                <span className="font-semibold">Ordenar por:</span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setSortBy("recentes")}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      sortBy === "recentes"
                        ? "bg-emerald-400 text-emerald-950 shadow-xs"
                        : "hover:bg-white/10 text-emerald-200"
                    }`}
                  >
                    Recentes
                  </button>
                  <button
                    onClick={() => setSortBy("populares")}
                    className={`px-3 py-1 rounded-lg font-bold transition-all ${
                      sortBy === "populares"
                        ? "bg-emerald-400 text-emerald-950 shadow-xs"
                        : "hover:bg-white/10 text-emerald-200"
                    }`}
                  >
                    Mais Lidos
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pt-10 relative z-20 space-y-12">


        {/* Featured Card (Shown if no active search filter) */}
        {!search && selectedCategoria === "Todas" && featuredPost && (
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-outline-variant/10 group transition-all hover:shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-12">
              {/* Image Container */}
              <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[360px] overflow-hidden bg-surface-container-low">
                <SafeImage
                  src={featuredPost.capa_url}
                  alt={featuredPost.titulo}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent lg:hidden"></div>

                {/* Floating Glass Badges */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                  <span className="bg-primary/90 backdrop-blur-md text-white font-extrabold text-xs px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 border border-white/20">
                    <span className="material-symbols-outlined text-[16px] text-amber-300">star</span>
                    Matéria em Destaque
                  </span>
                  <span className="bg-white/90 backdrop-blur-md text-primary font-bold text-xs px-3 py-1.5 rounded-full shadow-md">
                    {featuredPost.categoria}
                  </span>
                </div>
              </div>

              {/* Content Container */}
              <div className="lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-gradient-to-br from-white via-surface-container-lowest to-emerald-50/30">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-xs font-bold text-on-surface-variant/70">
                    <span className="flex items-center gap-1 text-primary">
                      <span className="material-symbols-outlined text-[16px]">schedule</span>
                      {featuredPost.tempo_leitura} de leitura
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">visibility</span>
                      {featuredPost.views || 0} leituras
                    </span>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-black text-primary font-headline leading-tight group-hover:text-secondary transition-colors">
                    <Link href={`/blog/${featuredPost.slug}`}>
                      {featuredPost.titulo}
                    </Link>
                  </h2>

                  <p className="text-on-surface-variant/80 text-sm font-body leading-relaxed line-clamp-3">
                    {featuredPost.subtitulo}
                  </p>
                </div>

                <div className="pt-6 border-t border-outline-variant/10 flex items-center justify-between mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center text-sm border border-primary/20 shrink-0">
                      {featuredPost.autor.charAt(0)}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-on-surface">{featuredPost.autor}</p>
                      <p className="text-[11px] text-on-surface-variant/60">
                        {new Date(featuredPost.published_at || featuredPost.created_at).toLocaleDateString("pt-BR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    Ler Notícia
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Grid Area with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Articles Main Grid (8 Columns) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-primary font-headline flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">newspaper</span>
                {selectedCategoria === "Todas" ? "Todas as Notícias" : `Notícias de ${selectedCategoria}`}
                <span className="text-xs font-bold text-on-surface-variant/60 font-body">
                  ({filteredPosts.length})
                </span>
              </h2>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center shadow-xs border border-outline-variant/10 space-y-3">
                <span className="material-symbols-outlined text-5xl text-primary/30">search_off</span>
                <h3 className="text-lg font-bold text-primary font-headline">Nenhuma notícia encontrada</h3>
                <p className="text-xs text-on-surface-variant/70">
                  Tente alterar os termos de busca ou selecione outra categoria acima.
                </p>
                <button
                  onClick={() => { setSearch(""); setSelectedCategoria("Todas"); }}
                  className="mt-2 text-xs font-bold text-primary underline"
                >
                  Limpar filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredPosts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-outline-variant/10 flex flex-col justify-between group"
                  >
                    <div>
                      {/* Image Container */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-surface-container-low">
                        <SafeImage
                          src={post.capa_url}
                          alt={post.titulo}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="bg-white/95 backdrop-blur-md text-primary font-bold text-[11px] px-3 py-1 rounded-full shadow-xs border border-outline-variant/10">
                            {post.categoria}
                          </span>
                        </div>
                        <button
                          onClick={(e) => handleCopyShare(post.slug, post.id, e)}
                          title="Copiar link da notícia"
                          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md flex items-center justify-center transition-colors shadow-xs"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {copiedId === post.id ? "check" : "share"}
                          </span>
                        </button>
                      </div>

                      {/* Content Body */}
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center gap-2 text-[11px] text-on-surface-variant/60 font-medium">
                          <span>{new Date(post.published_at || post.created_at).toLocaleDateString("pt-BR")}</span>
                          <span>•</span>
                          <span className="flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[13px]">schedule</span>
                            {post.tempo_leitura}
                          </span>
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

                    {/* Card Footer */}
                    <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-outline-variant/5 text-xs">
                      <span className="font-bold text-on-surface-variant/70 truncate max-w-[120px]">
                        {post.autor}
                      </span>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 font-bold text-primary group-hover:text-secondary transition-colors"
                      >
                        Ler matéria
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                          chevron_right
                        </span>
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar Widgets (4 Columns) */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Widget 1: Top Read Posts */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-outline-variant/10 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-primary font-headline flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500">local_fire_department</span>
                Mais Lidas da Semana
              </h3>

              <div className="divide-y divide-outline-variant/10">
                {topReadPosts.map((topPost, index) => (
                  <Link
                    key={topPost.id}
                    href={`/blog/${topPost.slug}`}
                    className="py-3 flex items-start gap-3 group block"
                  >
                    <span className="w-7 h-7 rounded-lg bg-primary/5 group-hover:bg-primary group-hover:text-white font-black text-primary text-xs flex items-center justify-center shrink-0 transition-colors">
                      {index + 1}
                    </span>
                    <div className="space-y-0.5">
                      <h4 className="text-xs font-bold text-primary font-headline line-clamp-2 group-hover:text-secondary transition-colors">
                        {topPost.titulo}
                      </h4>
                      <div className="flex items-center gap-2 text-[10px] text-on-surface-variant/60">
                        <span>{topPost.categoria}</span>
                        <span>•</span>
                        <span>{topPost.views || 0} visualizações</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget 2: Culturas em Foco Quick Selector */}
            <div className="bg-gradient-to-br from-surface-container-lowest to-emerald-50/50 p-6 rounded-3xl shadow-sm border border-primary/10 space-y-3">
              <h3 className="text-sm font-bold text-primary font-headline flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">agriculture</span>
                Culturas em Destaque
              </h3>
              <p className="text-xs text-on-surface-variant/75 font-body">
                Navegue pelas matérias técnicas focadas no seu tipo de lavoura:
              </p>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["Soja", "Milho", "Algodão", "Café", "Batata", "Feijão"].map((crop) => (
                  <Link
                    key={crop}
                    href={`/culturas`}
                    className="text-xs font-bold text-primary bg-white hover:bg-primary hover:text-white px-3 py-1.5 rounded-xl border border-outline-variant/15 transition-all shadow-2xs"
                  >
                    🌱 {crop}
                  </Link>
                ))}
              </div>
            </div>

            {/* Widget 3: Newsletter Box */}
            <div className="bg-gradient-to-br from-primary via-emerald-900 to-emerald-950 p-6 rounded-3xl text-white shadow-xl space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl pointer-events-none"></div>

              <div className="space-y-2 relative z-10">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-300">
                  Boletim Semanal
                </span>
                <h3 className="text-lg font-black font-headline leading-snug">
                  Receba novidades de irrigação no seu e-mail
                </h3>
                <p className="text-xs text-emerald-100/80">
                  Dicas técnicas de pivô central, manutenção e tecnologia agrícola.
                </p>
              </div>

              <div className="pt-2 relative z-10">
                <Link
                  href="/#newsletter"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-black text-xs uppercase tracking-wider py-3 rounded-xl shadow-md transition-all active:scale-95"
                >
                  Assinar Informativo
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
