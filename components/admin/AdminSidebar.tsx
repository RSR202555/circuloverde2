"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard", description: "Visão geral e métricas" },
  { href: "/admin/chamados", label: "Chamados", icon: "support_agent", description: "Solicitações de clientes" },
  { href: "/admin/catalogo", label: "Catálogo", icon: "inventory_2", description: "Peças e equipamentos" },
  { href: "/admin/blog", label: "Notícias / Matérias", icon: "article", description: "Gestão do Blog" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "mail", description: "Contatos cadastrados" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    document.cookie = "cv_admin_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    router.push("/admin/login");
  }

  return (
    <aside className="fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-emerald-950 via-[#00380b] to-emerald-950 text-white flex flex-col justify-between p-6 z-40 border-r border-emerald-800/30 shadow-2xl overflow-y-auto font-body">
      {/* Ambient background light glow */}
      <div className="absolute top-0 left-0 w-full h-40 bg-emerald-500/10 blur-3xl pointer-events-none"></div>

      <div>
        {/* Brand Header */}
        <div className="mb-8 pt-2 pb-6 border-b border-emerald-800/40 relative z-10">
          <Link href="/admin/dashboard" className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-2 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/Prancheta 2.png" alt="Círculo Verde Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-xl font-black text-white tracking-tight font-headline block leading-tight">
                Círculo Verde
              </span>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-emerald-300 bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30 mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Painel Admin
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Section */}
        <div className="space-y-1 relative z-10">
          <p className="text-[10px] font-extrabold text-emerald-300/60 uppercase tracking-widest px-3 mb-2">
            Menu Principal
          </p>
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin/dashboard" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-emerald-500/25 to-emerald-400/10 text-white border border-emerald-400/40 shadow-lg backdrop-blur-md"
                      : "text-emerald-100/70 hover:bg-white/5 hover:text-white hover:translate-x-1"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                        isActive
                          ? "bg-emerald-400 text-emerald-950 shadow-md font-extrabold"
                          : "bg-white/5 text-emerald-300 group-hover:bg-white/10 group-hover:text-white"
                      }`}
                    >
                      <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                    </div>
                    <div>
                      <span className="block font-headline text-sm tracking-tight">{item.label}</span>
                      <span className={`block text-[10px] font-normal transition-colors ${isActive ? "text-emerald-200" : "text-emerald-100/40 group-hover:text-emerald-100/70"}`}>
                        {item.description}
                      </span>
                    </div>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-6 rounded-full bg-emerald-400 shadow-xs"></span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Footer User Profile & Actions */}
      <div className="pt-6 border-t border-emerald-800/40 space-y-3 relative z-10">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-emerald-200 transition-all hover:text-white"
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-emerald-400">open_in_new</span>
            <span>Ver Site Público</span>
          </div>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        </Link>

        <div className="flex items-center justify-between p-2 rounded-2xl bg-black/20 border border-white/5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 flex items-center justify-center font-black text-xs font-headline">
              CV
            </div>
            <div>
              <p className="text-xs font-bold text-white font-headline leading-tight">Admin Círculo Verde</p>
              <p className="text-[10px] text-emerald-300/70 truncate max-w-[110px]">admin@circuloverde.com</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sair do Painel"
            className="w-8 h-8 rounded-xl bg-red-500/10 hover:bg-red-500 text-red-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
