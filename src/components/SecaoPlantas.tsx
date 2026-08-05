"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SecaoPlantas() {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  // Rotação automática a cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section id="plantas" className="w-full bg-white relative py-12 md:py-20 overflow-hidden">
      
      {/* 1. Elemento Folha na Lateral Esquerda */}
      <div className="absolute top-0 left-0 z-20 w-24 sm:w-36 md:w-48 lg:w-56 pointer-events-none">
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
        <div className="text-center mb-8 md:mb-12 px-2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#DD6810] font-[family-name:var(--font-josefin-slab)] leading-tight">
            Plantas inteligentes garantem<br /> o melhor aproveitamento por m².
          </h2>
        </div>

        {/* Container do Carrossel de Plantas */}
        <div className="relative max-w-[1100px] mx-auto flex items-center justify-center">
          
          {/* Seta Laranja Esquerda */}
          <button
            onClick={prevSlide}
            aria-label="Planta anterior"
            className="absolute -left-2 sm:left-2 md:-left-10 top-1/2 -translate-y-1/2 z-30 p-2 text-[#DD6810] hover:scale-125 transition-transform focus:outline-none"
          >
            <svg className="w-8 h-8 sm:w-12 sm:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Imagem da Planta Atual */}
          <div className="w-full relative aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] bg-white rounded-2xl overflow-hidden   flex items-center justify-center">
            {galeriaPlantas.map((item, index) => (
              <Image
                key={item.id}
                src={item.src}
                alt={item.alt}
                fill
                quality={100}
                priority={index === 0}
                className={`object-contain p-2 sm:p-4 transition-opacity duration-500 ease-in-out ${
                  index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              />
            ))}
          </div>

          {/* Seta Laranja Direita */}
          <button
            onClick={nextSlide}
            aria-label="Próxima planta"
            className="absolute -right-2 sm:right-2 md:-right-10 top-1/2 -translate-y-1/2 z-30 p-2 text-[#DD6810] hover:scale-125 transition-transform focus:outline-none drop-shadow-md"
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
              className={`h-2.5 rounded-full transition-all duration-300 ${
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

    </section>
  );
}