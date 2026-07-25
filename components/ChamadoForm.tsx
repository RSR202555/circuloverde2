"use client";

import { useState } from "react";

type TipoChamado = "preventiva" | "emergencial";

export default function ChamadoForm() {
  const [tipo, setTipo] = useState<TipoChamado>("preventiva");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      nome_produtor: formData.get("nome_produtor") as string,
      localidade: formData.get("localidade") as string,
      telefone: formData.get("telefone") as string,
      tipo,
      descricao: formData.get("descricao") as string,
    };

    const res = await fetch("/api/chamados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      const data = await res.json();
      setError(data.error || "Erro ao enviar. Tente novamente.");
    }
  }

  if (success) {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,34,3,0.12)] border border-outline-variant/5 flex flex-col items-center justify-center gap-6 min-h-[400px]">
        <span
          className="material-symbols-outlined text-secondary text-6xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          check_circle
        </span>
        <h3 className="text-2xl font-headline font-bold text-primary">
          Solicitação Enviada!
        </h3>
        <p className="text-on-surface-variant text-center">
          Nossa equipe entrará em contato em até{" "}
          <span className="text-secondary font-bold">15 minutos</span>.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-primary font-bold text-sm underline"
        >
          Enviar outro chamado
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-12 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,34,3,0.12)] border border-outline-variant/5">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-headline font-bold text-primary">
          Chamado Técnico
        </h2>
        <div className="flex gap-2">
          <div className="w-8 h-1.5 rounded-full bg-primary"></div>
          <div className="w-8 h-1.5 rounded-full bg-surface-container-highest"></div>
          <div className="w-8 h-1.5 rounded-full bg-surface-container-highest"></div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="floating-label-group">
            <input
              name="nome_produtor"
              className="w-full bg-transparent border-b-2 border-surface-container-highest focus:border-primary focus:ring-0 text-sm py-3 px-1 transition-colors outline-none"
              id="name"
              placeholder=" "
              type="text"
              required
            />
            <label
              className="text-sm font-medium text-on-surface-variant"
              htmlFor="name"
            >
              Nome do Produtor
            </label>
          </div>
          <div className="floating-label-group">
            <input
              name="localidade"
              className="w-full bg-transparent border-b-2 border-surface-container-highest focus:border-primary focus:ring-0 text-sm py-3 px-1 transition-colors outline-none"
              id="farm"
              placeholder=" "
              type="text"
              required
            />
            <label
              className="text-sm font-medium text-on-surface-variant"
              htmlFor="farm"
            >
              Localidade / Fazenda
            </label>
          </div>
          <div className="floating-label-group">
            <input
              name="telefone"
              className="w-full bg-transparent border-b-2 border-surface-container-highest focus:border-primary focus:ring-0 text-sm py-3 px-1 transition-colors outline-none"
              id="phone"
              placeholder=" "
              type="tel"
              required
            />
            <label
              className="text-sm font-medium text-on-surface-variant"
              htmlFor="phone"
            >
              WhatsApp / Telefone
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary uppercase tracking-widest ml-1">
            Tipo de Chamado
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTipo("preventiva")}
              className={`border-2 text-xs font-bold py-3 rounded-xl transition-colors ${
                tipo === "preventiva"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-surface-container-highest text-on-surface-variant hover:border-primary/50"
              }`}
            >
              Preventiva
            </button>
            <button
              type="button"
              onClick={() => setTipo("emergencial")}
              className={`border-2 text-xs font-bold py-3 rounded-xl transition-colors ${
                tipo === "emergencial"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-surface-container-highest text-on-surface-variant hover:border-primary/50"
              }`}
            >
              Emergencial
            </button>
          </div>
        </div>
        <div className="floating-label-group">
          <textarea
            name="descricao"
            className="w-full bg-transparent border-b-2 border-surface-container-highest focus:border-primary focus:ring-0 text-sm py-3 px-1 transition-colors resize-none outline-none"
            id="message"
            placeholder=" "
            rows={3}
          />
          <label
            className="text-sm font-medium text-on-surface-variant"
            htmlFor="message"
          >
            Descrição da Ocorrência
          </label>
        </div>
        {error && <p className="text-error text-sm text-center">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-on-primary py-5 rounded-2xl font-bold text-base hover:shadow-2xl transition-all active:scale-[0.98] pulse-primary flex items-center justify-center gap-3 disabled:opacity-60"
        >
          <span className="material-symbols-outlined">bolt</span>
          {loading ? "Enviando..." : "Enviar Solicitação Urgente"}
        </button>
        <p className="text-center text-[10px] text-on-surface-variant font-medium">
          Tempo médio de resposta:{" "}
          <span className="text-secondary">15 minutos</span>
        </p>
      </form>
    </div>
  );
}
