import { getChamados } from "@/lib/db";
import { Chamado } from "@/lib/types";
import AtualizarStatusButton from "./AtualizarStatusButton";

function getWhatsAppLink(chamado: Chamado) {
  let cleaned = (chamado as any).telefone ? (chamado as any).telefone.replace(/\D/g, "") : "";
  if (cleaned.length === 10 || cleaned.length === 11) {
    cleaned = "55" + cleaned;
  }
  const typeStr = chamado.tipo === "emergencial" ? "EMERGENCIAL 🔥" : "Preventivo 🛠️";
  const dateStr = new Date(chamado.created_at).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short"
  });
  const descStr = chamado.descricao ? chamado.descricao.trim() : "Não detalhada";
  const text = `Olá! Sou da Círculo Verde. Recebemos sua solicitação de Chamado Técnico ${typeStr}.\n\n*Detalhes do Chamado:*\n- *Produtor:* ${chamado.nome_produtor}\n- *Localidade/Fazenda:* ${chamado.localidade}\n- *Contato:* ${(chamado as any).telefone || "Não informado"}\n- *Data/Hora:* ${dateStr}\n- *Descrição:* "${descStr}"\n\nComo podemos ajudar?`;
  return `https://api.whatsapp.com/send?phone=${cleaned}&text=${encodeURIComponent(text)}`;
}

export default async function ChamadosPage() {
  const chamados = await getChamados();

  const statusColor: Record<string, string> = {
    novo: "bg-amber-600/20 text-amber-400",
    em_andamento: "bg-blue-600/20 text-blue-400",
    concluido: "bg-emerald-600/20 text-emerald-400",
  };

  return (
    <div className="font-body">
      <h1 className="text-3xl font-black text-primary font-headline mb-2">Chamados Técnicos</h1>
      <p className="text-on-surface-variant mb-8 font-medium">{chamados?.length ?? 0} chamado(s) no total</p>

      <div className="bg-white rounded-3xl border border-outline-variant/10 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-outline-variant/10 bg-surface-container-low/30 text-xs font-bold text-primary uppercase tracking-widest">
              <th className="text-left px-6 py-4 font-bold">Produtor</th>
              <th className="text-left px-6 py-4 font-bold">Localidade</th>
              <th className="text-left px-6 py-4 font-bold">Tipo</th>
              <th className="text-left px-6 py-4 font-bold">Telefone</th>
              <th className="text-left px-6 py-4 font-bold">Data</th>
              <th className="text-left px-6 py-4 font-bold">Status</th>
              <th className="text-center px-6 py-4 font-bold">Atender</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant/10">
            {chamados && chamados.length > 0 ? (
              chamados.map((chamado: Chamado) => (
                <tr key={chamado.id} className="hover:bg-surface-container-low/20 transition-all text-primary font-medium">
                  <td className="px-6 py-4">
                    <p className="text-primary font-bold">{chamado.nome_produtor}</p>
                    {chamado.descricao && (
                      <p className="text-on-surface-variant/80 text-xs mt-0.5 line-clamp-1">{chamado.descricao}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant">{chamado.localidade}</td>
                  <td className="px-6 py-4">
                    {chamado.tipo === "emergencial" ? (
                      <span className="text-[10px] px-2.5 py-1 rounded-full font-black uppercase bg-red-50 text-red-700 border border-red-200 animate-pulse">
                        🔥 Emergencial
                      </span>
                    ) : (
                      <span className="text-[10px] px-2.5 py-1 rounded-full font-black uppercase bg-blue-50 text-blue-700 border border-blue-200">
                        🛠️ Preventiva
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-primary">
                    {(chamado as any).telefone || "—"}
                  </td>
                  <td className="px-6 py-4 text-on-surface-variant text-xs">
                    {new Date(chamado.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4">
                    <AtualizarStatusButton
                      chamadoId={chamado.id}
                      statusAtual={chamado.status}
                    />
                  </td>
                  <td className="px-6 py-4 text-center">
                    <a
                      href={getWhatsAppLink(chamado)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-secondary hover:bg-primary text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[16px] font-black">chat</span>
                      WhatsApp
                    </a>
                  </td>
                </tr>
              ))
            ) : (
               <tr>
                <td colSpan={7} className="text-center py-12 text-on-surface-variant">
                  Nenhum chamado recebido ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
