"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SecaoMobilidadePraticidade() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    { src: "/img/Mobilidade e Praticidade/01.jpg", caption: "FACHADA RESIDENCIAL" },
    { src: "/img/Mobilidade e Praticidade/02.jpg", caption: "PORTARIA CENTRAL" },
    { src: "/img/Mobilidade e Praticidade/03.jpg", caption: "PLAYGROUND" },
    { src: "/img/Mobilidade e Praticidade/04.jpg", caption: "PLAY BABY" },
    { src: "/img/Mobilidade e Praticidade/05.jpg", caption: "PET PLACE" },
    { src: "/img/Mobilidade e Praticidade/06.jpg", caption: "ESPAÇO GRILL" },
    { src: "/img/Mobilidade e Praticidade/07.jpg", caption: "PRAÇA BOULEVARD" },
    { src: "/img/Mobilidade e Praticidade/08.jpg", caption: "PRAÇA DO FOGO" },
    { src: "/img/Mobilidade e Praticidade/09.jpg", caption: "REDÁRIO" },
    { src: "/img/Mobilidade e Praticidade/10.jpg", caption: "PRAÇA ZEN" },
    { src: "/img/Mobilidade e Praticidade/11.jpg", caption: "QUADRA ESPORTIVA" },
    { src: "/img/Mobilidade e Praticidade/12.jpg", caption: "FITNESS" },
    { src: "/img/Mobilidade e Praticidade/13.jpg", caption: "BEACH TENNIS" },
    { src: "/img/Mobilidade e Praticidade/14.jpg", caption: "PISCINA ADULTO" },
    { src: "/img/Mobilidade e Praticidade/15.jpg", caption: "PISCINA INFANTIL" },
    { src: "/img/Mobilidade e Praticidade/16.jpg", caption: "SOLÁRIO E SPA" },
    { src: "/img/Mobilidade e Praticidade/17.jpg", caption: "SALÃO DE FESTAS INFANTIL" },
    { src: "/img/Mobilidade e Praticidade/18.jpg", caption: "BRINQUEDOTECA" },
    { src: "/img/Mobilidade e Praticidade/19.jpg", caption: "SALÃO DE FESTAS ADULTO" },
    { src: "/img/Mobilidade e Praticidade/20.jpg", caption: "COWORKING" },
    { src: "/img/Mobilidade e Praticidade/21.jpg", caption: "MINI MERCADO" },
    { src: "/img/Mobilidade e Praticidade/22.jpg", caption: "ESPAÇO DELIVERY" },
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <section id="lazer-mobilidade" className="w-full bg-white relative flex flex-col">
      
      {/* 1. CABEÇALHO BANNER FULL WIDTH COM TEXTO */}
      <div className="relative w-full z-20 flex flex-col justify-center">
        
        {/* Imagem Desktop Full Width */}
        <div className="hidden sm:flex w-full relative">
          <Image
            src="/img/Mobilidade e Praticidade/lazer-teto.png"
            alt="Mobilidade e praticidade que transformam o seu dia a dia - Ocean Park"
            width={1920}
            height={350}
            quality={100}
            className="w-full h-auto block object-cover"
            priority
          />
        </div>

        {/* Imagem Mobile Full Width */}
        <div className="flex sm:hidden w-full relative">
          <Image
            src="/img/Mobilidade e Praticidade/lazer-teto-mobile2.png"
            alt="Mobilidade e praticidade que transformam o seu dia a dia - Ocean Park Mobile"
            width={768}
            height={300}
            quality={100}
            className="w-full h-auto block object-cover"
            priority
          />
        </div>

        {/* FRASE DE SOBREPOSIÇÃO NO BANNER */}
        <div className="absolute inset-0 z-30 flex items-center justify-center sm:justify-start px-6 sm:px-12 md:pl-16 lg:pl-24 pr-6 md:pr-72 lg:pr-96 text-center sm:text-left pointer-events-none">
          <h2 className="text-white text-base sm:text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-josefin-slab)] leading-snug sm:leading-tight drop-shadow-md">
            Mobilidade e praticidade <br className="hidden sm:inline" />
            que transformam o seu dia a dia.
          </h2>
        </div>

      </div>

      {/* 2. CARROSSEL DE FOTOS FULL WIDTH */}
      <div className="relative w-full h-[320px] sm:h-[600px] md:h-[720px] lg:h-[850px] bg-gray-100 group z-10 -mt-6 sm:-mt-20 md:-mt-28 lg:-mt-36 xl:-mt-44">
        
        <Image
          src={slides[currentIndex].src}
          alt={slides[currentIndex].caption}
          fill
          quality={100}
          className="object-cover object-center transition-all duration-500"
          priority
        />

        {/* Seta Laranja Esquerda */}
        <button
          onClick={prevSlide}
          aria-label="Anterior"
          className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 text-[#DD6810] hover:scale-125 transition-transform p-2 z-30 focus:outline-none drop-shadow-2xl cursor-pointer"
        >
          <svg className="w-8 h-8 sm:w-14 sm:h-14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>

        {/* Seta Laranja Direita */}
        <button
          onClick={nextSlide}
          aria-label="Próximo"
          className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 text-[#DD6810] hover:scale-125 transition-transform p-2 z-30 focus:outline-none drop-shadow-2xl cursor-pointer"
        >
          <svg className="w-8 h-8 sm:w-14 sm:h-14" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
          </svg>
        </button>

        {/* Dots de Navegação */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-30 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? "bg-white w-5 sm:w-6 sm:h-2.5" : "bg-white/50 w-2 sm:w-2.5 sm:h-2.5 hover:bg-white/80"
              }`}
              aria-label={`Ir para a foto ${idx + 1}`}
            />
          ))}
        </div>

        {/* Tag Laranja com Legenda */}
        <div className="absolute bottom-6 right-4 sm:right-6 z-30 bg-[#DD6810] text-white text-[9px] sm:text-xs font-black uppercase tracking-widest px-3 sm:px-4 py-1.5 rounded-sm shadow-xl">
          {slides[currentIndex].caption}
        </div>

      </div>

    </section>
  );
}