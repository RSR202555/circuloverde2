"use client";

import { useState } from "react";

export default function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  function handleShareWhatsApp() {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Confira esta matéria do Círculo Verde: "${title}"\n`);
    window.open(`https://api.whatsapp.com/send?text=${text}${url}`, "_blank");
  }

  function handleCopyLink() {
    if (typeof window === "undefined") return;
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold text-on-surface-variant/60 mr-1">Compartilhar:</span>
      <button
        onClick={handleShareWhatsApp}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 hover:bg-emerald-100 font-bold text-xs transition-colors border border-emerald-200 cursor-pointer"
        title="Compartilhar no WhatsApp"
      >
        <span className="material-symbols-outlined text-[16px]">share</span>
        WhatsApp
      </button>
      <button
        onClick={handleCopyLink}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high font-bold text-xs transition-colors border border-outline-variant/10 cursor-pointer"
        title="Copiar link"
      >
        <span className="material-symbols-outlined text-[16px]">link</span>
        {copied ? "Link Copiado!" : "Copiar Link"}
      </button>
    </div>
  );
}
