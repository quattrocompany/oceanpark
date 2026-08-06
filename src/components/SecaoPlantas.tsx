"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SecaoPlantas() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const galeriaPlantas = [
    { id: "01", src: "/img/Plantas Inteligentes/01.jpg", alt: "Planta Inteligente 01" },
    { id: "02", src: "/img/Plantas Inteligentes/02.jpg", alt: "Planta Inteligente 02" },
    { id: "03", src: "/img/Plantas Inteligentes/03.jpg", alt: "Planta Inteligente 03" },
    { id: "04", src: "/img/Plantas Inteligentes/04.jpg", alt: "Planta Inteligente 04" },
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? galeriaPlantas.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === galeriaPlantas.length - 1 ? 0 : prev + 1));
  };

  // Rotação automática a cada 5 segundos (pausa quando o modal está aberto)
  useEffect(() => {
    if (isModalOpen) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide, isModalOpen]);

  return (
    <section id="plantas" className="w-full bg-white relative py-10 md:py-20 overflow-hidden">
      
      {/* 1. Elemento Folha na Lateral Esquerda */}
      <div className="absolute top-0 left-0 z-0 w-16 sm:w-28 md:w-40 lg:w-56 pointer-events-none opacity-80 sm:opacity-100">
        <Image
          src="/img/Vista Aerea/folha-esquerda.png"
          alt="Folha Decorativa"
          width={300}
          height={300}
          className="w-full h-auto object-contain object-top-left"
        />
      </div>

      {/* 2. Container Conteúdo */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        
        {/* Título Oficial da Seção */}
        <div className="text-center mb-8 md:mb-12 px-6 sm:px-12">
          <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#DD6810] font-[family-name:var(--font-josefin-slab)] leading-snug sm:leading-tight">
            Plantas inteligentes garantem<br /> o melhor aproveitamento por m².
          </h2>
        </div>

        {/* Container do Carrossel de Plantas */}
        <div className="relative max-w-[1100px] mx-auto flex items-center justify-center">
          
          {/* Seta Laranja Esquerda */}
          <button
            onClick={prevSlide}
            aria-label="Planta anterior"
            className="absolute -left-2 sm:left-2 md:-left-10 top-1/2 -translate-y-1/2 z-30 p-2 text-[#DD6810] hover:scale-125 transition-transform focus:outline-none cursor-pointer"
          >
            <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Imagem da Planta Atual (Clicável) */}
          <div 
            onClick={() => setIsModalOpen(true)}
            className="w-full relative aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] bg-white rounded-2xl overflow-hidden flex items-center justify-center cursor-zoom-in group"
            role="button"
            aria-label="Ampliar Planta"
          >
            {galeriaPlantas.map((item, index) => (
              <Image
                key={item.id}
                src={item.src}
                alt={item.alt}
                fill
                quality={100}
                priority={index === 0}
                className={`object-contain p-2 sm:p-4 transition-all duration-500 ease-in-out group-hover:scale-[1.02] ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}

            {/* Dica de Zoom */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsModalOpen(true);
              }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs uppercase font-bold px-4 py-1.5 rounded-full border border-white/20 z-20 shadow-md hover:bg-black/80 transition-colors cursor-pointer"
            >
              🔍 Clique para ampliar
            </button>
          </div>

          {/* Seta Laranja Direita */}
          <button
            onClick={nextSlide}
            aria-label="Próxima planta"
            className="absolute -right-2 sm:right-2 md:-right-10 top-1/2 -translate-y-1/2 z-30 p-2 text-[#DD6810] hover:scale-125 transition-transform focus:outline-none drop-shadow-md cursor-pointer"
          >
            <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
            </svg>
          </button>

        </div>

        {/* Indicadores de Bolinhas (Dots) */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {galeriaPlantas.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx ? "w-8 bg-[#DD6810]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Ir para a planta ${idx + 1}`}
            />
          ))}
        </div>

        {/* Rodapé de Texto Legal */}
        <div className="mt-8 text-center max-w-4xl mx-auto">
          <p className="text-[10px] sm:text-xs text-gray-500 font-normal leading-relaxed">
            Ilustração artística da planta decorada. Móveis, objetos de decoração, revestimentos e utensílios, são meramente ilustrativos e não integram o memorial descritivo.
          </p>
        </div>

      </div>

      {/* 3. MODAL LIGHTBOX EM TELA CHEIA */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Botão Fechar */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-3xl sm:text-4xl hover:text-[#DD6810] transition-colors z-[10000] focus:outline-none bg-black/50 w-12 h-12 rounded-full flex items-center justify-center border border-white/20 cursor-pointer"
            aria-label="Fechar Modal"
          >
            &times;
          </button>

          {/* Container da Imagem Modal */}
          <div 
            className="relative w-full max-w-6xl h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={galeriaPlantas[currentSlide].src}
              alt={galeriaPlantas[currentSlide].alt}
              fill
              quality={100}
              className="object-contain"
              priority
            />
          </div>
        </div>
      )}

    </section>
  );
}