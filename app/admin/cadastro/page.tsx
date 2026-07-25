"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminCadastroPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch("/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, secret }),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        setSuccess(data.message || "Cadastro realizado com sucesso!");
        setEmail("");
        setPassword("");
        setSecret("");
        setTimeout(() => {
          router.push("/admin/login");
        }, 3000);
      } else {
        setError(data.error || "Erro ao realizar cadastro.");
      }
    } catch {
      setLoading(false);
      setError("Erro de conexão. Tente novamente.");
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 font-body">
      <div className="bg-gray-900 rounded-3xl p-10 w-full max-w-md border border-gray-800">
        <div className="mb-8 text-center">
          <Link href="/" className="text-2xl font-black text-white tracking-tighter">
            Círculo Verde
          </Link>
          <h2 className="text-xl font-bold text-white mt-4 font-headline">Criar Administrador</h2>
          <p className="text-gray-400 text-sm mt-1">Cadastre um novo usuário administrador</p>
        </div>

        <form onSubmit={handleCadastro} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@circuloverde.com"
              className="w-full bg-gray-800 border-none rounded-xl py-4 px-4 text-white text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
              className="w-full bg-gray-800 border-none rounded-xl py-4 px-4 text-white text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-1.5">Código de Segurança (Secret)</label>
            <input
              type="text"
              value={secret}
              onChange={(e) => setSecret(e.target.value)}
              placeholder="CV-Admin-Secret-9F8A2B7C"
              className="w-full bg-gray-800 border-none rounded-xl py-4 px-4 text-white text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
              required
            />
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {success && <p className="text-emerald-400 text-sm text-center font-semibold">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-500 transition-colors disabled:opacity-60 cursor-pointer mt-2"
          >
            {loading ? "Cadastrando..." : "Cadastrar Administrador"}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-800 text-center">
          <Link href="/admin/login" className="text-xs text-emerald-400 hover:underline">
            Voltar para o Login
          </Link>
        </div>
      </div>
    </div>
  );
}
