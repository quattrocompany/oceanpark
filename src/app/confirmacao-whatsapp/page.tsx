"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function ConteudoWhatsapp() {
  const searchParams = useSearchParams();
  const [contador, setContador] = useState(4);
  const waUrl = searchParams.get("waUrl");

  useEffect(() => {
    if (!waUrl) return;

    const timer = setInterval(() => {
      setContador((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = decodeURIComponent(waUrl);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [waUrl]);

  return (
    <div className="bg-white p-10 md:p-16 rounded-3xl shadow-xl max-w-lg w-full text-center">
      <div className="w-20 h-20 bg-[#25D366]/10 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.931.547 3.743 1.516 5.334L2 22l4.781-1.469a10.02 10.02 0 005.25 1.485c5.535 0 10.031-4.496 10.031-10.031S17.566 2 12.031 2zm0 18.375c-1.634 0-3.188-.415-4.571-1.2l-.328-.188-3.398 1.047 1.062-3.328-.219-.344a8.381 8.381 0 01-1.328-4.516c0-4.634 3.772-8.406 8.406-8.406 4.635 0 8.407 3.772 8.407 8.406s-3.772 8.406-8.407 8.406zm4.61-6.313c-.25-.125-1.484-.734-1.719-.812-.234-.078-.406-.125-.578.125-.172.25-.656.812-.812.984-.156.172-.312.188-.562.063-.25-.125-1.059-.39-2.019-1.246-.747-.669-1.254-1.494-1.406-1.744-.153-.25-.016-.385.109-.509.112-.112.25-.297.375-.447.125-.15.172-.25.25-.422.078-.172.039-.328-.023-.453-.063-.125-.578-1.391-.797-1.906-.211-.502-.422-.434-.578-.442l-.485-.008c-.172 0-.453.063-.688.313-.234.25-.891.875-.891 2.125s.914 2.453 1.047 2.625c.125.172 1.781 2.719 4.313 3.813.601.258 1.07.412 1.437.528.604.192 1.156.164 1.593.1.487-.072 1.484-.606 1.688-1.194.203-.588.203-1.094.14-1.194-.062-.1-.234-.156-.484-.281z"/>
        </svg>
      </div>
      <h1 className="text-3xl font-black text-gray-800 mb-4 uppercase tracking-tight">
        Tudo Certo!
      </h1>
      <p className="text-gray-600 mb-4 text-lg">
        Obrigado! Você está sendo redirecionado para o WhatsApp do Ocean Park em...
      </p>
      
      <div className="text-5xl font-black text-[#25D366] mb-8 animate-pulse">
        {contador}
      </div>

      <p className="text-sm text-gray-400 mb-4">Se não for redirecionado automaticamente:</p>
      <Link 
        href={waUrl ? decodeURIComponent(waUrl) : "/"} 
        className="inline-block bg-[#25D366] hover:bg-[#1DA851] text-white font-bold py-4 px-10 rounded-full transition-all shadow-md hover:shadow-lg uppercase tracking-wider text-sm"
      >
        Ir para o WhatsApp agora
      </Link>
    </div>
  );
}

export default function ConfirmacaoWhatsapp() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Suspense fallback={<p>Carregando redirecionamento...</p>}>
        <ConteudoWhatsapp />
      </Suspense>
    </div>
  );
}