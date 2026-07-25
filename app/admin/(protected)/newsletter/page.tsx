import { createClient } from "@/lib/supabase/server";
import { NewsletterEmail } from "@/lib/types";

export default async function NewsletterPage() {
  const supabase = await createClient();
  const { data: emails } = await supabase
    .from("newsletter")
    .select("*")
    .order("created_at", { ascending: false });

  const csvContent = emails
    ? ["email,data_cadastro", ...emails.map((e: NewsletterEmail) => `${e.email},${e.created_at}`)].join("\n")
    : "";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Newsletter</h1>
          <p className="text-gray-400">{emails?.length ?? 0} email(s) cadastrado(s)</p>
        </div>
        <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`}
          download="newsletter.csv"
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-emerald-500 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Exportar CSV
        </a>
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Email</th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Data de Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {emails && emails.length > 0 ? (
              emails.map((email: NewsletterEmail) => (
                <tr key={email.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50">
                  <td className="px-6 py-4 text-white">{email.email}</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(email.created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-12 text-gray-500">
                  Nenhum email cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
