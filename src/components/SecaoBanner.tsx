"use client";

import Image from "next/image";

export default function SecaoBanner() {
  return (
    /* Adicionadas as classes sm:h-screen, sm:flex, sm:items-center e sm:justify-center */
    <section id="Home" className="w-full relative overflow-hidden bg-[#80C3EC] sm:flex sm:items-center sm:justify-center">
      
      {/* 1. DESKTOP: FUNDO FULL WIDTH COM BLUR (Ocupa os 100vh) */}
      <div className="hidden sm:block absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <Image
          src="/img/Hero/hero_novo2.jpg"
          alt="Fundo Desfocado"
          fill
          quality={20}
          className="object-cover object-center blur-2xl scale-100 opacity-80"
        />
      </div>

      {/* 2. MOBILE: ESTRUTURA DEDICADA SEM SOBREPOSIÇÃO */}
      <div className="block sm:hidden w-full relative pt-28 pb-4">
        {/* Frase posicionada com folga abaixo do Header */}
        <div className="w-full px-4 text-center my-4 z-20 relative">
          <h1 className="text-base font-bold text-[#DD6810] font-josefinSans tracking-wider uppercase drop-shadow-sm">
            OPORTUNIDADE EM PADROEIRA / OSASCO
          </h1>
        </div>

        {/* Imagem Hero Mobile posicionada abaixo da frase */}
        <div className="w-full relative mt-3">
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
      </div>

      {/* 3. DESKTOP: BANNER CENTRALIZADO (Máx 1440px) */}
      <div className="hidden sm:block relative z-10 w-full max-w-[1440px] mx-auto overflow-hidden">
        
        {/* Título travado proporcionalmente na barra marrom da imagem */}
        <div className="absolute top-[21%] left-0 w-full px-6 text-center z-30 pointer-events-none -translate-y-1/2">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#ff7b00] font-josefinSans tracking-widest uppercase drop-shadow-md">
            OPORTUNIDADE EM PADROEIRA / OSASCO
          </h1>
        </div>

        {/* Imagem Banner Desktop (Max 1440px) */}
        <Image
          src="/img/Hero/hero_novo2.png"
          alt="Banner Ocean Park Osasco"
          width={1920}
          height={850}
          quality={100}
          className="w-full h-auto block object-contain relative z-10"
          priority
        />
      </div>

    </section>
  );
}