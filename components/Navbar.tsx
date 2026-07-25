"use client";

import { useState } from "react";
import Link from "next/link";
import { culturas } from "@/data/culturas";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCropsOpen, setIsCropsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-transparent transition-all">
      <div className="flex justify-between items-center px-6 md:px-8 py-5 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-black text-white tracking-tighter font-headline flex items-center gap-2.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/Prancheta 2.png"
            alt="Logo Círculo Verde"
            className="w-8 h-8 md:w-9 md:h-9 object-contain group-hover:scale-105 transition-transform"
          />
          <span>Círculo <span className="text-[#47a934]">Verde</span></span>
        </Link>
        
        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-white hover:text-[#47a934] transition-all duration-300 font-body text-sm font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
          >
            Início
          </Link>
          <Link
            href="/catalogo"
            className="text-white hover:text-[#47a934] transition-all duration-300 font-body text-sm font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
          >
            Peças
          </Link>
          <Link
            href="/eventos"
            className="text-white hover:text-[#47a934] transition-all duration-300 font-body text-sm font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
          >
            Eventos
          </Link>
          
          {/* Culturas Dropdown */}
          <div className="relative group py-2">
            <Link
              href="/culturas"
              className="flex items-center gap-0.5 text-white hover:text-[#47a934] transition-all duration-300 font-body text-sm font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
            >
              Culturas
              <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover:rotate-180 select-none">
                keyboard_arrow_down
              </span>
            </Link>
            {/* Dropdown Menu */}
            <div className="absolute left-1/2 -translate-x-1/2 top-full hidden group-hover:block w-80 bg-emerald-950/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/15 p-4 transition-all duration-300 z-50 text-white">
              <div className="grid grid-cols-2 gap-1.5">
                {culturas.map((cultura) => (
                  <Link
                    key={cultura.id}
                    href={`/culturas/${cultura.id}`}
                    className="flex items-center gap-1.5 text-xs text-white/80 hover:text-[#47a934] hover:bg-white/10 px-2.5 py-2 rounded-xl transition-all font-body font-medium"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#47a934]"></span>
                    {cultura.nome}
                  </Link>
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-white/10 text-center">
                <Link
                  href="/culturas"
                  className="inline-block text-xs font-bold text-[#47a934] hover:text-white transition-colors font-body"
                >
                  Ver Todas as Culturas
                </Link>
              </div>
            </div>
          </div>

          <Link
            href="/blog"
            className="text-white hover:text-[#47a934] transition-all duration-300 font-body text-sm font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
          >
            Notícias
          </Link>
          <Link
            href="/sobre"
            className="text-white hover:text-[#47a934] transition-all duration-300 font-body text-sm font-bold drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
          >
            Sobre Nós
          </Link>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <span className="hidden lg:flex items-center gap-2 text-xs font-bold text-white bg-black/40 px-3.5 py-1.5 rounded-full border border-white/20 backdrop-blur-md shadow-md">
            <span className="material-symbols-outlined text-[14px] text-[#47a934]">verified</span>
            5000+ Produtores Atendidos
          </span>
          <a href="#chamado" className="hidden sm:block bg-[#47a934] text-white px-6 py-2.5 rounded-xl font-body font-black text-xs uppercase tracking-wider hover:bg-[#3b9329] transition-all active:scale-95 shadow-xl">
            Fale Conosco
          </a>

          {/* Mobile Menu Toggler (Hamburger) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all focus:outline-none border border-white/20"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Menu) */}
      {isOpen && (
        <div className="md:hidden border-t border-emerald-900/10 bg-white/95 backdrop-blur-xl">
          <div className="flex flex-col px-6 py-6 space-y-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="text-emerald-900/80 font-bold hover:text-emerald-900 py-2 border-b border-emerald-900/5 transition-colors font-body"
            >
              Início
            </Link>
            <Link
              href="/catalogo"
              onClick={() => setIsOpen(false)}
              className="text-emerald-900/80 font-bold hover:text-emerald-900 py-2 border-b border-emerald-900/5 transition-colors font-body"
            >
              Peças
            </Link>
            <Link
              href="/eventos"
              onClick={() => setIsOpen(false)}
              className="text-emerald-900/80 font-bold hover:text-emerald-900 py-2 border-b border-emerald-900/5 transition-colors font-body"
            >
              Eventos
            </Link>
            
            {/* Mobile Culturas Accordion */}
            <div>
              <button
                onClick={() => setIsCropsOpen(!isCropsOpen)}
                className="w-full flex items-center justify-between text-emerald-900/80 font-bold hover:text-emerald-900 py-2 border-b border-emerald-900/5 transition-colors font-body text-left focus:outline-none"
              >
                <span>Culturas</span>
                <span className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${isCropsOpen ? "rotate-180" : ""}`}>
                  keyboard_arrow_down
                </span>
              </button>
              {isCropsOpen && (
                <div className="pl-4 mt-2 grid grid-cols-2 gap-2 pb-2">
                  {culturas.map((cultura) => (
                    <Link
                      key={cultura.id}
                      href={`/culturas/${cultura.id}`}
                      onClick={() => {
                        setIsOpen(false);
                        setIsCropsOpen(false);
                      }}
                      className="flex items-center gap-1.5 text-sm text-emerald-900/70 hover:text-emerald-900 py-1.5 font-body font-semibold"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80"></span>
                      {cultura.nome}
                    </Link>
                  ))}
                  <Link
                    href="/culturas"
                    onClick={() => {
                      setIsOpen(false);
                      setIsCropsOpen(false);
                    }}
                    className="col-span-2 text-xs font-bold text-secondary hover:text-primary py-1.5 font-body border-t border-emerald-900/5 mt-1 pt-2"
                  >
                    Ver Todas
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className="text-emerald-900/80 font-bold hover:text-emerald-900 py-2 border-b border-emerald-900/5 transition-colors font-body"
            >
              Notícias
            </Link>
            <Link
              href="/sobre"
              onClick={() => setIsOpen(false)}
              className="text-emerald-900/80 font-bold hover:text-emerald-900 py-2 border-b border-emerald-900/5 transition-colors font-body"
            >
              Sobre Nós
            </Link>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-full text-center bg-primary text-on-primary py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all active:scale-95 shadow-md mt-4"
            >
              Fale Conosco
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
