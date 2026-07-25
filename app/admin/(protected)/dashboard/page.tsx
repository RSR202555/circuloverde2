import { getChamados } from "@/lib/db";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  let totalChamados = 0;
  let novosChamados = 0;
  let totalEmails = 0;
  let ultimosChamados: any[] = [];
  let topProdutos: any[] = [];

  try {
    const chamados = await getChamados();
    totalChamados = chamados.length;
    novosChamados = chamados.filter((c: any) => c.status === "novo").length;
    ultimosChamados = chamados.slice(0, 5);
  } catch (e) {
    console.error("Erro ao obter chamados para o dashboard:", e);
  }

  try {
    const hasSupabase = 
      process.env.NEXT_PUBLIC_SUPABASE_URL && 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (hasSupabase && !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("xxxx")) {
      const supabase = await createClient();
      const [resEmails, resViews] = await Promise.all([
        supabase.from("newsletter").select("*", { count: "exact", head: true }),
        supabase.from("produto_views").select("*").order("views", { ascending: false }).limit(5)
      ]);
      totalEmails = resEmails.count ?? 0;
      topProdutos = resViews.data ?? [];
    }
  } catch (e) {
    console.error("Erro ao obter newsletter/views para o dashboard:", e);
  }

  const stats = [
    { label: "Total de Chamados", value: totalChamados, icon: "support_agent", color: "bg-emerald-600" },
    { label: "Chamados Novos", value: novosChamados, icon: "notifications_active", color: "bg-amber-600" },
    { label: "Emails Newsletter", value: totalEmails, icon: "mail", color: "bg-blue-600" },
  ];

  return (
    <div className="font-body">
      <h1 className="text-3xl font-black text-primary font-headline mb-2">Dashboard</h1>
      <p className="text-on-surface-variant mb-8 font-medium">Visão geral da plataforma</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-6 border border-outline-variant/10 shadow-sm">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <span className="material-symbols-outlined text-white">{stat.icon}</span>
            </div>
            <div className="text-3xl font-black text-primary mb-1">{stat.value}</div>
            <div className="text-on-surface-variant text-xs font-bold uppercase tracking-wider">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimos chamados */}
        <div className="bg-white rounded-2xl border border-outline-variant/10 p-6 shadow-sm">
          <h2 className="text-primary font-black font-headline mb-6">Últimos Chamados</h2>
          {ultimosChamados && ultimosChamados.length > 0 ? (
            <div className="space-y-3">
              {ultimosChamados.map((chamado: any) => (
                <div key={chamado.id} className="flex items-center justify-between py-3 border-b border-outline-variant/10 last:border-0">
                  <div>
                    <p className="text-primary text-sm font-bold">{chamado.nome_produtor}</p>
                    <p className="text-on-surface-variant text-xs mt-0.5">{chamado.localidade}</p>
                  </div>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-black uppercase ${
                    chamado.status === "novo" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                    chamado.status === "em_andamento" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                    "bg-emerald-50 text-secondary border border-emerald-200"
                  }`}>
                    {chamado.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-on-surface-variant text-sm py-4">Nenhum chamado ainda.</p>
          )}
        </div>

        {/* Produtos mais vistos */}
        <div className="bg-white rounded-2xl border border-outline-variant/10 p-6 shadow-sm">
          <h2 className="text-primary font-black font-headline mb-6">Produtos Mais Vistos</h2>
          {topProdutos && topProdutos.length > 0 ? (
            <div className="space-y-3">
              {topProdutos.map((p: any) => (
                <div key={p.produto_sku} className="flex items-center justify-between py-3 border-b border-outline-variant/10 last:border-0">
                  <span className="text-primary text-sm font-bold">{p.produto_sku}</span>
                  <span className="text-secondary text-sm font-black">{p.views} visualizações</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-on-surface-variant text-sm py-4">Nenhuma visualização ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
