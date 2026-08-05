"use client";

import Image from "next/image";

// Array tipado com as 4 imagens da galeria de Segurança e Comodidade
interface GalleryItem {
  src: string;
  alt: string;
}

const galleryImages: GalleryItem[] = [
  {
    src: "/img/delivery.jpg", // Substitua pelos caminhos reais das suas imagens na pasta public/img
    alt: "Central Delivery com armários inteligentes",
  },
  {
    src: "/img/portaria.jpg",
    alt: "Portaria Central com controle de acesso",
  },
  {
    src: "/img/lobby.jpg",
    alt: "Lobby de entrada com design moderno e acolhedor",
  },
  {
    src: "/img/mercado.jpg",
    alt: "Mini-mercado e conveniência para o dia a dia",
  },
];

export default function SecaoSegurancaComodidade() {
  return (
    <section id="seguranca" className="py-16 md:py-24 bg-white relative overflow-hidden">
      {/* Container Mestre Padronizado (1440px) */}
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* ================= CABEÇALHO FORMATADO ================= */}
        <div className="text-center mb-10 md:mb-14 w-full">
          <h2 className="text-2xl sm:text-3xl md:text-[32px] lg:text-[40px] uppercase tracking-tight leading-tight text-balance break-words mx-auto">
            <span className="font-bold text-[#4A137B]">
              SEGURANÇA E COMODIDADE{" "}
            </span>
            <span className="font-regular text-[#FFBA00] block sm:inline mt-1 sm:mt-0">
              PARA O SEU DIA A DIA.
            </span>
          </h2>
        </div>

        {/* ================= GALERIA (4 IMAGENS EM 2 COLUNAS) ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-gray-100 transition-transform duration-300 hover:scale-[1.01] bg-gray-100"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover block"
                priority={idx < 2} // Carrega as duas primeiras com prioridade
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}