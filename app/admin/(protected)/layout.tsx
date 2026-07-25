import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let authenticated = false;

  // 1. Try Supabase Auth
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) authenticated = true;
  } catch (e) {
    // Supabase variables not set
  }

  // 2. Try Fallback Cookie Auth
  if (!authenticated) {
    const cookieStore = await cookies();
    const session = cookieStore.get("cv_admin_session");
    if (session) authenticated = true;
  }

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f8faf7] text-on-surface font-body flex">
      <AdminSidebar />
      <div className="flex-1 ml-72 flex flex-col min-w-0">
        {/* Top Header Navigation Bar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-outline-variant/10 px-8 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-primary/70 uppercase tracking-widest font-headline">
              Painel Administrativo
            </span>
            <span className="text-on-surface-variant/30">/</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/50">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Sistema Operacional
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-on-surface-variant/70">
            <div className="hidden sm:flex items-center gap-1.5 bg-surface-container-low px-3 py-1.5 rounded-xl border border-outline-variant/10">
              <span className="material-symbols-outlined text-[16px] text-primary">calendar_today</span>
              <span>{new Date().toLocaleDateString("pt-BR", { weekday: "short", day: "numeric", month: "long" })}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 lg:p-10 max-w-7xl w-full mx-auto">{children}</main>
      </div>
    </div>
  );
}
