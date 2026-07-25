"use client";

import { useState } from "react";
import { Catalogo, Produto, Categoria } from "@/lib/types";
import CatalogoProdutoModal from "./CatalogoProdutoModal";

interface Props {
  catalogo: Catalogo;
  categoriaInicial?: string;
}

export default function CatalogoGrid({ catalogo, categoriaInicial }: Props) {
  const [categoriaAtiva, setCategoriaAtiva] = useState(
    categoriaInicial || "todos"
  );
  const [busca, setBusca] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  const todasCategorias: Categoria[] = catalogo.categorias;

  const produtosFiltrados = todasCategorias
    .filter((c) => categoriaAtiva === "todos" || c.id === categoriaAtiva)
    .flatMap((c) =>
      c.produtos.map((p) => ({ ...p, categoriaNome: c.nome }))
    )
    .filter(
      (p) =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.sku.toLowerCase().includes(busca.toLowerCase())
    );

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl p-6 border border-outline-variant/10 shadow-sm sticky top-28">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
              Categorias
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setCategoriaAtiva("todos")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    categoriaAtiva === "todos"
                      ? "bg-primary text-on-primary"
                      : "text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  Todas as peças
                </button>
              </li>
              {todasCategorias.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setCategoriaAtiva(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 ${
                      categoriaAtiva === cat.id
                        ? "bg-primary text-on-primary"
                        : "text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {cat.icone}
                    </span>
                    {cat.nome}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Search */}
          <div className="relative mb-8">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome ou SKU..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-outline-variant/20 focus:border-primary focus:ring-0 text-sm"
            />
          </div>

          {/* Count */}
          <p className="text-sm text-on-surface-variant mb-6">
            <span className="font-bold text-primary">{produtosFiltrados.length}</span> peça(s) encontrada(s)
          </p>

          {/* Grid */}
          {produtosFiltrados.length === 0 ? (
            <div className="text-center py-24 text-on-surface-variant">
              <span className="material-symbols-outlined text-6xl mb-4 block">inventory_2</span>
              <p className="font-medium">Nenhuma peça encontrada.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {produtosFiltrados.map((produto) => (
                <button
                  key={produto.sku}
                  onClick={() => setProdutoSelecionado(produto)}
                  className="group text-left bg-white rounded-3xl border border-outline-variant/10 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 bg-surface-container-low flex items-center justify-center overflow-hidden">
                    {produto.imagem ? (
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-primary/20 text-8xl">
                        inventory_2
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/10 px-2 py-0.5 rounded-full">
                        {produto.badge}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">
                        {produto.sku}
                      </span>
                    </div>
                    <h3 className="font-bold text-primary mb-2">{produto.nome}</h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mb-4">
                      {produto.descricao}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-secondary">
                        {produto.disponibilidade}
                      </span>
                      <span className="text-xs text-primary font-bold flex items-center gap-1">
                        Ver detalhes
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {produtoSelecionado && (
        <CatalogoProdutoModal
          produto={produtoSelecionado}
          onClose={() => setProdutoSelecionado(null)}
        />
      )}
    </>
  );
}
