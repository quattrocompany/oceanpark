"use client";

import Image from "next/image";

export default function SecaoBanner() {
  return (
    <section id="Home" className="w-full bg-white pt-24 pb-12 relative overflow-hidden">
      
      {/* Título Principal */}
      <div className="max-w-[1440px] mx-auto px-6 text-center pt-8 pb-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#DD6810] font-josefinSans tracking-widest uppercase">
          EMPREENDIMENTO EM PADROEIRA / OSASCO
        </h1>
      </div>

      {/* Imagem Principal do Hero */}
      <div className="relative w-full max-w-[1440px] mx-auto min-h-[400px] sm:min-h-[550px] md:min-h-[650px] flex items-center justify-center">
        
        {/* Placa Lançamento Sobreposta */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 w-48 sm:w-64 md:w-72 h-20 sm:h-28">
          <Image 
            src="/img/Hero/placa1.png" 
            alt="Placa Lançamento" 
            fill 
            className="object-contain drop-shadow-xl" 
          />
        </div>

        {/* Imagem Desktop */}
        <div className="hidden sm:block w-full h-[550px] md:h-[650px] relative">
          <Image
            src="/img/Hero/hero.jpg"
            alt="Banner Ocean Park Osasco"
            fill
            quality={100}
            className="object-cover rounded-3xl"
            priority
          />
        </div>

        {/* Imagem Mobile */}
        <div className="block sm:hidden w-full h-[420px] relative">
          <Image
            src="/img/Hero/01mobile.jpg"
            alt="Banner Ocean Park Osasco Mobile"
            fill
            quality={100}
            className="object-cover rounded-2xl"
            priority
          />
        </div>

        {/* Badge Minha Casa Minha Vida Sobreposta */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-40 sm:w-52 h-16 sm:h-20">
          <Image 
            src="/img/Hero/mcmv.png" 
            alt="Programa Minha Casa Minha Vida" 
            fill 
            className="object-contain drop-shadow-lg" 
          />
        </div>

      </div>
    </section>
  );
}