"use client";

import Image from "next/image";

export default function SecaoBanner() {
  return (
    <section id="Home" className="w-full pt-28 pb-0 relative overflow-hidden">
      
      {/* Título Principal */}
      <div className="w-full px-6 text-center pt-4 pb-4 relative z-10">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#DD6810] font-josefinSans tracking-widest uppercase">
          LANÇAMENTO • PADROEIRA / OSASCO
        </h1>
      </div>

      {/* Área do Banner */}
      <div className="relative w-full flex items-center justify-center overflow-hidden">
        
        {/* Fundo Full Width com Blur para telas maiores que 1440px */}
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <div className="hidden sm:block absolute inset-0 w-full h-full">
            <Image
              src="/img/Hero/01.jpg"
              alt="Fundo Desfocado"
              fill
              quality={20}
              className="object-cover object-center blur-2xl scale-110 opacity-50"
            />
          </div>
          <div className="block sm:hidden absolute inset-0 w-full h-full">
            <Image
              src="/img/Hero/01mobile.jpg"
              alt="Fundo Desfocado Mobile"
              fill
              quality={20}
              className="object-cover object-center blur-2xl scale-110 opacity-50"
            />
          </div>
        </div>

        {/* Container Principal Limitado a 1440px com Altura Expandida */}
        <div className="relative z-10 w-full max-w-[1440px] mx-auto h-[450px] sm:h-[600px] md:h-[720px] lg:h-[820px] xl:h-[880px]">
          
          {/* Placa Lançamento Sobreposta */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-48 sm:w-64 md:w-72 h-20 sm:h-28">
            <Image 
              src="/img/Hero/placa1.png" 
              alt="Placa Lançamento" 
              fill 
              className="object-contain drop-shadow-xl" 
            />
          </div>

          {/* Imagem Desktop Expandida até 1440px */}
          <div className="hidden sm:block w-full h-full relative">
            <Image
              src="/img/Hero/hero_novo.jpg"
              alt="Banner Ocean Park Osasco"
              fill
              quality={100}
              className="object-contain object-center rounded-none"
              priority
            />
          </div>

          {/* Imagem Mobile */}
          <div className="block sm:hidden w-full h-full relative">
            <Image
              src="/img/Hero/01mobile.jpg"
              alt="Banner Ocean Park Osasco Mobile"
              fill
              quality={100}
              className="object-cover object-center rounded-none"
              priority
            />
          </div>

          {/* Badge Minha Casa Minha Vida Sobreposta */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-44 sm:w-56 h-16 sm:h-20">
            <Image 
              src="/img/Hero/mcmv.png" 
              alt="Programa Minha Casa Minha Vida" 
              fill 
              className="object-contain drop-shadow-lg" 
            />
          </div>

        </div>

      </div>
    </section>
  );
}