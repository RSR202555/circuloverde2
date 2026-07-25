"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BlogPost } from "@/lib/types";
import Link from "next/link";

interface BlogFormProps {
  initialData?: BlogPost;
  isEdit?: boolean;
}

const CATEGORIAS = [
  "Agronomia",
  "Manejo de Solo",
  "Tecnologia & Pivôs",
  "Culturas",
  "Notícias"
];

const PRESET_IMAGES = [
  { label: "Pivô Central", url: "https://images.unsplash.com/photo-1595838787766-3d7178a5e3e2?q=80&w=1200&auto=format&fit=crop" },
  { label: "Lavora de Soja", url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1200&auto=format&fit=crop" },
  { label: "Painel Elétrico", url: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1200&auto=format&fit=crop" },
  { label: "Campo de Milho", url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1200&auto=format&fit=crop" },
  { label: "Trator Agricultura", url: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?q=80&w=1200&auto=format&fit=crop" }
];

export default function BlogForm({ initialData, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [errorMsg, setErrorMsg] = useState("");

  const [titulo, setTitulo] = useState(initialData?.titulo || "");
  const [slug, setSlug] = useState(initialData?.slug || "");
  const [autoSlug, setAutoSlug] = useState(!isEdit);
  const [subtitulo, setSubtitulo] = useState(initialData?.subtitulo || "");
  const [conteudo, setConteudo] = useState(initialData?.conteudo || "");
  const [capaUrl, setCapaUrl] = useState(initialData?.capa_url || PRESET_IMAGES[0].url);
  const [autor, setAutor] = useState(initialData?.autor || "Equipe Círculo Verde");
  const [categoria, setCategoria] = useState(initialData?.categoria || "Agronomia");
  const [tempoLeitura, setTempoLeitura] = useState(initialData?.tempo_leitura || "5 min");
  const [status, setStatus] = useState<"rascunho" | "publicado">(initialData?.status || "publicado");
  const [destaque, setDestaque] = useState(initialData?.destaque ?? false);

  // Auto-generate slug when title changes
  useEffect(() => {
    if (autoSlug && titulo) {
      const generated = titulo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      setSlug(generated);
    }
  }, [titulo, autoSlug]);

  function insertFormatting(tagStart: string, tagEnd: string = "") {
    const textarea = document.getElementById("conteudo-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = conteudo.substring(start, end);
    const replacement = `${tagStart}${selectedText || "Texto aqui"}${tagEnd}`;

    const newContent = conteudo.substring(0, start) + replacement + conteudo.substring(end);
    setConteudo(newContent);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!titulo.trim() || !conteudo.trim()) {
      setErrorMsg("Título e conteúdo são campos obrigatórios.");
      return;
    }

    setLoading(true);
    setErrorMsg("");

    const payload = {
      titulo,
      slug: slug || titulo.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      subtitulo,
      conteudo,
      capa_url: capaUrl,
      autor,
      categoria,
      tempo_leitura: tempoLeitura,
      status,
      destaque
    };

    try {
      const url = isEdit ? `/api/blog/${initialData?.id}` : "/api/blog";
      const method = isEdit ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Erro ao salvar matéria.");
      }

      router.push("/admin/blog");
      router.refresh();
    } catch (err: any) {
      setErrorMsg(err.message || "Falha na comunicação com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-5xl mx-auto pb-16">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/10">
        <div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-primary/70 hover:text-primary mb-1 transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            Voltar para matérias
          </Link>
          <h1 className="text-2xl font-black text-primary font-headline">
            {isEdit ? "Editar Matéria" : "Nova Matéria para o Blog"}
          </h1>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Link
            href="/admin/blog"
            className="flex-1 sm:flex-none text-center px-4 py-2.5 rounded-xl border border-outline-variant/20 text-sm font-bold text-on-surface-variant hover:bg-surface-container-low transition-colors"
          >
            Cancelar
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary hover:bg-primary-container text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {loading && <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>}
            <span className="material-symbols-outlined text-[18px]">{isEdit ? "save" : "publish"}</span>
            {isEdit ? "Salvar Alterações" : "Publicar Matéria"}
          </button>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm font-bold border border-red-200 flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px]">error</span>
          {errorMsg}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Columns: Title, Subtitle, Rich Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/10 space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-2">
                Título da Matéria *
              </label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                placeholder="ex: Manutenção Preventiva de Pivôs Centrais na Safra"
                className="w-full text-lg font-bold px-4 py-3 rounded-xl border border-outline-variant/20 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-headline"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-xs font-bold uppercase tracking-wider text-primary/70">
                  URL Amigável (Slug)
                </label>
                <button
                  type="button"
                  onClick={() => setAutoSlug(!autoSlug)}
                  className="text-xs text-primary/70 hover:text-primary font-semibold underline"
                >
                  {autoSlug ? "Editar manualmente" : "Gerar automaticamente"}
                </button>
              </div>
              <input
                type="text"
                value={slug}
                readOnly={autoSlug}
                onChange={(e) => setSlug(e.target.value)}
                className={`w-full text-xs font-mono px-3 py-2 rounded-xl border border-outline-variant/20 outline-none transition-all ${
                  autoSlug ? "bg-surface-container-low text-on-surface-variant/70" : "bg-white focus:border-primary"
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-primary/70 mb-2">
                Subtítulo / Resumo da Matéria
              </label>
              <textarea
                rows={2}
                value={subtitulo}
                onChange={(e) => setSubtitulo(e.target.value)}
                placeholder="Breve resumo que aparecerá nos cards da listagem do blog..."
                className="w-full text-sm px-4 py-3 rounded-xl border border-outline-variant/20 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all font-body"
              />
            </div>
          </div>

          {/* Content Editor & Preview Tabs */}
          <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant/10 bg-surface-container-lowest">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("edit")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "edit"
                      ? "bg-primary text-white shadow-xs"
                      : "text-primary/70 hover:bg-primary/5"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] inline-block align-middle mr-1">edit</span>
                  Editor de Conteúdo
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("preview")}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    activeTab === "preview"
                      ? "bg-primary text-white shadow-xs"
                      : "text-primary/70 hover:bg-primary/5"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px] inline-block align-middle mr-1">visibility</span>
                  Pré-visualização
                </button>
              </div>
              <span className="text-xs text-on-surface-variant/60 font-semibold hidden sm:inline-block">
                Aceita HTML formatado e tags editoriais
              </span>
            </div>

            {activeTab === "edit" ? (
              <div className="p-6">
                {/* Editor Toolbar */}
                <div className="flex flex-wrap items-center gap-1.5 p-2 bg-surface-container-low rounded-xl mb-4 border border-outline-variant/10 text-xs">
                  <button
                    type="button"
                    title="Subtítulo H2"
                    onClick={() => insertFormatting('<h2 class="text-2xl font-black text-primary font-headline mt-8 mb-4">', '</h2>')}
                    className="px-2.5 py-1.5 bg-white hover:bg-primary/10 rounded-lg font-bold text-primary transition-colors border border-outline-variant/10"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    title="Subtítulo H3"
                    onClick={() => insertFormatting('<h3 class="text-xl font-bold text-primary font-headline mt-6 mb-3">', '3</h2>')}
                    className="px-2.5 py-1.5 bg-white hover:bg-primary/10 rounded-lg font-bold text-primary transition-colors border border-outline-variant/10"
                  >
                    H3
                  </button>
                  <div className="w-[1px] h-6 bg-outline-variant/20 mx-1"></div>
                  <button
                    type="button"
                    title="Negrito"
                    onClick={() => insertFormatting('<strong>', '</strong>')}
                    className="px-2.5 py-1.5 bg-white hover:bg-primary/10 rounded-lg font-bold text-primary transition-colors border border-outline-variant/10"
                  >
                    <b>B</b>
                  </button>
                  <button
                    type="button"
                    title="Itálico"
                    onClick={() => insertFormatting('<em>', '</em>')}
                    className="px-2.5 py-1.5 bg-white hover:bg-primary/10 rounded-lg font-serif italic text-primary transition-colors border border-outline-variant/10"
                  >
                    <i>I</i>
                  </button>
                  <div className="w-[1px] h-6 bg-outline-variant/20 mx-1"></div>
                  <button
                    type="button"
                    title="Citação"
                    onClick={() => insertFormatting('<blockquote class="border-l-4 border-emerald-500 pl-4 py-2 my-6 italic text-emerald-950 bg-emerald-50/50 rounded-r-xl font-body">"', '"</blockquote>')}
                    className="px-2.5 py-1.5 bg-white hover:bg-primary/10 rounded-lg font-bold text-primary transition-colors border border-outline-variant/10 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">format_quote</span>
                    Citação
                  </button>
                  <button
                    type="button"
                    title="Caixa Destaque / Dica"
                    onClick={() => insertFormatting('<div class="bg-primary/5 p-6 rounded-2xl my-8 border border-primary/10">\n  <h3 class="text-lg font-bold text-primary font-headline mb-2">💡 Dica Técnica</h3>\n  <p class="text-sm text-on-surface-variant font-body">', '</p>\n</div>')}
                    className="px-2.5 py-1.5 bg-white hover:bg-primary/10 rounded-lg font-bold text-primary transition-colors border border-outline-variant/10 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">lightbulb</span>
                    Caixa Dica
                  </button>
                  <button
                    type="button"
                    title="Lista"
                    onClick={() => insertFormatting('<ul class="list-disc pl-6 space-y-2 text-on-surface-variant font-body mb-6">\n  <li>', '</li>\n</ul>')}
                    className="px-2.5 py-1.5 bg-white hover:bg-primary/10 rounded-lg font-bold text-primary transition-colors border border-outline-variant/10 flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">format_list_bulleted</span>
                    Lista
                  </button>
                </div>

                <textarea
                  id="conteudo-textarea"
                  rows={16}
                  value={conteudo}
                  onChange={(e) => setConteudo(e.target.value)}
                  placeholder="Escreva o artigo da matéria aqui... Você pode utilizar parágrados <p> e formatação..."
                  className="w-full font-mono text-sm p-4 rounded-xl border border-outline-variant/20 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all leading-relaxed"
                  required
                />
              </div>
            ) : (
              <div className="p-8 prose max-w-none">
                {conteudo ? (
                  <div
                    dangerouslySetInnerHTML={{ __html: conteudo }}
                    className="space-y-4 font-body text-on-surface-variant leading-relaxed"
                  />
                ) : (
                  <p className="text-on-surface-variant/40 italic text-center py-12">
                    Nenhum conteúdo escrito ainda para pré-visualização.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right 1 Column: Metadata, Cover Image & Status Settings */}
        <div className="space-y-6">
          {/* Status & Visibility */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary font-headline">
              Status & Destaque
            </h3>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-2">
                Status da Publicação
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setStatus("publicado")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    status === "publicado"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-emerald-50"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  Publicado
                </button>
                <button
                  type="button"
                  onClick={() => setStatus("rascunho")}
                  className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    status === "rascunho"
                      ? "bg-amber-600 text-white shadow-xs"
                      : "bg-surface-container-low text-on-surface-variant hover:bg-amber-50"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">edit_note</span>
                  Rascunho
                </button>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-variant/10">
              <label className="flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-sm font-bold text-on-surface">Destacar na Capa</span>
                  <p className="text-xs text-on-surface-variant/70">Exibir como artigo principal no topo do Blog</p>
                </div>
                <input
                  type="checkbox"
                  checked={destaque}
                  onChange={(e) => setDestaque(e.target.checked)}
                  className="w-5 h-5 accent-primary rounded cursor-pointer"
                />
              </label>
            </div>
          </div>

          {/* Category & Author Settings */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary font-headline">
              Classificação & Autor
            </h3>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5">
                Categoria da Matéria
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full text-sm font-semibold px-3.5 py-2.5 rounded-xl border border-outline-variant/20 focus:border-primary outline-none bg-white"
              >
                {CATEGORIAS.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5">
                Nome do Autor
              </label>
              <input
                type="text"
                value={autor}
                onChange={(e) => setAutor(e.target.value)}
                placeholder="ex: Eng. Roberto Silva"
                className="w-full text-sm font-medium px-3.5 py-2.5 rounded-xl border border-outline-variant/20 focus:border-primary outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5">
                Tempo Estimado de Leitura
              </label>
              <input
                type="text"
                value={tempoLeitura}
                onChange={(e) => setTempoLeitura(e.target.value)}
                placeholder="ex: 5 min"
                className="w-full text-sm font-medium px-3.5 py-2.5 rounded-xl border border-outline-variant/20 focus:border-primary outline-none"
              />
            </div>
          </div>

          {/* Cover Image Picker */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-outline-variant/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-primary font-headline">
              Imagem de Capa
            </h3>

            {capaUrl && (
              <div className="relative aspect-video rounded-xl overflow-hidden border border-outline-variant/10 bg-black/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={capaUrl}
                  alt="Pré-visualização da capa"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-on-surface-variant mb-1.5">
                URL da Imagem de Capa
              </label>
              <input
                type="text"
                value={capaUrl}
                onChange={(e) => setCapaUrl(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full text-xs font-mono px-3.5 py-2.5 rounded-xl border border-outline-variant/20 focus:border-primary outline-none"
              />
            </div>

            <div>
              <span className="block text-xs font-bold text-on-surface-variant/70 mb-2">
                Sugestões de Fotos Agrícolas:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_IMAGES.map((img) => (
                  <button
                    key={img.label}
                    type="button"
                    onClick={() => setCapaUrl(img.url)}
                    className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-surface-container-low hover:bg-primary/10 text-primary transition-colors border border-outline-variant/10"
                  >
                    {img.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
