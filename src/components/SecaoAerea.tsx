"use client";

import Image from "next/image";

export default function SecaoAerea() {
  return (
    <section id="vista-aerea" className="w-full bg-white py-12 relative overflow-hidden">
      
      {/* Título */}
      <div className="max-w-[1440px] mx-auto px-6 text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#DD6810] font-josefinSlab leading-snug">
          Mobilidade e praticidade <br className="sm:hidden" />
          que transformam o seu dia a dia.
        </h2>
      </div>

      {/* Imagem Desktop */}
      <div className="hidden md:block w-full max-w-[1440px] mx-auto px-6">
        <div className="relative w-full h-[500px] lg:h-[650px] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src="/img/Vista Aerea/aerea-desktop.jpg"
            alt="Vista Aérea Ocean Park Osasco"
            fill
            quality={100}
            className="object-cover"
          />
        </div>
      </div>

      {/* Imagem Mobile */}
      <div className="block md:hidden w-full px-4">
        <div className="relative w-full h-[380px] rounded-2xl overflow-hidden shadow-xl">
          <Image
            src="/img/Vista Aerea/aerea-mobile.jpg"
            alt="Vista Aérea Ocean Park Osasco Mobile"
            fill
            quality={100}
            className="object-cover"
          />
        </div>
      </div>

    </section>
  );
}