"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin/kit");
    } else {
      setError("Usuário ou senha inválidos.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col justify-between pt-20">
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-[#0C82A0] text-center mb-2">Painel da Agência</h1>
          <p className="text-gray-500 text-center mb-8 text-sm">Acesso restrito para gestão do Kit Corretor</p>
          
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Usuário</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0C82A0] focus:ring-1 focus:ring-[#0C82A0]"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0C82A0] focus:ring-1 focus:ring-[#0C82A0]"
                required
              />
            </div>

            {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#DD6810] text-white font-bold py-3 rounded-lg hover:bg-[#c45a0d] transition-colors disabled:opacity-50 mt-4 cursor-pointer"
            >
              {loading ? "Autenticando..." : "Entrar no Painel"}
            </button>
          </form>
        </div>
      </div>

      {/* RODAPÉ ILUSTRATIVO POLVO E PRAIA */}
      <div className="w-full relative leading-none bg-[#0C82A0]">
        <Image
          src="/img/kit/polvopraia.jpg"
          alt="Ilustração Ocean Park Praia Admin"
          width={1920}
          height={300}
          quality={100}
          className="w-full h-auto block object-cover"
        />
      </div>
    </main>
  );
}