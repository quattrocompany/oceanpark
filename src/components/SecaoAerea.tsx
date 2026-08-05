"use client";

import Image from "next/image";

export default function SecaoAerea() {
  return (
    <section id="vista-aerea" className="w-full bg-white pt-10 md:pt-14 pb-0 relative overflow-hidden">
      
      {/* 1. FUNDO BLURRED (Full Width) */}
      <div className="hidden md:block absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <Image
          src="/img/Vista Aerea/aerea-desktop.jpg"
          alt="Fundo Desfocado Vista Aérea"
          fill
          quality={20}
          className="object-cover object-center blur-2xl scale-110 opacity-70"
        />
      </div>

      {/* 2. ELEMENTO FOLHA NA LATERAL ESQUERDA */}
      <div className="absolute top-0 left-0 z-20 w-20 sm:w-28 md:w-36 lg:w-44 xl:w-52 pointer-events-none">
        <Image
          src="/img/Vista Aerea/folha-esquerda.png" 
          alt="Folha Decorativa"
          width={300}
          height={300}
          className="w-full h-auto object-contain object-top-left"
        />
      </div>

      {/* 3. CONTEÚDO CENTRALIZADO NOS 1440PX */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Título Aumentado no Mobile com Quebra de Linha em "transformam" */}
        <div className="text-center mb-6 md:mb-8 px-2">
          <h2 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#DD6810] font-[family-name:var(--font-josefin-slab)] leading-tight">
            Mobilidade e praticidade que transformam 
            o seu dia a dia.
          </h2>
        </div>

        {/* Imagem Desktop Integrada em Proporção Original */}
        <div className="hidden md:block w-full">
          <Image
            src="/img/Vista Aerea/aerea-desktop.jpg"
            alt="Vista Aérea Ocean Park Osasco"
            width={1440}
            height={810}
            quality={100}
            className="w-full h-auto block rounded-t-xl shadow-2xl border border-white/20"
            priority
          />
        </div>

        {/* Imagem Mobile Integrada em Proporção Original */}
        <div className="block md:hidden w-full">
          <Image
            src="/img/Vista Aerea/aerea-mobile.jpg"
            alt="Vista Aérea Ocean Park Osasco Mobile"
            width={800}
            height={1000}
            quality={100}
            className="w-full h-auto block rounded-t-xl shadow-xl"
            priority
          />
        </div>

      </div>

    </section>
  );
}