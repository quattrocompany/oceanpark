"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Footer({ onOpenWhatsapp }: { onOpenWhatsapp?: () => void }) {
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyBar(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleWhatsappClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onOpenWhatsapp) {
      onOpenWhatsapp();
    } else {
      window.dispatchEvent(new CustomEvent("openWhatsAppModal"));
    }
  };

  return (
    <>
      <footer className="bg-white pt-12 pb-32 md:pb-40 relative z-10 w-full overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          
          {/* Telefone e WhatsApp de Atendimento */}
          <div className="text-center mb-10">
            <button 
              onClick={handleWhatsappClick}
              className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 hover:text-[#25D366] transition-colors inline-flex items-center gap-3"
            >
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.931.547 3.743 1.516 5.334L2 22l4.781-1.469a10.02 10.02 0 005.25 1.485c5.535 0 10.031-4.496 10.031-10.031S17.566 2 12.031 2zm0 18.375c-1.634 0-3.188-.415-4.571-1.2l-.328-.188-3.398 1.047 1.062-3.328-.219-.344a8.381 8.381 0 01-1.328-4.516c0-4.634 3.772-8.406 8.406-8.406 4.635 0 8.407 3.772 8.407 8.406s-3.772 8.406-8.407 8.406zm4.61-6.313c-.25-.125-1.484-.734-1.719-.812-.234-.078-.406-.125-.578.125-.172.25-.656.812-.812.984-.156.172-.312.188-.562.063-.25-.125-1.059-.39-2.019-1.246-.747-.669-1.254-1.494-1.406-1.744-.153-.25-.016-.385.109-.509.112-.112.25-.297.375-.447.125-.15.172-.25.25-.422.078-.172.039-.328-.023-.453-.063-.125-.578-1.391-.797-1.906-.211-.502-.422-.434-.578-.442l-.485-.008c-.172 0-.453.063-.688.313-.234.25-.891.875-.891 2.125s.914 2.453 1.047 2.625c.125.172 1.781 2.719 4.313 3.813.601.258 1.07.412 1.437.528.604.192 1.156.164 1.593.1.487-.072 1.484-.606 1.688-1.194.203-.588.203-1.094.14-1.194-.062-.1-.234-.156-.484-.281z"/>
              </svg>
              <span>(11) 98856-8852</span>
            </button>
          </div>

          {/* Logos das Empresas Parceiras */}
          <div className="border-t border-gray-200 border-b py-10 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 items-start justify-items-center text-center">
              
              <div className="flex flex-col items-center justify-start w-full">
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-3">
                  INTERMEDIAÇÃO:
                </span>
                <div className="relative w-full max-w-[140px] sm:max-w-[180px] h-16 sm:h-24">
                  <Image src="/img/L1.png" alt="Direções Imobiliária" fill className="object-contain" />
                </div>
              </div>

              <div className="flex flex-col items-center justify-start w-full">
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-3">
                  FINANCIAMENTO:
                </span>
                <div className="relative w-full max-w-[120px] sm:max-w-[160px] h-16 sm:h-24">
                  <Image src="/img/L2.png" alt="CAIXA MCMV" fill className="object-contain" />
                </div>
              </div>

              <div className="flex flex-col items-center justify-start w-full">
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-3">
                  CONSTRUÇÃO:
                </span>
                <div className="relative w-full max-w-[110px] sm:max-w-[130px] h-16 sm:h-24">
                  <Image src="/img/L3.png" alt="Quattro Construtora" fill className="object-contain" />
                </div>
              </div>

              <div className="flex flex-col items-center justify-start w-full">
                <span className="text-[9px] sm:text-[10px] text-gray-500 font-semibold uppercase tracking-wider mb-3">
                  INCORPORAÇÃO:
                </span>
                <div className="relative w-full max-w-[140px] sm:max-w-[180px] h-16 sm:h-24">
                  <Image src="/img/L4.png" alt="Quattro Inc" fill className="object-contain" />
                </div>
              </div>

            </div>
          </div>

          {/* Disclaimer Legal Oficial */}
          <div className="mb-8">
            <p className="text-[10px] sm:text-[11px] text-gray-400 text-justify leading-relaxed font-normal">
              R.I. na Matrícula N°159.152 no C.R.I. de Osasco em 21/01/2026. Apesar de todo cuidado na obtenção das informações contidas neste material, elas não devem ser consideradas como parte integrante de qualquer contrato. A inclusão no Programa Minha Casa Minha Vida, está vinculada ao enquadramento de renda e demais regras do programa, à época da assinatura do contrato de financiamento. As áreas de lazer serão entregues equipadas e decoradas de acordo com o memorial descritivo. As ilustrações, artes, fotos, mobiliário, vegetação e peças de decoração dos materiais de divulgação têm caráter exclusivamente promocional por tratar-se de bem a ser construído, sendo que as condições de comercialização, projetos e especificações são aquelas dos contratos e memoriais a serem firmados com os adquirentes. A vegetação será entregue em diferentes tamanhos e portes. Fotos ilustrativas. Perspectivas artísticas.
            </p>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-200 pt-6 text-center">
            <p className="text-[11px] sm:text-xs text-gray-400 font-medium">
              © {new Date().getFullYear()} | Ocean Park Condomínio Clube | <a href="#privacidade" className="font-bold hover:text-[#DD6810] transition-colors">Política de Privacidade</a>
            </p>
          </div>

        </div>
      </footer>

      {/* Botão Flutuante do WhatsApp */}
      <button
        onClick={handleWhatsappClick}
        className={`fixed right-4 sm:right-8 z-[60] transition-all duration-500 hover:scale-110 ${showStickyBar ? "bottom-[90px] md:bottom-[100px] opacity-100" : "-bottom-20 opacity-0 pointer-events-none"}`}
        aria-label="Fale pelo WhatsApp"
      >
        <div className="bg-white rounded-full p-1 shadow-lg border border-gray-100">
          <svg className="w-12 h-12 text-[#25D366]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.931.547 3.743 1.516 5.334L2 22l4.781-1.469a10.02 10.02 0 005.25 1.485c5.535 0 10.031-4.496 10.031-10.031S17.566 2 12.031 2zm0 18.375c-1.634 0-3.188-.415-4.571-1.2l-.328-.188-3.398 1.047 1.062-3.328-.219-.344a8.381 8.381 0 01-1.328-4.516c0-4.634 3.772-8.406 8.406-8.406 4.635 0 8.407 3.772 8.407 8.406s-3.772 8.406-8.407 8.406zm4.61-6.313c-.25-.125-1.484-.734-1.719-.812-.234-.078-.406-.125-.578.125-.172.25-.656.812-.812.984-.156.172-.312.188-.562.063-.25-.125-1.059-.39-2.019-1.246-.747-.669-1.254-1.494-1.406-1.744-.153-.25-.016-.385.109-.509.112-.112.25-.297.375-.447.125-.15.172-.25.25-.422.078-.172.039-.328-.023-.453-.063-.125-.578-1.391-.797-1.906-.211-.502-.422-.434-.578-.442l-.485-.008c-.172 0-.453.063-.688.313-.234.25-.891.875-.891 2.125s.914 2.453 1.047 2.625c.125.172 1.781 2.719 4.313 3.813.601.258 1.07.412 1.437.528.604.192 1.156.164 1.593.1.487-.072 1.484-.606 1.688-1.194.203-.588.203-1.094.14-1.194-.062-.1-.234-.156-.484-.281z"/>
          </svg>
        </div>
      </button>

      {/* Barra Laranja/Azul Fixa Rodapé */}
      <div 
        className={`fixed bottom-0 left-0 w-full z-50 bg-[#0C82A0] shadow-[0_-10px_30px_rgba(0,0,0,0.3)] transition-transform duration-500 ease-in-out ${
          showStickyBar ? "translate-y-0 rounded-t-3xl md:rounded-none" : "translate-y-full"
        }`}
      >
        <div className="max-w-[1440px] mx-auto flex flex-row items-stretch justify-center h-auto md:h-20 divide-x divide-white/20">
          
          <button 
            onClick={handleWhatsappClick}
            className="flex-1 flex items-center justify-center gap-3 text-white hover:bg-white/10 transition-colors py-4 md:py-0 group px-2"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.931.547 3.743 1.516 5.334L2 22l4.781-1.469a10.02 10.02 0 005.25 1.485c5.535 0 10.031-4.496 10.031-10.031S17.566 2 12.031 2zm0 18.375c-1.634 0-3.188-.415-4.571-1.2l-.328-.188-3.398 1.047 1.062-3.328-.219-.344a8.381 8.381 0 01-1.328-4.516c0-4.634 3.772-8.406 8.406-8.406 4.635 0 8.407 3.772 8.407 8.406s-3.772 8.406-8.407 8.406zm4.61-6.313c-.25-.125-1.484-.734-1.719-.812-.234-.078-.406-.125-.578.125-.172.25-.656.812-.812.984-.156.172-.312.188-.562.063-.25-.125-1.059-.39-2.019-1.246-.747-.669-1.254-1.494-1.406-1.744-.153-.25-.016-.385.109-.509.112-.112.25-.297.375-.447.125-.15.172-.25.25-.422.078-.172.039-.328-.023-.453-.063-.125-.578-1.391-.797-1.906-.211-.502-.422-.434-.578-.442l-.485-.008c-.172 0-.453.063-.688.313-.234.25-.891.875-.891 2.125s.914 2.453 1.047 2.625c.125.172 1.781 2.719 4.313 3.813.601.258 1.07.412 1.437.528.604.192 1.156.164 1.593.1.487-.072 1.484-.606 1.688-1.194.203-.588.203-1.094.14-1.194-.062-.1-.234-.156-.484-.281z"/>
            </svg>
            <span className="text-sm font-medium tracking-wider uppercase">Fale pelo WhatsApp</span>
          </button>

          <a 
            href="#localizacao" 
            className="flex-1 flex items-center justify-center gap-3 text-white hover:bg-white/10 transition-colors py-4 md:py-0 group px-2"
          >
            <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="hidden md:block text-sm font-medium tracking-wider uppercase">Visite nosso estande</span>
          </a>

        </div>
      </div>
    </>
  );
}