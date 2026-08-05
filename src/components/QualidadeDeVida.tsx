"use client";

import Image from "next/image";

const diferenciaisProduto = [
  "Condomínio fechado",
  "Portaria central com WC",
  "Acesso de pedestres com eclusa",
  "Sistema de monitoramento interno (CFTV)",
  "Portões automatizados",
  "Sensores de presença nas áreas comuns com iluminação em LED",
  "Sistema de interfonia",
  "13 vagas para visitantes",
];

export default function SecaoProduto() {
  return (
    <section id="produto-detalhes" className="w-full bg-[#f8fafc] py-16 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Lado Esquerdo: Textos e Diferenciais */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <Image 
              src="/img/logo2.png" 
              alt="Logo Ocean Park" 
              width={200} 
              height={70} 
              className="object-contain" 
            />
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#006184] font-josefinSans leading-tight mb-6">
            Conforto absoluto e lazer de clube, <br className="hidden sm:inline" />
            com segurança planejada.
          </h2>

          <ul className="space-y-3.5">
            {diferenciaisProduto.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="relative w-6 h-6 shrink-0 mt-0.5">
                  <Image 
                    src="/img/Conforto absoluto/concha.png" 
                    alt="Ícone Concha" 
                    fill 
                    className="object-contain" 
                  />
                </div>
                <span className="text-sm sm:text-base text-gray-800 font-medium">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Lado Direito: Fachada Imagem */}
        <div className="relative w-full h-[380px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="/img/Conforto absoluto/01.jpg"
            alt="Fachada Ocean Park Osasco"
            fill
            quality={100}
            className="object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 text-white text-center font-bold text-sm sm:text-base uppercase tracking-wider">
            FACHADA RESIDENCIAL
          </div>
        </div>

      </div>
    </section>
  );
}