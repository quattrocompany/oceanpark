"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SecaoCarrossel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const itens = [
    {
      src: "/img/Conforto absoluto/Portaria.jpg",
      alt: "Lobby de entrada com design moderno e acolhedor",
      legend: "Lobby de entrada com design moderno e acolhedor",
    },
    {
      src: "/img/Conforto absoluto/MiniMercado.jpg",
      alt: "Mini-mercado e conveniência para o dia a dia",
      legend: "Mini-mercado e conveniência para o dia a dia",
    },
    {
      src: "/img/Conforto absoluto/EspacoDelivery.jpg",
      alt: "Espaço Delivery dedicado para armazenar suas encomendas",
      legend: "Espaço Delivery dedicado para armazenar suas encomendas",
    },
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? itens.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === itens.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  // Função auxiliar para pegar o item atual e o próximo de forma circular
  const getItem = (offset: number) => {
    return itens[(currentIndex + offset) % itens.length];
  };

  return (
    <section id="seguranca-comodidade" className="w-full bg-white py-12 md:py-20 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        

        {/* Container do Carrossel */}
        <div className="relative group">
          
          {/* Layout 2 em 2 (Desktop) e 1 (Mobile) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            
            {/* Card 1 */}
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-gray-100 border border-gray-100 transition-all duration-500">
              <Image
                src={getItem(0).src}
                alt={getItem(0).alt}
                fill
                quality={100}
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                <p className="text-sm md:text-base font-semibold drop-shadow-md">
                  {getItem(0).legend}
                </p>
              </div>
            </div>

            {/* Card 2 (Exibido lado a lado no Desktop) */}
            <div className="hidden md:block relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-gray-100 border border-gray-100 transition-all duration-500">
              <Image
                src={getItem(1).src}
                alt={getItem(1).alt}
                fill
                quality={100}
                className="object-cover object-center"
                sizes="50vw"
                priority
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 text-white">
                <p className="text-sm md:text-base font-semibold drop-shadow-md">
                  {getItem(1).legend}
                </p>
              </div>
            </div>

          </div>

          {/* Seta de Navegação Esquerda */}
          <button
            onClick={prevSlide}
            aria-label="Imagem Anterior"
            className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0C82A0] p-3 rounded-full shadow-lg border border-gray-100 transition-all z-20 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Seta de Navegação Direita */}
          <button
            onClick={nextSlide}
            aria-label="Próxima Imagem"
            className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0C82A0] p-3 rounded-full shadow-lg border border-gray-100 transition-all z-20 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicadores de Paginação */}
          <div className="flex justify-center gap-2 mt-8">
            {itens.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full transition-all ${
                  currentIndex === index ? "bg-[#DD6810] w-8" : "bg-gray-300 w-2.5 hover:bg-gray-400"
                }`}
                aria-label={`Ir para imagem ${index + 1}`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}