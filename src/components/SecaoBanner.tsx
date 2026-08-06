"use client";

import Image from "next/image";

export default function SecaoBanner() {
  return (
    <section id="Home" className="w-full relative flex flex-col items-center">
      
      {/* 1. FAIXA SUPERIOR AZUL (Subposição do Header + Frase) */}
      <div className="w-full bg-[#89c8ea] pt-28 sm:pt-32 pb-4 sm:pb-26 relative z-20 text-center shadow-md">
        <div className="max-w-[1440px] mx-auto px-4">
          <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#10365c] font-[family-name:var(--font-josefin-slab)] tracking-widest uppercase drop-shadow-sm">
            OPORTUNIDADE EM PADROEIRA / OSASCO
          </h1>
        </div>
      </div>

      {/* 2. ÁREA DOS BANNERS (Abaixo da faixa azul) */}
      <div className="w-full relative flex flex-col items-center justify-center">
        
        {/* MOBILE: Banner sequencial */}
        <div className="block sm:hidden w-full relative">
          <Image
            src="/img/Hero/01mobile.jpg"
            alt="Banner Ocean Park Osasco Mobile"
            width={800}
            height={1000}
            sizes="100vw"
            quality={100}
            className="w-full h-auto block object-cover"
            priority
          />
        </div>

        {/* DESKTOP: Banner centralizado com fundo azul desfocado */}
        <div className="hidden sm:flex relative w-full overflow-hidden bg-[#80C3EC] justify-center">
          
          {/* Fundo Full Width com Blur */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
            <Image
              src="/img/Hero/hero_novo2.jpg"
              alt="Fundo Desfocado"
              fill
              quality={20}
              className="object-cover object-center blur-2xl scale-100 opacity-80"
            />
          </div>

          {/* Banner Desktop Centralizado (Máx 1440px) */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto">
            <Image
              src="/img/Hero/hero_novo3.png"
              alt="Banner Ocean Park Osasco"
              width={1920}
              height={850}
              quality={100}
              className="w-full h-auto block object-contain relative z-10"
              priority
            />
          </div>

        </div>

      </div>

    </section>
  );
}