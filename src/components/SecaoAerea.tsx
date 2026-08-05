"use client";

import Image from "next/image";
import { Josefin_Slab } from "next/font/google";

// Importando e configurando a fonte Josefin Slab
const josefinSlab = Josefin_Slab({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function SecaoAerea() {
  return (
    <section id="vista-aerea" className="w-full bg-white py-12 md:py-16 relative overflow-hidden">
      
      {/* Container Principal Limitado a 1440px */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12">
        
        {/* Título com a fonte Josefin Slab aplicada via Next.js Font */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#DD6810] leading-snug ${josefinSlab.className}`}>
            Mobilidade e praticidade <br className="sm:hidden" />
            que transformam o seu dia a dia.
          </h2>
        </div>

        {/* Imagem Desktop (Fluid Aspect Ratio para evitar cortes) */}
        <div className="hidden md:block w-full">
          <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-gray-100">
            <Image
              src="/img/Vista Aerea/aerea-desktop.jpg"
              alt="Vista Aérea Ocean Park Osasco"
              fill
              quality={100}
              className="object-cover object-center"
              sizes="(max-width: 1440px) 100vw, 1440px"
              priority
            />
          </div>
        </div>

        {/* Imagem Mobile */}
        <div className="block md:hidden w-full">
          <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-xl border border-gray-100">
            <Image
              src="/img/Vista Aerea/aerea-mobile.jpg"
              alt="Vista Aérea Ocean Park Osasco Mobile"
              fill
              quality={100}
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
        </div>

      </div>
    </section>
  );
}