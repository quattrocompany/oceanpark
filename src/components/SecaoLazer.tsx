"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface ItemLazer {
  src: string;
  titulo: string;
  alt: string;
}

const imagensLazer: ItemLazer[] = [
  { src: "/img/pet place.jpg", titulo: "PET PLACE", alt: "Espaço Pet Place para seu animal de estimação" },
  { src: "/img/playground.jpg", titulo: "PLAYGROUND", alt: "Área de playground para crianças" },
  { src: "/img/espaco grill.jpg", titulo: "ESPAÇO GRILL COM CHURRASQUEIRA", alt: "Espaço grill com churrasqueira" },
  { src: "/img/piscina infantil.jpg", titulo: "PISCINA INFANTIL", alt: "Piscina infantil com área de descanso" },
  { src: "/img/crossfit.jpg", titulo: "CROSSFIT", alt: "Área de crossfit para atividades físicas" },
  { src: "/img/voo do lazer.jpg", titulo: "VOO DO LAZER", alt: "Área de voo do lazer para atividades recreativas" },
  { src: "/img/piscina adulto deck molhado.jpg", titulo: "PISCINA ADULTO DECK MOLHADO", alt: "Piscina para adultos com deck molhado" },
  { src: "/img/quadra de beach volei.jpg", titulo: "QUADRA DE BEACH VOLEI", alt: "Quadra de beach volei para atividades esportivas" },
  { src: "/img/voo do lazer piscina.jpg", titulo: "VÔO DO LAZER PISCINA", alt: "Área de voo do lazer da piscina para atividades recreativas" },
  { src: "/img/salao de festas.jpg", titulo: "SALÃO DE FESTAS", alt: "Salão de festas para eventos e comemorações" },
  { src: "/img/quadra poliesportiva.jpg", titulo: "QUADRA POLIESPORTIVA", alt: "Quadra poliesportiva para atividades físicas" },
  { src: "/img/espaco beleza.jpg", titulo: "ESPAÇO BELEZA", alt: "Espaço de beleza para tratamentos e cuidados" },
  { src: "/img/brinquedoteca.jpg", titulo: "BRINQUEDOTECA", alt: "Área de brinquedoteca para crianças" },
  { src: "/img/salao de jogos.jpg", titulo: "SALÃO DE JOGOS", alt: "Salão de jogos para entretenimento" },  
  { src: "/img/fitness.jpg", titulo: "FITNESS", alt: "Área de fitness para atividades físicas" },
];

export default function SecaoLazer() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const nextSlide = useCallback(() => {
    if (imagensLazer.length === 0) return;
    setCurrentSlide((prev) => (prev === imagensLazer.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    if (imagensLazer.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? imagensLazer.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused || imagensLazer.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <section 
      id="lazer" 
      className="py-16 md:py-24 text-white relative bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{ backgroundImage: "url('/img/fundo01.png')" }}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl uppercase tracking-wide leading-tight">
            <span className="font-regular text-[#FFBA00] block mb-1">
              LAZER E DIVERSÃO A QUALQUER HORA
            </span>
            <span className="font-bold text-[#fffffe] block">
              PARA TODAS AS IDADES.
            </span>
          </h2>
        </div>

        <div 
          className="max-w-[1280px] mx-auto relative flex items-center justify-center px-8 sm:px-12 md:px-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <button 
            onClick={prevSlide}
            aria-label="Slide anterior"
            className="absolute left-0 sm:left-2 md:left-4 top-1/2 -translate-y-1/2 z-30 p-2 text-[#FFBA00] hover:text-white transition-all hover:scale-125 focus:outline-none"
          >
            <span className="text-2xl sm:text-3xl md:text-4xl font-black select-none">&lt;</span>
          </button>

          <div className="w-full flex flex-col items-center">
            <div className="relative w-full aspect-[16/9] sm:aspect-[16/10] md:aspect-[16/9] rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden shadow-2xl bg-black/20 border-4 border-white/10 flex flex-col justify-between">
              
              <div className="relative w-full h-full overflow-hidden">
                {imagensLazer.map((item, index) => (
                  <Image
                    key={item.src}
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1200px"
                    priority={index === 0}
                    className={`object-cover transition-opacity duration-700 ease-in-out ${
                      index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                  />
                ))}
              </div>

              <div className="relative z-20 w-full bg-gradient-to-r from-[#FFBA00] via-[#FF9E00] to-[#F77A2C] py-3 sm:py-4 px-6 text-center">
                <p className="text-[#4A137B] font-black text-xs sm:text-sm md:text-base uppercase tracking-widest drop-shadow-sm">
                  {imagensLazer[currentSlide]?.titulo}
                </p>
              </div>

            </div>

            <div className="flex flex-wrap items-center justify-center gap-2 mt-6 z-30 px-4">
              {imagensLazer.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Ir para a imagem ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "w-8 bg-[#FFBA00]" : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>

          <button 
            onClick={nextSlide}
            aria-label="Próximo slide"
            className="absolute right-0 sm:right-2 md:right-4 top-1/2 -translate-y-1/2 z-30 p-2 text-[#FFBA00] hover:text-white transition-all hover:scale-125 focus:outline-none"
          >
            <span className="text-3xl sm:text-4xl md:text-5xl font-black select-none">&gt;</span>
          </button>

        </div>

      </div>
    </section>
  );
}