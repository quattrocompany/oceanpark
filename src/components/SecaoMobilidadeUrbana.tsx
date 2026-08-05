"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SecaoMobilidadeUrbana() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Mapeia as 22 imagens de 01.jpg até 22.jpg
  const carouselImages = Array.from({ length: 22 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return `/img/Mobilidade e Praticidade/${num}.jpg`;
  });

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === carouselImages.length - 1 ? 0 : prev + 1));
  };

  // Troca automática a cada 4 segundos
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section id="localizacao" className="w-full bg-[#0A81A1] text-white py-16 relative overflow-hidden">
      
      {/* 1. Elemento Decorativo Lazer Teto no Cabeçalho */}
      <div className="absolute top-0 right-0 z-20 w-36 sm:w-52 md:w-72 lg:w-96 pointer-events-none">
        <Image 
          src="/img/Mobilidade e Praticidade/lazer-teto.png" 
          alt="Elemento Lazer Teto" 
          width={500} 
          height={300} 
          className="w-full h-auto object-contain object-top-right" 
        />
      </div>

      {/* 2. Cabeçalho da Seção */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center mb-10 relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-josefin-slab)] uppercase leading-tight tracking-wide">
          A EXCELENTE LOCALIZAÇÃO DO OCEAN PARK É UM CONVITE <br className="hidden sm:inline" />
          PARA UMA VIDA LEVE, PRÁTICA E CHEIA DE POSSIBILIDADES.
        </h2>
      </div>

      {/* 3. Carrossel de Fotos (01.jpg a 22.jpg) */}
      <div className="max-w-[1440px] mx-auto px-6 mb-12 relative z-10">
        <div className="relative w-full h-[320px] sm:h-[480px] md:h-[600px] rounded-3xl overflow-hidden shadow-2xl bg-black/20 group">
          
          <Image 
            src={carouselImages[currentSlide]} 
            alt={`Mobilidade e Praticidade ${currentSlide + 1}`} 
            fill 
            quality={100}
            className="object-cover object-center transition-all duration-500" 
            priority
          />

          {/* Seta Esquerda */}
          <button
            onClick={prevSlide}
            aria-label="Imagem Anterior"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all backdrop-blur-sm z-20 shadow-md focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Seta Direita */}
          <button
            onClick={nextSlide}
            aria-label="Próxima Imagem"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all backdrop-blur-sm z-20 shadow-md focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Indicador de Foto Atual */}
          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-bold z-20 border border-white/20">
            {currentSlide + 1} / {carouselImages.length}
          </div>

        </div>
      </div>

      {/* 4. Faixa de Visita aos Decorados */}
      <div className="w-full bg-[#DE6810] py-10 px-6 my-8 relative z-10">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          
          <div className="flex-1 space-y-4">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-[family-name:var(--font-josefin-slab)] text-white uppercase tracking-tight">
              VISITE DECORADOS
            </h3>
            
            <p className="text-xl sm:text-2xl font-bold">
              <a 
                href="https://www.google.com.br/maps/dir//Av.+Novo+Osasco,+1010+-+Bussocaba,+Osasco+-+SP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline transition-all"
              >
                Plantão de vendas: Av. Novo Osasco, 1010
              </a>
            </p>

            <p className="text-xs sm:text-sm font-semibold uppercase opacity-90">
              <a 
                href="https://www.google.com.br/maps/dir//R.+Achiles+Beline,+616+-+Padroeira,+Osasco+-+SP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline transition-all"
              >
                O EMPREENDIMENTO LOCALIZA-SE NA RUA AQUILES BELINE, 616 - PADROEIRA / OSASCO.
              </a>
            </p>
          </div>

          <div className="relative w-48 h-24 shrink-0">
            <Image 
              src="/img/Visite/mcmv-plantas.png" 
              alt="Minha Casa Minha Vida" 
              fill 
              className="object-contain" 
            />
          </div>

        </div>
      </div>

      {/* 5. Google Maps Embed */}
      <div className="w-full h-[400px] relative shadow-inner my-8 z-10">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3547.512782712201!2d-46.79176892470415!3d-23.567247061808462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce557edec747bf%3A0xb3ce498eed915209!2sAv.%20Novo%20Osasco%2C%201010%20-%20Bussocaba%2C%20Osasco%20-%20SP%2C%2006056-000!5e1!3m2!1spt-BR!2sbr!4v1769616169975!5m2!1spt-BR!2sbr" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa Plantão de Vendas Ocean Park"
        />
      </div>

      {/* 6. Botões de Acesso Rápido ao Mapa */}
      <div className="max-w-[1440px] mx-auto px-6 flex flex-col sm:flex-row justify-center items-center gap-4 -mt-12 relative z-20">
        <a 
          href="https://www.waze.com/pt-BR/live-map/directions/br/sp/av.-novo-osasco,-1010?to=place.ChIJv0fH3n5VzpQRCVKR7Y5JzrM" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-[#0099FF] text-white hover:bg-[#0088EE] font-bold px-8 py-3.5 rounded-full border-2 border-white shadow-xl flex items-center gap-3 transition-all transform hover:scale-105 text-sm"
        >
          <Image src="/img/Localizacao/ico-waze.gif" alt="Waze" width={24} height={24} />
          <span>Veja pelo Waze</span>
        </a>

        <a 
          href="https://www.google.com/maps?ll=-23.567252,-46.789194&z=16&t=h&hl=pt-BR&gl=BR&mapclient=embed&q=Av.+Novo+Osasco,+1010+-+Bussocaba+Osasco+-+SP+06056-000" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-3.5 rounded-full border-2 border-[#0099FF] shadow-xl flex items-center gap-3 transition-all transform hover:scale-105 text-sm"
        >
          <Image src="/img/Localizacao/ico-mapa.gif" alt="Mapa" width={24} height={24} />
          <span>Ver mapa ampliado</span>
        </a>
      </div>

    </section>
  );
}