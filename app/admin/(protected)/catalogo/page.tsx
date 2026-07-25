"use client";

import { useEffect, useState } from "react";
import { Categoria } from "@/lib/types";

export default function AdminCatalogoPage() {
  const [produtos, setProdutos] = useState<any[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search & Filter
  const [prodSearch, setProdSearch] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("todos");

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingSku, setEditingSku] = useState("");
  const [formData, setFormData] = useState({
    sku: "",
    nome: "",
    categoria_id: "pecas",
    badge: "KREBS Original",
    disponibilidade: "Consulte Estoque",
    imagem: "",
    descricao: "",
    especificacoes: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    setError("");
    try {
      // Fetch Products
      const resProdutos = await fetch("/api/admin/produtos");
      if (resProdutos.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const dataProdutos = await resProdutos.json();
      setProdutos(dataProdutos);

      // Fetch Categories
      const resCat = await fetch("/api/admin/categorias");
      if (resCat.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const dataCat = await resCat.json();
      setCategorias(dataCat || []);
      
      if (dataCat && dataCat.length > 0) {
        setFormData(prev => ({ ...prev, categoria_id: dataCat[0].id }));
      }
    } catch (err: any) {
      setError("Erro ao carregar dados do catálogo.");
    } finally {
      setLoading(false);
    }
  }

  // Delete Product
  async function handleDeleteProduct(sku: string) {
    if (!confirm(`Tem certeza de que deseja excluir a peça com SKU ${sku}?`)) return;

    try {
      const res = await fetch(`/api/admin/produtos?sku=${sku}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setProdutos(prev => prev.filter(p => p.sku !== sku));
      } else {
        alert("Erro ao excluir peça");
      }
    } catch {
      alert("Erro ao excluir peça");
    }
  }

  // Open Add Modal
  function openAddModal() {
    setModalMode("add");
    setFormData({
      sku: "",
      nome: "",
      categoria_id: categorias[0]?.id || "pecas",
      badge: "KREBS Original",
      disponibilidade: "Consulte Estoque",
      imagem: "",
      descricao: "",
      especificacoes: "Peça Genuína\nGarantia de Qualidade"
    });
    setIsModalOpen(true);
  }

  // Open Edit Modal
  function openEditModal(produto: any) {
    setModalMode("edit");
    setEditingSku(produto.sku);
    setFormData({
      sku: produto.sku,
      nome: produto.nome,
      categoria_id: produto.categoria_id || "pecas",
      badge: produto.badge || "",
      disponibilidade: produto.disponibilidade || "",
      imagem: produto.imagem || "",
      descricao: produto.descricao || "",
      especificacoes: Array.isArray(produto.especificacoes)
        ? produto.especificacoes.join("\n")
        : produto.especificacoes || ""
    });
    setIsModalOpen(true);
  }

  // Submit Product Form
  async function handleSubmitProduct(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.sku || !formData.nome || !formData.categoria_id) {
      alert("Campos SKU, Nome e Categoria são obrigatórios.");
      return;
    }

    const payload = {
      ...formData,
      especificacoes: formData.especificacoes
        ? formData.especificacoes.split("\n").map(s => s.trim()).filter(Boolean)
        : []
    };

    try {
      const url = "/api/admin/produtos";
      const method = modalMode === "add" ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setIsModalOpen(false);
        fetchData(); // reload
      } else {
        const data = await res.json();
        alert(data.error || "Erro ao salvar peça.");
      }
    } catch {
      alert("Erro de conexão.");
    }
  }

  // Filter products by search and category
  const filteredProducts = produtos.filter(p => {
    const matchesSearch =
      p.sku.toLowerCase().includes(prodSearch.toLowerCase()) ||
      p.nome.toLowerCase().includes(prodSearch.toLowerCase());
    const matchesCat =
      selectedCategoryFilter === "todos" || p.categoria_id === selectedCategoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="font-body text-primary">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-primary font-headline mb-2">Catálogo de Produtos</h1>
          <p className="text-on-surface-variant font-medium">{produtos.length} produto(s) no total</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center justify-center gap-2 bg-primary hover:bg-secondary text-white font-bold text-sm px-6 py-3 rounded-xl transition-all active:scale-95 shadow-md cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">add_circle</span>
          Adicionar Peça
        </button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl text-sm mb-6 text-center">
          {error}
        </div>
      )}

      {/* Search and Filters Bar */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white p-5 rounded-2xl border border-outline-variant/10 mb-8 shadow-sm">
        <input
          type="text"
          placeholder="Buscar por SKU ou nome..."
          value={prodSearch}
          onChange={(e) => setProdSearch(e.target.value)}
          className="bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-sm text-primary placeholder-on-surface-variant/60 focus:ring-1 focus:ring-primary outline-none md:w-80 shadow-sm"
        />
        
        <select
          value={selectedCategoryFilter}
          onChange={(e) => setSelectedCategoryFilter(e.target.value)}
          className="bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-sm text-primary focus:ring-1 focus:ring-primary outline-none cursor-pointer shadow-sm"
        >
          <option value="todos">Todas as Categorias</option>
          {categorias.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.nome}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center py-20 text-on-surface-variant">Carregando catálogo dinâmico...</div>
      ) : (
        <div className="bg-white rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden">
          {filteredProducts.length === 0 ? (
            <div className="p-16 text-center text-on-surface-variant">
              Nenhuma peça encontrada para os filtros aplicados.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-outline-variant/10 text-primary font-bold bg-surface-container-low/30">
                    <th className="py-4 px-6">Imagem</th>
                    <th className="py-4 px-6">SKU</th>
                    <th className="py-4 px-6">Nome</th>
                    <th className="py-4 px-6">Categoria</th>
                    <th className="py-4 px-6">Badge</th>
                    <th className="py-4 px-6">Disponibilidade</th>
                    <th className="py-4 px-6 text-center">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {filteredProducts.map(p => (
                    <tr key={p.sku} className="hover:bg-surface-container-low/20 transition-all font-medium">
                      <td className="py-3 px-6">
                        <div className="w-12 h-12 rounded-xl bg-surface-container-low overflow-hidden flex items-center justify-center border border-outline-variant/10">
                          {p.imagem ? (
                            <img src={p.imagem} alt={p.nome} className="w-full h-full object-contain" />
                          ) : (
                            <span className="material-symbols-outlined text-on-surface-variant/40">settings</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-6 font-mono text-xs text-on-surface-variant whitespace-nowrap">{p.sku}</td>
                      <td className="py-3 px-6 font-bold text-primary">{p.nome}</td>
                      <td className="py-3 px-6 text-on-surface-variant whitespace-nowrap">
                        {categorias.find(c => c.id === p.categoria_id)?.nome || p.categoria_id}
                      </td>
                      <td className="py-3 px-6 whitespace-nowrap">
                        <span className="bg-emerald-50 text-secondary border border-emerald-150 px-2.5 py-0.5 rounded-full text-xs font-bold">
                          {p.badge || "—"}
                        </span>
                      </td>
                      <td className="py-3 px-6 text-on-surface-variant whitespace-nowrap">{p.disponibilidade || "—"}</td>
                      <td className="py-3 px-6 text-center whitespace-nowrap">
                        <div className="inline-flex gap-2">
                          <button
                            onClick={() => openEditModal(p)}
                            className="flex items-center gap-1 text-xs font-bold text-secondary bg-secondary/10 hover:bg-secondary/20 px-3 py-1.5 rounded-xl border border-secondary/20 transition-all active:scale-95 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">edit</span>
                            Editar
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.sku)}
                            className="flex items-center gap-1 text-xs font-bold text-red-650 bg-red-50 hover:bg-red-100/50 px-3 py-1.5 rounded-xl border border-red-200 transition-all active:scale-95 cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[14px]">delete</span>
                            Excluir
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
      )}

      {/* INLINE MODAL FOR ADD/EDIT PRODUCT */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-outline-variant/10 overflow-hidden max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-outline-variant/10 bg-surface-container-low/30 flex justify-between items-center">
              <h3 className="text-xl font-bold font-headline text-primary">
                {modalMode === "add" ? "Adicionar Nova Peça" : `Editar Peça: ${editingSku}`}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-black/5 flex items-center justify-center text-primary cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            
            <form onSubmit={handleSubmitProduct} className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-primary">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">SKU (Código único)</label>
                  <input
                    type="text"
                    required
                    disabled={modalMode === "edit"}
                    value={formData.sku}
                    onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                    placeholder="Ex: K-055"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-primary outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Nome da Peça</label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                    placeholder="Ex: Motor do Pivô"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-primary outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Categoria</label>
                  <select
                    value={formData.categoria_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, categoria_id: e.target.value }))}
                    className="w-full bg-white border border-outline-variant/30 rounded-xl px-4 py-2.5 text-primary outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                  >
                    {categorias.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.nome}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Badge Promocional</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData(prev => ({ ...prev, badge: e.target.value }))}
                    placeholder="Ex: KREBS Original"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-primary outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Disponibilidade</label>
                  <input
                    type="text"
                    value={formData.disponibilidade}
                    onChange={(e) => setFormData(prev => ({ ...prev, disponibilidade: e.target.value }))}
                    placeholder="Ex: Consulte Estoque ou Em Estoque"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-primary outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Imagem (Caminho ou URL)</label>
                  <input
                    type="text"
                    value={formData.imagem}
                    onChange={(e) => setFormData(prev => ({ ...prev, imagem: e.target.value }))}
                    placeholder="Ex: /produtos/motor.jpg"
                    className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-primary outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Descrição do Produto</label>
                <textarea
                  rows={3}
                  value={formData.descricao}
                  onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
                  placeholder="Descreva a peça e sua aplicação..."
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-primary outline-none focus:ring-1 focus:ring-primary resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">Especificações Técnicas (Uma por linha)</label>
                <textarea
                  rows={3}
                  value={formData.especificacoes}
                  onChange={(e) => setFormData(prev => ({ ...prev, especificacoes: e.target.value }))}
                  placeholder="Garantia de Qualidade&#10;Especificação 2"
                  className="w-full bg-surface-container-low border border-outline-variant/20 rounded-xl px-4 py-2.5 text-primary outline-none focus:ring-1 focus:ring-primary resize-none font-mono text-xs"
                />
              </div>

              <div className="pt-4 border-t border-outline-variant/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl border border-outline-variant/30 font-bold hover:bg-surface-container-low/30 transition-all cursor-pointer text-primary"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-secondary transition-all active:scale-95 shadow-md cursor-pointer"
                >
                  {modalMode === "add" ? "Criar Peça" : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
