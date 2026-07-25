import { getBlogPostBySlug, getBlogPosts, incrementBlogPostViews } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import ShareButtons from "./ShareButtons";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: `${post.titulo} | Notícias Círculo Verde`,
    description: post.subtitulo,
    openGraph: {
      title: post.titulo,
      description: post.subtitulo,
      images: [post.capa_url]
    }
  };
}

export default async function BlogPostViewPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post || post.status !== "publicado") {
    notFound();
  }

  // Increment view count
  await incrementBlogPostViews(post.id);

  // Fetch related posts (same category or recent, excluding current)
  const allPosts = await getBlogPosts({ status: "publicado", limit: 4 });
  const relatedPosts = allPosts.filter(p => p.id !== post.id).slice(0, 3);

  return (
    <article className="pt-24 pb-20 bg-background min-h-screen font-body">
      {/* Top Header & Breadcrumbs */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 pt-6 pb-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-on-surface-variant/70 font-medium mb-6">
          <Link href="/" className="hover:text-primary transition-colors">Início</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-primary transition-colors">Notícias</Link>
          <span>/</span>
          <span className="text-primary font-bold truncate max-w-[200px] sm:max-w-xs">{post.categoria}</span>
        </nav>

        {/* Category & Time */}
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-primary/10 text-primary font-extrabold text-xs px-3.5 py-1 rounded-full border border-primary/10">
            {post.categoria}
          </span>
          <span className="text-xs text-on-surface-variant/70 flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {post.tempo_leitura} de leitura
          </span>
          <span className="text-xs text-on-surface-variant/70 flex items-center gap-1 font-semibold">
            <span className="material-symbols-outlined text-[14px]">visibility</span>
            {post.views || 1} leituras
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-primary font-headline leading-tight tracking-tight mb-4">
          {post.titulo}
        </h1>

        {/* Subtitle */}
        {post.subtitulo && (
          <p className="text-base sm:text-lg text-on-surface-variant/80 font-body leading-relaxed mb-6">
            {post.subtitulo}
          </p>
        )}

        {/* Author & Date Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-outline-variant/10 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 text-primary font-black flex items-center justify-center text-sm border border-primary/20">
              {post.autor.charAt(0)}
            </div>
            <div>
              <p className="font-bold text-on-surface text-sm">{post.autor}</p>
              <p className="text-on-surface-variant/60">
                Publicado em {new Date(post.published_at || post.created_at).toLocaleDateString("pt-BR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric"
                })}
              </p>
            </div>
          </div>

          <ShareButtons title={post.titulo} />
        </div>
      </div>

      {/* Hero Cover Image */}
      <div className="max-w-4xl mx-auto px-6 md:px-8 mb-12">
        <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-lg border border-outline-variant/10 bg-surface-container-low">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.capa_url || "https://images.unsplash.com/photo-1595838787766-3d7178a5e3e2?q=80&w=1200&auto=format&fit=crop"}
            alt={post.titulo}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Main Article Content (Max-Width 680px as in DESIGN.md for editorial reading) */}
      <div className="max-w-[680px] mx-auto px-6 font-body text-on-surface leading-relaxed space-y-6">
        <div
          dangerouslySetInnerHTML={{ __html: post.conteudo }}
          className="prose prose-emerald lg:prose-lg max-w-none text-on-surface-variant space-y-4"
        />

        {/* Article Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="pt-8 border-t border-outline-variant/10 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-primary/70">Tags:</span>
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold text-primary/80 bg-primary/5 px-3 py-1 rounded-full border border-primary/10"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Call to Action Box for Technical Assistance / Parts */}
        <div className="my-10 p-6 md:p-8 rounded-2xl bg-gradient-to-br from-primary/5 via-emerald-50 to-primary/10 border border-primary/15 space-y-3">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <span className="material-symbols-outlined text-[20px]">support_agent</span>
            <span>Suporte Técnico Especializado Círculo Verde</span>
          </div>
          <h4 className="text-lg font-black text-primary font-headline">
            Precisa de peças para pivô central ou consultoria técnica no seu campo?
          </h4>
          <p className="text-xs text-on-surface-variant/80 font-body">
            Nossa equipe técnica atende prontamente produtores de todo o Brasil com peças originais KREBS e assistência especializada.
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              href="/#chamado"
              className="inline-flex items-center gap-2 bg-primary text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs hover:bg-primary-container transition-all"
            >
              Abrir Chamado Técnico
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-white text-primary font-bold text-xs px-4 py-2.5 rounded-xl border border-primary/20 hover:bg-primary/5 transition-all"
            >
              Ver Catálogo de Peças
            </Link>
          </div>
        </div>
      </div>

      {/* Related Posts Section */}
      {relatedPosts.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-8 pt-16 mt-16 border-t border-outline-variant/10">
          <div className="flex justify-between items-end mb-8">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">Leia Também</span>
              <h3 className="text-2xl font-black text-primary font-headline mt-1">
                Matérias Relacionadas
              </h3>
            </div>
            <Link
              href="/blog"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              Ver todas as matérias
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                href={`/blog/${rel.slug}`}
                className="bg-white rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all border border-outline-variant/10 group flex flex-col justify-between"
              >
                <div className="aspect-[16/9] overflow-hidden bg-surface-container-low">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={rel.capa_url || "https://images.unsplash.com/photo-1595838787766-3d7178a5e3e2?q=80&w=1200&auto=format&fit=crop"}
                    alt={rel.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <span className="text-[11px] font-bold text-primary/70">{rel.categoria}</span>
                  <h4 className="text-sm font-bold text-primary font-headline line-clamp-2 group-hover:text-secondary transition-colors">
                    {rel.titulo}
                  </h4>
                  <p className="text-xs text-on-surface-variant/70 line-clamp-2">
                    {rel.subtitulo}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
