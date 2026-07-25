"use client";

import { useState } from "react";
import Link from "next/link";

export default function HeroPrecisionHUD() {
  const [activeTab, setActiveTab] = useState<"pivo" | "telemetria" | "suporte">("pivo");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
      {/* Left Main Editorial & Action Area */}
      <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
        {/* Interactive Badge Bar */}
        <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
          <span className="inline-flex items-center gap-2 bg-black/70 text-emerald-300 text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full border border-emerald-400/40 backdrop-blur-md shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            Tecnologia KREBS • Pivôs Centrais
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 bg-black/60 text-white/90 text-xs font-bold px-3.5 py-2 rounded-full border border-white/20 backdrop-blur-md">
            <span className="material-symbols-outlined text-[15px] text-emerald-400">location_on</span>
            Bahia • Piauí • Pernambuco
          </span>
        </div>

        {/* Dynamic Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-headline tracking-tight leading-[1.05] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          O Futuro da Irrigação <br />
          <span className="bg-gradient-to-r from-emerald-300 via-lime-200 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            na Palma da Sua Mão.
          </span>
        </h1>

        {/* Subtitle with Feature Bullets */}
        <p className="text-white/95 text-base sm:text-xl font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0 drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)]">
          Maximize a produtividade com a máxima eficiência hídrica. Sistemas de alta durabilidade com automação <strong className="text-emerald-300 font-bold">KUBE By B-hyve</strong> e equipe técnica com resposta rápida na sua região.
        </p>

        {/* Quick Tech Highlights Chips */}
        <div className="pt-1 flex flex-wrap justify-center lg:justify-start gap-3">
          <div className="flex items-center gap-2 bg-black/50 text-white/90 px-3.5 py-1.5 rounded-xl border border-white/15 text-xs font-bold backdrop-blur-md">
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">verified</span>
            Peças Nacionais Pronta Entrega
          </div>
          <div className="flex items-center gap-2 bg-black/50 text-white/90 px-3.5 py-1.5 rounded-xl border border-white/15 text-xs font-bold backdrop-blur-md">
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">cell_tower</span>
            Telemetria via Satélite & 4G
          </div>
          <div className="flex items-center gap-2 bg-black/50 text-white/90 px-3.5 py-1.5 rounded-xl border border-white/15 text-xs font-bold backdrop-blur-md">
            <span className="material-symbols-outlined text-emerald-400 text-[18px]">build_circle</span>
            Assistência Técnica no Campo
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
          <Link
            href="/catalogo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-400 via-lime-400 to-emerald-300 hover:from-emerald-300 hover:to-lime-300 text-emerald-950 font-black text-sm uppercase tracking-wider px-8 py-4 rounded-2xl shadow-2xl hover:shadow-emerald-400/20 transition-all active:scale-95 group"
          >
            Ver Pivôs & Peças
            <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>

          <a
            href="#chamado"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-black/60 hover:bg-black/80 text-white font-bold text-sm px-7 py-4 rounded-2xl border border-white/30 backdrop-blur-md shadow-lg transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[20px] text-red-400 animate-pulse">
              handshake
            </span>
            Solicitar Suporte Técnico
          </a>
        </div>
      </div>

      {/* Right Side: Futuristic Agricultural Telemetry HUD Panel */}
      <div className="lg:col-span-5 relative">
        <div className="bg-emerald-950/80 backdrop-blur-2xl p-6 sm:p-7 rounded-3xl border border-emerald-400/30 shadow-2xl shadow-emerald-950/80 space-y-6 text-white relative overflow-hidden">
          {/* Subtle Blueprint Grid Effect inside HUD */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#87f8860a_1px,transparent_1px),linear-gradient(to_bottom,#87f8860a_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none"></div>

          {/* HUD Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></div>
              <div>
                <h3 className="text-xs font-black font-headline uppercase tracking-widest text-emerald-300">
                  Painel de Inteligência Agrícola
                </h3>
                <p className="text-[11px] text-white/70 font-semibold">Monitoramento Kube By B-hyve</p>
              </div>
            </div>
            <span className="bg-emerald-400/20 text-emerald-300 text-[10px] font-black uppercase px-2.5 py-1 rounded-full border border-emerald-400/30">
              Ao Vivo
            </span>
          </div>

          {/* Interactive HUD Navigation Tabs */}
          <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-black/50 border border-white/10 relative z-10 text-xs font-bold">
            <button
              onClick={() => setActiveTab("pivo")}
              className={`py-2 rounded-xl transition-all ${
                activeTab === "pivo"
                  ? "bg-emerald-400 text-emerald-950 font-black shadow-md"
                  : "text-white/70 hover:text-white"
              }`}
            >
              🌾 Pivô KREBS
            </button>
            <button
              onClick={() => setActiveTab("telemetria")}
              className={`py-2 rounded-xl transition-all ${
                activeTab === "telemetria"
                  ? "bg-emerald-400 text-emerald-950 font-black shadow-md"
                  : "text-white/70 hover:text-white"
              }`}
            >
              📊 Telemetria
            </button>
            <button
              onClick={() => setActiveTab("suporte")}
              className={`py-2 rounded-xl transition-all ${
                activeTab === "suporte"
                  ? "bg-emerald-400 text-emerald-950 font-black shadow-md"
                  : "text-white/70 hover:text-white"
              }`}
            >
              🛠️ Suporte 24h
            </button>
          </div>

          {/* Dynamic Tab Content Display */}
          <div className="space-y-4 relative z-10">
            {activeTab === "pivo" && (
              <div className="space-y-3 animate-fade-in">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/15 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-400 text-[18px]">precision_manufacturing</span>
                      Pivô Central de Irrigação
                    </span>
                    <span className="text-emerald-400 font-black text-[11px]">Resistência Máxima</span>
                  </div>
                  <p className="text-xs text-white/80 font-body leading-relaxed">
                    Estrutura de aço galvanizado a fogo reforçado, projetado para durar mais de 25 anos sob o sol e solo do Nordeste.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/15 space-y-1">
                    <span className="text-[10px] text-emerald-300 font-bold uppercase">Eficiência Hídrica</span>
                    <p className="text-sm font-black text-white">Até +35% de Economia</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-black/40 border border-white/15 space-y-1">
                    <span className="text-[10px] text-emerald-300 font-bold uppercase">Manutenção</span>
                    <p className="text-sm font-black text-white">Peças 100% Nacionais</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "telemetria" && (
              <div className="space-y-3 animate-fade-in">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/15 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-emerald-400 text-[18px]">speed</span>
                      Pressão & Vazão no Campo
                    </span>
                    <span className="text-emerald-300 font-bold text-xs">4.2 bar • 185 m³/h</span>
                  </div>
                  {/* Visual Progress Meter */}
                  <div className="w-full bg-black/60 rounded-full h-2 overflow-hidden border border-white/10">
                    <div className="bg-gradient-to-r from-emerald-400 to-lime-300 h-full w-[88%] rounded-full animate-pulse"></div>
                  </div>
                  <div className="flex justify-between text-[10px] text-white/60 font-semibold">
                    <span>Lâmina Aplicada: 12mm</span>
                    <span>Status: Ótimo (88%)</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-emerald-900/50 border border-emerald-400/30 flex items-center justify-between text-xs">
                  <span className="text-white/90 font-medium">Controle de Irrigação via Celular</span>
                  <span className="text-emerald-300 font-black">App iOS / Android</span>
                </div>
              </div>
            )}

            {activeTab === "suporte" && (
              <div className="space-y-3 animate-fade-in">
                <div className="p-4 rounded-2xl bg-black/40 border border-white/15 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                    <span className="material-symbols-outlined text-red-400 text-[18px]">support_agent</span>
                    Equipe Móvel de Plantão
                  </div>
                  <p className="text-xs text-white/80 font-body leading-relaxed">
                    Técnicos especializados e frota própria pronta para atender chamados emergenciais em fazendas na Bahia, Piauí e Pernambuco.
                  </p>
                </div>

                <a
                  href="#chamado"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all"
                >
                  Abrir Chamado Técnico Agora
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </a>
              </div>
            )}
          </div>

          {/* Footer of HUD */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-white/70 relative z-10">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Revenda Exclusiva KREBS
            </span>
            <span className="font-bold text-emerald-300">Círculo Verde Agrotec</span>
          </div>
        </div>
      </div>
    </div>
  );
}
