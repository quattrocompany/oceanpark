"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SecaoConfortoAbsoluto() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      src: "/img/Conforto absoluto/01.jpg",
      alt: "Fachada Residencial Ocean Park",
      badge: "FACHADA RESIDENCIAL",
    },
    {
      src: "/img/Conforto absoluto/02.jpg",
      alt: "Portaria e Acesso Ocean Park",
      badge: "PORTARIA CENTRAL",
    },
  ];

  const itensSeguranca = [
    "Condomínio fechado",
    "Portaria central com WC",
    "Acesso de pedestres com eclusa",
    "Sistema de monitoramento interno (CFTV)",
    "Portões automatizados",
    "Sensores de presença nas áreas comuns com iluminação em LED",
    "Sistema de interfonia",
    "13 vagas para visitantes",
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Troca automática a cada 5 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section id="produto" className="w-full py-12 md:py-20 relative overflow-hidden">
      
      {/* 1. Imagem de Fundo da Seção */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/img/Conforto absoluto/fundo02.jpg"
          alt="Fundo Conforto Absoluto"
          fill
          quality={90}
          className="object-cover object-center"
        />
      </div>

      {/* 2. ELEMENTO PLANTA (Canto Inferior Esquerdo) */}
      <div className="absolute bottom-0 left-0 z-20 w-32 sm:w-44 md:w-60 lg:w-72 xl:w-80 pointer-events-none">
        <Image
          src="/img/Conforto absoluto/plantas2.png"
          alt="Plantas Decorativas"
          width={400}
          height={300}
          className="w-full h-auto object-contain object-bottom-left"
        />
      </div>

      {/* 3. Conteúdo sobreposto */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          
          {/* Coluna da Esquerda: Logo, Título e Lista */}
          <div className="flex flex-col justify-center">
            
            {/* Logo Ocean Park */}
            <div className="mb-6">
              <Image
                src="/img/Hero/logo.png"
                alt="Logo Ocean Park"
                width={180}
                height={70}
                className="w-auto h-24 md:h-32 object-contain"
              />
            </div>

            {/* Título */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0C82A0] leading-tight mb-8 font-[family-name:var(--font-josefin-slab)]">
              Conforto absoluto e lazer de clube,<br className="hidden sm:block" /> com segurança planejada.
            </h2>

            {/* Lista de diferenciais */}
            <ul className="space-y-3.5">
              {itensSeguranca.map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#0C82A0]/10 flex items-center justify-center text-[#0C82A0]">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-gray-700 text-sm sm:text-base font-semibold">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

          </div>

          {/* Coluna da Direita: Carrossel de Imagens */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl bg-white/5 border border-gray-100/30 group">
            
            {/* Imagem na proporção nativa */}
            <div className="relative w-full h-auto">
              <Image
                src={slides[currentSlide].src}
                alt={slides[currentSlide].alt}
                width={1200}
                height={800}
                quality={100}
                className="w-full h-auto block object-contain transition-all duration-500 rounded-3xl"
                priority
              />
            </div>

            {/* Botão Seta Esquerda */}
            <button
              onClick={prevSlide}
              aria-label="Imagem Anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2.5 rounded-full transition-all backdrop-blur-sm z-20 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Botão Seta Direita */}
            <button
              onClick={nextSlide}
              aria-label="Próxima Imagem"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2.5 rounded-full transition-all backdrop-blur-sm z-20 shadow-md"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Badge com Nome da Perspectiva */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md px-6 py-2 rounded-full text-white text-xs font-bold uppercase tracking-widest border border-white/20 whitespace-nowrap z-20">
              {slides[currentSlide].badge}
            </div>

            {/* Dots Indicadores */}
            <div className="absolute top-4 right-4 flex gap-1.5 z-20 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    currentSlide === idx ? "bg-white w-6" : "bg-white/50 w-2.5 hover:bg-white/80"
                  }`}
                  aria-label={`Ir para a imagem ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}