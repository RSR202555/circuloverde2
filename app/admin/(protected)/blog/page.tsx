"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { BlogPost } from "@/lib/types";

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<"todos" | "publicado" | "rascunho">("todos");
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    try {
      setLoading(true);
      const res = await fetch("/api/blog");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (err) {
      console.error("Erro ao carregar matérias:", err);
    } finally {
      setLoading(false);
    }
  }

  async function handleToggleStatus(post: BlogPost) {
    const newStatus = post.status === "publicado" ? "rascunho" : "publicado";
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, status: newStatus } : p));
      }
    } catch (err) {
      console.error("Erro ao alterar status:", err);
    }
  }

  async function handleToggleDestaque(post: BlogPost) {
    const newDestaque = !post.destaque;
    try {
      const res = await fetch(`/api/blog/${post.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destaque: newDestaque })
      });
      if (res.ok) {
        setPosts(prev => prev.map(p => p.id === post.id ? { ...p, destaque: newDestaque } : p));
      }
    } catch (err) {
      console.error("Erro ao alterar destaque:", err);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Tem certeza que deseja excluir esta matéria? Esta ação não pode ser desfeita.")) return;
    setDeletingId(id);
    try {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) {
        setPosts(prev => prev.filter(p => p.id !== id));
      }
    } catch (err) {
      console.error("Erro ao excluir matéria:", err);
    } finally {
      setDeletingId(null);
    }
  }

  // Filtering
  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.titulo.toLowerCase().includes(search.toLowerCase()) ||
                          post.subtitulo.toLowerCase().includes(search.toLowerCase()) ||
                          post.autor.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = selectedStatus === "todos" || post.status === selectedStatus;
    const matchesCategory = selectedCategoria === "Todas" || post.categoria === selectedCategoria;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Metric stats
  const totalPosts = posts.length;
  const publicadosCount = posts.filter(p => p.status === "publicado").length;
  const rascunhosCount = posts.filter(p => p.status === "rascunho").length;
  const totalViews = posts.reduce((acc, p) => acc + (p.views || 0), 0);

  const categorias = ["Todas", "Agronomia", "Manejo de Solo", "Tecnologia & Pivôs", "Culturas", "Notícias"];

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-primary font-headline tracking-tight">
            Gestão do Blog & Matérias
          </h1>
          <p className="text-on-surface-variant/70 text-sm font-medium mt-1">
            Publique matérias, artigos de irrigação e orientações agrícolas para os produtores.
          </p>
        </div>

        <Link
          href="/admin/blog/novo"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-container text-white px-5 py-3 rounded-xl font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">add</span>
          Nova Matéria
        </Link>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-outline-variant/10 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider">Total de Matérias</p>
            <h3 className="text-2xl font-black text-primary font-headline mt-1">{totalPosts}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">newspaper</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/10 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider">Publicadas</p>
            <h3 className="text-2xl font-black text-emerald-600 font-headline mt-1">{publicadosCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">check_circle</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/10 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider">Rascunhos</p>
            <h3 className="text-2xl font-black text-amber-600 font-headline mt-1">{rascunhosCount}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">edit_note</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-outline-variant/10 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-on-surface-variant/60 uppercase tracking-wider">Total de Leituras</p>
            <h3 className="text-2xl font-black text-tertiary font-headline mt-1">{totalViews}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">visibility</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Status Tabs */}
        <div className="flex items-center gap-1.5 w-full md:w-auto bg-surface-container-low p-1 rounded-xl">
          <button
            onClick={() => setSelectedStatus("todos")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedStatus === "todos" ? "bg-white text-primary shadow-xs font-black" : "text-primary/70 hover:text-primary"
            }`}
          >
            Todas ({posts.length})
          </button>
          <button
            onClick={() => setSelectedStatus("publicado")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedStatus === "publicado" ? "bg-white text-emerald-700 shadow-xs font-black" : "text-primary/70 hover:text-primary"
            }`}
          >
            Publicadas ({publicadosCount})
          </button>
          <button
            onClick={() => setSelectedStatus("rascunho")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              selectedStatus === "rascunho" ? "bg-white text-amber-700 shadow-xs font-black" : "text-primary/70 hover:text-primary"
            }`}
          >
            Rascunhos ({rascunhosCount})
          </button>
        </div>

        {/* Category & Search */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          <select
            value={selectedCategoria}
            onChange={(e) => setSelectedCategoria(e.target.value)}
            className="w-full sm:w-auto text-xs font-semibold px-3 py-2.5 rounded-xl border border-outline-variant/20 bg-white focus:border-primary outline-none"
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <div className="relative w-full sm:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[18px]">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar título ou autor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-medium rounded-xl border border-outline-variant/20 focus:border-primary outline-none"
            />
          </div>
        </div>
      </div>

      {/* Posts Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-outline-variant/10 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-primary/60 font-body flex flex-col items-center justify-center gap-2">
            <span className="material-symbols-outlined text-3xl animate-spin">progress_activity</span>
            Carregando matérias...
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="p-16 text-center text-on-surface-variant/60 font-body space-y-3">
            <span className="material-symbols-outlined text-4xl text-primary/30">article</span>
            <p className="text-base font-bold text-primary">Nenhuma matéria encontrada</p>
            <p className="text-xs">Tente ajustar os filtros de busca ou crie uma nova matéria para o blog.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant/10 bg-surface-container-lowest text-[11px] font-bold uppercase tracking-wider text-primary/70">
                  <th className="py-3.5 px-4">Matéria</th>
                  <th className="py-3.5 px-4">Categoria</th>
                  <th className="py-3.5 px-4">Autor & Data</th>
                  <th className="py-3.5 px-4 text-center">Status</th>
                  <th className="py-3.5 px-4 text-center">Leituras</th>
                  <th className="py-3.5 px-4 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10 text-sm font-body">
                {filteredPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-surface-container-lowest/60 transition-colors">
                    {/* Title & Thumbnail */}
                    <td className="py-4 px-4 min-w-[280px]">
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 bg-surface-container-low border border-outline-variant/10">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={post.capa_url || "https://images.unsplash.com/photo-1595838787766-3d7178a5e3e2?q=80&w=1200&auto=format&fit=crop"}
                            alt={post.titulo}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-primary hover:underline line-clamp-1">
                              {post.titulo}
                            </span>
                            {post.destaque && (
                              <span className="inline-flex items-center gap-0.5 text-[10px] font-extrabold text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-full border border-amber-200 shrink-0">
                                <span className="material-symbols-outlined text-[12px]">star</span>
                                Capa
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-on-surface-variant/70 line-clamp-1 mt-0.5 font-normal">
                            {post.subtitulo || post.slug}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-xs font-bold text-primary/80 bg-primary/5 px-2.5 py-1 rounded-full border border-primary/10">
                        {post.categoria}
                      </span>
                    </td>

                    {/* Author & Date */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <p className="text-xs font-bold text-on-surface">{post.autor}</p>
                      <p className="text-[11px] text-on-surface-variant/60">
                        {new Date(post.published_at || post.created_at).toLocaleDateString("pt-BR")} • {post.tempo_leitura}
                      </p>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(post)}
                        title="Clique para alterar status"
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                          post.status === "publicado"
                            ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                            : "bg-amber-100 text-amber-800 hover:bg-amber-200"
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                        {post.status === "publicado" ? "Publicado" : "Rascunho"}
                      </button>
                    </td>

                    {/* Views */}
                    <td className="py-4 px-4 text-center font-bold text-on-surface-variant whitespace-nowrap text-xs">
                      {post.views || 0}
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleToggleDestaque(post)}
                          title={post.destaque ? "Remover destaque da capa" : "Destacar na capa do blog"}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                            post.destaque
                              ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                              : "text-on-surface-variant/40 hover:bg-surface-container-low hover:text-amber-600"
                          }`}
                        >
                          <span className="material-symbols-outlined text-[18px]">star</span>
                        </button>

                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          title="Ver matéria publicada no site"
                          className="w-8 h-8 rounded-lg text-on-surface-variant/60 hover:text-primary hover:bg-primary/5 flex items-center justify-center transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                        </Link>

                        <Link
                          href={`/admin/blog/editar/${post.id}`}
                          title="Editar matéria"
                          className="w-8 h-8 rounded-lg text-primary hover:bg-primary/10 flex items-center justify-center transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </Link>

                        <button
                          onClick={() => handleDelete(post.id)}
                          disabled={deletingId === post.id}
                          title="Excluir matéria"
                          className="w-8 h-8 rounded-lg text-red-600 hover:bg-red-50 flex items-center justify-center transition-colors disabled:opacity-50 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
