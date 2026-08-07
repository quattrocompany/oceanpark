"use client";

import { useState } from "react";
import Image from "next/image";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Preencha o usuário e a senha.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          username: username.trim(), 
          password: password.trim() 
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        window.location.replace("/admin/kit");
      } else {
        setError(data.message || "Usuário ou senha inválidos.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Erro de conexão. Verifique o servidor.");
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        <div className="w-full relative z-10 pt-16 sm:pt-20 bg-[#1E293B] pb-8 flex items-center justify-center shadow-md">
          <div className="relative w-64 sm:w-80 md:w-96 h-24 sm:h-32">
            <Image
              src="/img/logo2.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        <div className="flex items-center justify-center p-6 py-16">
          <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
            <h1 className="text-2xl font-bold text-[#1E293B] text-center mb-2">Painel Ocean Park</h1>
            <p className="text-gray-500 text-center mb-8 text-sm">Acesso restrito para gestão do Kit Corretor</p>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Usuário</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0c82a0] focus:ring-1 focus:ring-[#0c82a0] text-gray-800"
                  placeholder="Digite seu usuário"
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-[#0c82a0] focus:ring-1 focus:ring-[#0c82a0] text-gray-800"
                  placeholder="Digite sua senha"
                />
              </div>

              {error && <p className="text-red-500 text-sm font-medium text-center">{error}</p>}

              <button
                type="button"
                onClick={handleLogin}
                disabled={loading}
                className="w-full bg-[#0c82a0] text-white font-bold py-3 rounded-lg hover:bg-[#096a82] transition-colors disabled:opacity-50 mt-4 cursor-pointer"
              >
                {loading ? "Autenticando..." : "Entrar no Painel"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#1E293B] text-white mt-16 md:mt-24">
        <div className="w-full bg-[#0c82a0] py-8 px-6 text-center text-white">
          <p className="text-xs sm:text-sm font-medium tracking-wide text-white/95">
            © 2026 Ocean Park | Termos de Uso e Política de Privacidade
          </p>
        </div>
      </div>
    </main>
  );
}