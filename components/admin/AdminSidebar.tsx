"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/chamados", label: "Chamados", icon: "support_agent" },
  { href: "/admin/catalogo", label: "Catálogo", icon: "inventory_2" },
  { href: "/admin/blog", label: "Notícias / Matérias", icon: "article" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "mail" },
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
    <aside className="fixed top-0 left-0 h-full w-64 bg-white border-r border-outline-variant/10 flex flex-col p-6 shadow-sm">
      <div className="mb-10">
        <span className="text-xl font-black text-primary tracking-tighter font-headline">Círculo Verde</span>
        <p className="text-on-surface-variant/60 text-xs mt-0.5 font-bold">Admin</p>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
              pathname === item.href
                ? "bg-primary text-white shadow-sm"
                : "text-primary/70 hover:bg-primary/5 hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-primary/70 hover:bg-red-50 hover:text-red-750 transition-colors cursor-pointer"
      >
        <span className="material-symbols-outlined text-[20px]">logout</span>
        Sair
      </button>
    </aside>
  );
}
