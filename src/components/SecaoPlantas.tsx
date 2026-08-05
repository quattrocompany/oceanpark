"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface SlideItem {
  id: string;
  src: string;
  alt: string;
}

const galeriaPlantas: SlideItem[] = [
  {
    id: "2 Dorms e Varanda Gourmet 34,60m2",
    src: "/img/Planta Varanda Gourmet 34,60m.jpg",
    alt: "Perspectiva ilustrativa - Lumini 3",
  },
  {
    id: "1 Dorm Living Ampliado 34,60m2",
    src: "/img/Planta Varanda Gourmet 34,60m(2).jpg",
    alt: "Perspectiva ilustrativa - Lumini 3",
  },
  {
    id: "3 Dorms (Suíte) 53,95m2",
    src: "/img/Planta Varanda Gourmet 53,95m.jpg",
    alt: "Perspectiva ilustrativa - Lumini 3",
  },
  {
    id: "2 Dorms (Suíte) Living Ampliado 53,95m2",
    src: "/img/Planta Living Ampliado 53,95m.jpg",
    alt: "Perspectiva ilustrativa - Lumini 3",
  },
];

// Array simulando as imagens adicionais para a galeria clicável
// Substitua pelas imagens reais do seu projeto
const imagensGaleriaExtras: SlideItem[] = [
  { id: "img-extra-1", src: "/img/Projeto Dormitorio 34,60m.jpg", alt: "Dormitorio 34,60m" },
  { id: "img-extra-2", src: "/img/Projeto Dormitorio 53,95m.jpg", alt: "Dormitorio 53,95m" },
  { id: "img-extra-3", src: "/img/Projeto Living 34,60m.jpg", alt: "Living 34,60m" },
  { id: "img-extra-4", src: "/img/Projeto Living 53,95m.jpg", alt: "Living 53,95m" },
  { id: "img-extra-5", src: "/img/Projeto Living Ampliado 34,60m.jpg", alt: "Living Ampliado 34,60m" },
  { id: "img-extra-6", src: "/img/Projeto Living Ampliado 53,95m.jpg", alt: "Living Ampliado 53,95m" },
];

export default function SecaoPlantas() {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const nextSlide = useCallback(() => {
    if (galeriaPlantas.length === 0) return;
    setCurrentSlide((prev) => (prev === galeriaPlantas.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    if (galeriaPlantas.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? galeriaPlantas.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused || galeriaPlantas.length <= 1) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  // Controles do Lightbox
  const closeLightbox = () => setLightboxIndex(null);
  
  const lightboxNext = useCallback((e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === imagensGaleriaExtras.length - 1 ? 0 : (prev as number) + 1));
    }
  }, [lightboxIndex]);
  
  const lightboxPrev = useCallback((e?: React.MouseEvent) => {
     if (e) e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) => (prev === 0 ? imagensGaleriaExtras.length - 1 : (prev as number) - 1));
    }
  }, [lightboxIndex]);

   // Atalho de teclado para fechar/navegar o lightbox
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (lightboxIndex === null) return;
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") lightboxNext();
        if (e.key === "ArrowLeft") lightboxPrev();
      };
      
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, lightboxNext, lightboxPrev]);

  // Bloquear scroll quando lightbox aberto
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  return (
    // AJUSTE AQUI: Trocado py-10 md:py-5 por pt-0 pb-10 md:pb-5 para remover o espaço superior
    <section id="plantas" className="bg-white relative pt-0 pb-10 md:pb-5">
      
<div className="relative -mt-[20px] bg-gradient-to-r from-[#FFBA00] via-[#FF9E00] to-[#F77A2C] py-8 md:py-12 overflow-hidden mb-8 md:mb-12">        
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="text-center md:text-left pl-0 md:pl-16">
            <h2 className="text-white text-xl sm:text-2xl md:text-3xl lg:text-[2.2rem] uppercase tracking-tight leading-snug">
              <span className="font-regular block">
                Plantas inteligentes para todos
              </span>
              <span className="font-bold block">
                os gostos e necessidades.
              </span>
            </h2>
          </div>

          <div className="shrink-0">
            <Image
              src="/img/logowhite.png"
              alt="Logo Lumini Residencial Clube 3"
              width={180}
              height={180}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 object-contain"
              priority
            />
          </div>

        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        <div 
          className="max-w-[1280px] mx-auto relative flex items-center justify-center px-4 sm:px-10 md:px-14"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          <button 
            onClick={prevSlide}
            aria-label="Slide anterior"
            className="absolute left-0 sm:left-1 md:left-2 top-1/2 -translate-y-1/2 z-30 p-2 text-[#4A137B] hover:text-[#FFBA00] transition-all hover:scale-125 focus:outline-none"
          >
            <span className="text-3xl sm:text-4xl md:text-5xl font-black select-none">&lt;</span>
          </button>

          <div className="w-full flex flex-col items-center">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/10] bg-white overflow-hidden">
              {galeriaPlantas.map((item, index) => (
                <Image
                  key={item.id}
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  priority={index === 0}
                  className={`object-contain transition-opacity duration-700 ease-in-out ${
                    index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 mt-6 z-30">
              {galeriaPlantas.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Ir para a imagem ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentSlide === idx ? "w-8 bg-[#4A137B]" : "w-2.5 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>
          </div>

          <button 
            onClick={nextSlide}
            aria-label="Próximo slide"
            className="absolute right-0 sm:right-1 md:right-2 top-1/2 -translate-y-1/2 z-30 p-2 text-[#4A137B] hover:text-[#FFBA00] transition-all hover:scale-125 focus:outline-none"
          >
            <span className="text-3xl sm:text-4xl md:text-5xl font-black select-none">&gt;</span>
          </button>

        </div>
        
        {/* ================= GALERIA CLICÁVEL (2 colunas x 3 linhas) ================= */}
        <div className="max-w-[1280px] mx-auto mt-16 px-4">
           <h3 className="text-2xl md:text-3xl font-bold text-center text-[#4A137B] mb-8">
              Conheça os Detalhes
           </h3>
           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {imagensGaleriaExtras.map((item, idx) => (
                <div 
                  key={item.id} 
                  className="relative aspect-video cursor-pointer overflow-hidden rounded-xl group"
                  onClick={() => setLightboxIndex(idx)}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                     <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black/50 px-4 py-2 rounded-full transition-opacity duration-300 backdrop-blur-sm">
                        Ampliar
                     </span>
                  </div>
                </div>
              ))}
           </div>
        </div>

        <div className="max-w-[1100px] mx-auto mt-12 text-center">
          <p className="text-[10px] sm:text-xs text-gray-500 font-normal leading-relaxed">
            Móveis, utensílios, objetos de decoração, inclusive a vegetação apresentada são meramente ilustrativos, não fazendo parte integrante do contrato de compra e venda. As áreas comuns serão entregues conforme memorial descritivo. A vegetação apresentada é de porte adulto e na entrega do empreendimento poderá apresentar diferenças de tamanho e porte. Apesar de todo cuidado na obtenção das informações contidas neste material, elas não devem ser consideradas como parte integrante de qualquer contrato.
          </p>
        </div>

      </div>

      {/* ================= LIGHTBOX (MODAL) ================= */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-8"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
        >
          {/* Botão Fechar */}
          <button 
             className="absolute top-4 right-4 z-[60] text-white/70 hover:text-white p-2"
             onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
             aria-label="Fechar"
          >
             <span className="text-4xl leading-none">&times;</span>
          </button>
          
          {/* Seta Anterior Lightbox */}
           <button 
             className="absolute left-4 z-[60] text-white/50 hover:text-white p-4"
             onClick={lightboxPrev}
             aria-label="Anterior"
          >
             <span className="text-4xl sm:text-6xl select-none">&lsaquo;</span>
          </button>
          
          {/* Container Imagem Lightbox */}
          <div 
            className="relative w-full max-w-6xl aspect-video md:aspect-[16/9] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
                src={imagensGaleriaExtras[lightboxIndex].src}
                alt={imagensGaleriaExtras[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
            />
            {/* Indicador Numérico Opcional */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm bg-black/50 px-3 py-1 rounded-full">
                {lightboxIndex + 1} / {imagensGaleriaExtras.length}
            </div>
          </div>
          
           {/* Seta Próxima Lightbox */}
           <button 
             className="absolute right-4 z-[60] text-white/50 hover:text-white p-4"
             onClick={lightboxNext}
             aria-label="Próximo"
          >
             <span className="text-4xl sm:text-6xl select-none">&rsaquo;</span>
          </button>
        </div>
      )}

      {/* Elemento na base da seção ajustado para bottom-0 */}
      <div className="absolute bottom-0 left-0 h-full w-40 md:w-64 pointer-events-none opacity-80 z-0">
        <Image
          src="/img/petalas.png"
          alt="Grafismo decorativo"
          width={300}
          height={300}
          className="w-full h-full object-left-bottom object-contain"
        />
      </div>

    </section>
  );
}