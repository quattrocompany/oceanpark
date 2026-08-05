
"use client";

import { useState, useEffect } from "react";

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("lgpd-consent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("lgpd-consent", "true");
    setIsVisible(false);
    setIsModalOpen(false);
  };

  if (!isVisible && !isModalOpen) return null;

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-50 py-4 animate-in slide-in-from-bottom-full duration-500">
          <div className="max-w-[1440px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 text-center sm:text-left flex-1">
              Olá 🍪 Usamos cookies para garantir que você obtenha a melhor experiência em nosso site.{" "}
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[#4A137B] font-bold hover:underline ml-1 focus:outline-none"
              >
                Saiba mais.
              </button>
            </p>
            <button
              onClick={acceptCookies}
              className="whitespace-nowrap bg-[#FFBA00] hover:bg-[#FF9E00] text-white font-bold py-2.5 px-6 rounded-full transition-colors text-sm shadow-md focus:outline-none"
            >
              Entendi e Aceito
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl w-full max-w-2xl p-6 md:p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors focus:outline-none"
              aria-label="Fechar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <h3 className="text-xl md:text-2xl font-bold text-[#4A137B] mb-4">
              Política de Privacidade e Cookies
            </h3>
            
            <div className="space-y-4 text-gray-600 text-sm leading-relaxed">
              <p>
                Valorizamos sua privacidade e estamos comprometidos em proteger seus dados pessoais. 
                Utilizamos cookies e tecnologias semelhantes para melhorar a sua experiência de navegação, 
                analisar o tráfego do site e personalizar o conteúdo apresentado a você.
              </p>
              
              <h4 className="font-bold text-gray-800 text-base mt-4">O que são cookies?</h4>
              <p>
                Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita o nosso site. 
                Eles nos ajudam a lembrar de suas preferências, entender como você interage com nossos serviços e 
                garantir o funcionamento correto e seguro da plataforma.
              </p>
              
              <h4 className="font-bold text-gray-800 text-base mt-4">Como utilizamos os cookies?</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li><strong>Essenciais:</strong> Necessários para o funcionamento básico do site. Sem eles, recursos importantes podem não operar corretamente.</li>
                <li><strong>Desempenho e Analíticos:</strong> Para coletar estatísticas anônimas sobre o uso do site, ajudando-nos a melhorar a performance e o design.</li>
                <li><strong>Marketing:</strong> Para rastrear a eficácia das nossas campanhas e oferecer conteúdos e anúncios mais relevantes para os seus interesses.</li>
              </ul>
              
              <p className="pt-2">
                Ao clicar em &quot;Aceitar Todos&quot;, você concorda com o uso de todos os cookies descritos. 
                Caso não concorde, você pode gerenciar ou desativar o uso de cookies diretamente nas configurações do seu navegador, 
                porém isso pode afetar o funcionamento de algumas áreas do site.
              </p>
            </div>

            <div className="mt-8 flex justify-end">
              <button
                onClick={acceptCookies}
                className="bg-[#4A137B] hover:bg-[#380e5e] text-white font-bold py-3 px-8 rounded-full transition-colors w-full sm:w-auto shadow-md focus:outline-none"
              >
                Aceitar Todos
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}