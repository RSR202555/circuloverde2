"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (res.ok) {
      setDone(true);
    } else {
      const data = await res.json();
      setError(data.error || "Erro ao cadastrar.");
    }
  }

  if (done) {
    return (
      <p className="text-emerald-400 text-sm font-bold">
        ✓ Cadastrado com sucesso!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/5 border-none rounded-xl text-xs w-full focus:ring-1 focus:ring-emerald-400 py-3 px-4 text-emerald-50 placeholder:text-emerald-200/40"
          placeholder="Seu e-mail corporativo"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-400 text-emerald-950 px-4 rounded-xl hover:bg-emerald-300 transition-colors flex items-center justify-center disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-sm">send</span>
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </form>
  );
}
