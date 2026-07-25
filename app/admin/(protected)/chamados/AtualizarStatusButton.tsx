"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { StatusChamado } from "@/lib/types";

interface Props {
  chamadoId: string;
  statusAtual: StatusChamado;
}

const statusOptions: StatusChamado[] = ["novo", "em_andamento", "concluido"];

export default function AtualizarStatusButton({ chamadoId, statusAtual }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleChange(novoStatus: StatusChamado) {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/chamados", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: chamadoId, status: novoStatus }),
      });
      if (!res.ok) {
        alert("Erro ao atualizar status do chamado.");
      }
    } catch {
      alert("Erro de conexão ao atualizar status.");
    } finally {
      setLoading(false);
      router.refresh();
    }
  }

  return (
    <select
      value={statusAtual}
      onChange={(e) => handleChange(e.target.value as StatusChamado)}
      disabled={loading}
      className="bg-white text-primary text-xs rounded-xl px-3 py-2 border border-outline-variant/30 focus:border-primary focus:ring-0 cursor-pointer shadow-sm font-bold"
    >
      {statusOptions.map((s) => (
        <option key={s} value={s}>
          {s.replace("_", " ")}
        </option>
      ))}
    </select>
  );
}
