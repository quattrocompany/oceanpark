"use client";

import Image from "next/image";
import { useState } from "react";

// Pavimento Térreo (1 ao 18)
const terreoItems = [
  { num: 1, text: "EMBARQUE E DESEMBARQUE" },
  { num: 2, text: "ACESSO DE VEÍCULOS" },
  { num: 3, text: "ACESSO DE PEDESTRES" },
  { num: 4, text: "PORTARIA CENTRAL C/ W.C." },
  { num: 5, text: "MINI MERCADO" },
  { num: 6, text: "HALL SOCIAL" },
  { num: 7, text: "ESPAÇO DELIVERY" },
  { num: 8, text: "VAGAS P/ VISITANTES" },
  { num: 9, text: "PRAÇA ZEN" },
  { num: 10, text: "REDÁRIO" },
  { num: 11, text: "PRAÇA DO FOGO" },
  { num: 12, text: "PRAÇA BOULEVARD" },
  { num: 13, text: "ESPAÇO GRILL" },
  { num: 14, text: "PLAYGROUND" },
  { num: 15, text: "PET PLACE" },
  { num: 16, text: "PLAY BABY" },
  { num: 17, text: "JARDINS" },
  { num: 18, text: "HALL DE ELEVADORES" },
];

// 1º Subsolo (18 ao 40)
const subsoloItems = [
  { num: 18, text: "HALL DE ELEVADORES" },
  { num: 19, text: "VAGAS" },
  { num: 20, text: "QUADRA ESPORTIVA" },
  { num: 21, text: "FITNESS" },
  { num: 22, text: "ÁREA DE DESCANSO BEACH TENNIS" },
  { num: 23, text: "BEACH TENNIS" },
  { num: 24, text: "SOLÁRIO" },
  { num: 25, text: "PISCINA ADULTO COM PRAIA" },
  { num: 26, text: "SPA" },
  { num: 27, text: "PISCINA INFANTIL C/ BRINQUEDOS D'ÁGUA" },
  { num: 28, text: "SALÃO DE FESTAS INFANTIL" },
  { num: 29, text: "ÁREA DE APOIO (FESTAS INFANTIL)" },
  { num: 30, text: "LOBBY (FESTAS INFANTIL)" },
  { num: 31, text: "WCS" },
  { num: 32, text: "BRINQUEDOTECA" },
  { num: 33, text: "PRAÇA" },
  { num: 34, text: "SALÃO DE FESTAS ADULTO" },
  { num: 35, text: "ÁREA DE APOIO (FESTAS ADULTO)" },
  { num: 36, text: "LOBBY (FESTAS ADULTO)" },
  { num: 37, text: "COWORKING" },
  { num: 38, text: "PRAÇA DE LEITURA SOB PÉRGOLAS" },
  { num: 39, text: "PRAÇA DE CONTEMPLAÇÃO" },
  { num: 40, text: "JARDINS" },
];

export default function SecaoImplantacao() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plantSlides = [
    {
      title: "PAVIMENTO TÉRREO",
      src: "/img/Implantacao/implantacao.png",
      alt: "Planta de Implantação Pavimento Térreo",
    },
    {
      title: "1º SUBSOLO",
      src: "/img/Implantacao/implantacao-subsolo.png",
      alt: "Planta de Implantação 1º Subsolo",
    },
  ];

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? plantSlides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === plantSlides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="implantacao" className="w-full relative overflow-hidden py-12 lg:py-20">
      
      {/* 1. Imagem de Fundo da Seção */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/img/Implantacao/fundo02.jpg"
          alt="Fundo Implantação"
          fill
          quality={90}
          className="object-cover object-center"
        />
      </div>

      {/* 2. ELEMENTO LAZER (Canto Inferior Direito) */}
      <div className="absolute bottom-5 right-0 z-20 w-32 sm:w-44 md:w-60 lg:w-72 xl:w-80 pointer-events-none">
        <Image
          src="/img/Implantacao/lazer.png"
          alt="Elemento Lazer Decorativo"
          width={400}
          height={300}
          className="w-full h-auto object-contain object-bottom-right"
        />
      </div>

      {/* 3. Conteúdo Principal */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Cabeçalho */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-block mb-3">
            <Image 
              src="/img/Hero/logo.png" 
              alt="Ocean Park Logo" 
              width={220} 
              height={80} 
              className="w-auto h-24 md:h-32 object-contain mx-auto" 
            />
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0C82A0] font-[family-name:var(--font-josefin-slab)] uppercase leading-tight">
            Planejado para oferecer <br className="hidden sm:inline" />
            <span className="text-[#DD6810]">O QUE A VIDA TEM DE MELHOR.</span>
          </h2>
        </div>

        {/* Layout Grid: Esquerda Carrossel Ampliado | Direita Legendas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Coluna Esquerda: Carrossel das Plantas */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Seletor de Abas/Plantas */}
            <div className="flex gap-3 mb-4 z-20">
              {plantSlides.map((slide, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold uppercase transition-all shadow-md ${
                    currentSlide === idx
                      ? "bg-[#0C82A0] text-white scale-105"
                      : "bg-white/80 text-gray-700 hover:bg-white border border-gray-200"
                  }`}
                >
                  {slide.title}
                </button>
              ))}
            </div>

            {/* Área da Imagem em Destaque */}
            <div className="relative w-full h-[450px] sm:h-[580px] md:h-[680px] lg:h-[750px] group flex items-center justify-center">
              
              <div 
                onClick={() => setIsModalOpen(true)}
                className="relative w-full h-full cursor-zoom-in"
                role="button"
                aria-label="Ampliar Implantação"
              >
                <Image
                  src={plantSlides[currentSlide].src}
                  alt={plantSlides[currentSlide].alt}
                  fill
                  quality={100}
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                  priority
                />
              </div>

              {/* Seta Esquerda */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                aria-label="Planta Anterior"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0C82A0] p-2.5 sm:p-3 rounded-full shadow-lg border border-gray-100 transition-all z-20"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Seta Direita */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                aria-label="Próxima Planta"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-[#0C82A0] p-2.5 sm:p-3 rounded-full shadow-lg border border-gray-100 transition-all z-20"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dica de Zoom */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs uppercase font-bold px-4 py-1.5 rounded-full border border-white/20 z-20 shadow-md hover:bg-black/80 transition-colors"
              >
                🔍 Clique para ampliar
              </button>

            </div>

          </div>

          {/* Coluna Direita: Legendas das Plantas */}
          <div className="lg:col-span-5 bg-white/85 backdrop-blur-md p-6 sm:p-8 rounded-3xl shadow-xl border border-white/40 z-20">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 text-[11px] sm:text-[12px] font-semibold text-gray-800">
              
              {/* Pavimento Térreo */}
              <div>
                <h3 className="text-[#0C82A0] font-bold text-sm sm:text-base mb-3 border-b-2 border-[#0C82A0] pb-1 uppercase tracking-wide">
                  PAVIMENTO TÉRREO
                </h3>
                <ul className="space-y-1.5">
                  {terreoItems.map((item) => (
                    <li key={`t-${item.num}-${item.text}`} className="flex items-start leading-tight">
                      <span className="w-5 h-5 rounded-full bg-[#0C82A0] text-white flex items-center justify-center text-[9px] font-bold shrink-0 mr-2 shadow-sm">
                        {item.num}
                      </span>
                      <span className="flex-1 self-center">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 1º Subsolo */}
              <div>
                <h3 className="text-[#DD6810] font-bold text-sm sm:text-base mb-3 border-b-2 border-[#DD6810] pb-1 uppercase tracking-wide">
                  1º SUBSOLO
                </h3>
                <ul className="space-y-1.5">
                  {subsoloItems.map((item) => (
                    <li key={`s-${item.num}-${item.text}`} className="flex items-start leading-tight">
                      <span className="w-5 h-5 rounded-full bg-[#DD6810] text-white flex items-center justify-center text-[9px] font-bold shrink-0 mr-2 shadow-sm">
                        {item.num}
                      </span>
                      <span className="flex-1 self-center">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* 4. MODAL LIGHTBOX EM TELA CHEIA */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Botão Fechar */}
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white text-3xl sm:text-4xl hover:text-[#DD6810] transition-colors z-[10000] focus:outline-none bg-black/50 w-12 h-12 rounded-full flex items-center justify-center border border-white/20"
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
              src={plantSlides[currentSlide].src}
              alt={plantSlides[currentSlide].alt}
              fill
              quality={100}
              className="object-contain"
              priority
            />

            {/* Titulo no Modal */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white text-xs sm:text-sm font-bold uppercase px-6 py-2 rounded-full border border-white/20 shadow-lg">
              {plantSlides[currentSlide].title}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}