"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(data.error || "Email ou senha incorretos.");
      }
    } catch {
      setLoading(false);
      setError("Erro de conexão. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-3xl p-10 w-full max-w-md border border-gray-800">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black text-white tracking-tighter">Círculo Verde</h1>
          <p className="text-gray-400 text-sm mt-1">Painel Administrativo</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-gray-800 border-none rounded-xl py-4 px-4 text-white text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full bg-gray-800 border-none rounded-xl py-4 px-4 text-white text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
            required
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-500 transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <span className="inline-block text-[11px] text-gray-400 bg-gray-800 px-3 py-1.5 rounded-full font-semibold">
            💡 Local: use <b>admin@circuloverde.com</b> / <b>admin123</b>
          </span>
        </div>
      </div>
    </div>
  );
}
