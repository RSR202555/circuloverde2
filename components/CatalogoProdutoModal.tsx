"use client";

import { useEffect } from "react";
import { Produto } from "@/lib/types";

interface Props {
  produto: Produto;
  onClose: () => void;
}

export default function CatalogoProdutoModal({ produto, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 bg-surface-container-low flex items-center justify-center rounded-t-3xl overflow-hidden">
          {produto.imagem ? (
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="max-w-[70%] max-h-[70%] object-contain"
            />
          ) : (
            <span className="material-symbols-outlined text-primary/20 text-9xl">
              inventory_2
            </span>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
              {produto.badge}
            </span>
            <span className="text-xs text-on-surface-variant">SKU: {produto.sku}</span>
          </div>
          <h2 className="text-2xl font-headline font-bold text-primary mb-3">
            {produto.nome}
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-8">
            {produto.descricao}
          </p>
          <div className="mb-8">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
              Especificações
            </h3>
            <ul className="space-y-3">
              {produto.especificacoes.map((spec) => (
                <li key={spec} className="flex items-center gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4">
            <a
              href={`https://wa.me/5575983427878?text=${encodeURIComponent(
                `Olá! Gostaria de solicitar uma cotação para o produto: ${produto.nome} (SKU: ${produto.sku})`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-primary text-on-primary py-4 rounded-2xl font-bold hover:opacity-90 transition-all text-center flex items-center justify-center"
            >
              Solicitar Cotação
            </a>
            <button
              onClick={onClose}
              className="px-6 border-2 border-outline-variant rounded-2xl font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
