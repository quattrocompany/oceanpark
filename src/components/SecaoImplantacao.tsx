"use client";

import Image from "next/image";

// Pavimento Térreo (1 ao 18)
const terreoItems = [
  { num: 1, text: "EMBARQUE E DESEMBARQUE" },
  { num: 2, text: "ACESSO DE VEÍCULOS" },
  { num: 3, text: "ACESSO DE PEDESTRES" },
  { num: 4, text: "PORTARIA CENTRAL C/ W.C." },
  { num: 5, text: "MINI MERCADO" },
  { num: 6, text: "HALL SOCIAL" },
  { num: 7, text: "ESPAÇO DELIVERY" },
  { num: 8, text: "VAGAS P/ VISITANTES" },
  { num: 9, text: "PRAÇA ZEN" },
  { num: 10, text: "REDÁRIO" },
  { num: 11, text: "PRAÇA DO FOGO" },
  { num: 12, text: "PRAÇA BOULEVARD" },
  { num: 13, text: "ESPAÇO GRILL" },
  { num: 14, text: "PLAYGROUND" },
  { num: 15, text: "PET PLACE" },
  { num: 16, text: "PLAY BABY" },
  { num: 17, text: "JARDINS" },
  { num: 18, text: "HALL DE ELEVADORES" },
];

// 1º Subsolo (18 ao 40)
const subsoloItems = [
  { num: 18, text: "HALL DE ELEVADORES" },
  { num: 19, text: "VAGAS" },
  { num: 20, text: "QUADRA ESPORTIVA" },
  { num: 21, text: "FITNESS" },
  { num: 22, text: "ÁREA DE DESCANSO BEACH TENNIS" },
  { num: 23, text: "BEACH TENNIS" },
  { num: 24, text: "SOLÁRIO" },
  { num: 25, text: "PISCINA ADULTO COM PRAIA" },
  { num: 26, text: "SPA" },
  { num: 27, text: "PISCINA INFANTIL C/ BRINQUEDOS D'ÁGUA" },
  { num: 28, text: "SALÃO DE FESTAS INFANTIL" },
  { num: 29, text: "ÁREA DE APOIO (FESTAS INFANTIL)" },
  { num: 30, text: "LOBBY (FESTAS INFANTIL)" },
  { num: 31, text: "WCS" },
  { num: 32, text: "BRINQUEDOTECA" },
  { num: 33, text: "PRAÇA" },
  { num: 34, text: "SALÃO DE FESTAS ADULTO" },
  { num: 35, text: "ÁREA DE APOIO (FESTAS ADULTO)" },
  { num: 36, text: "LOBBY (FESTAS ADULTO)" },
  { num: 37, text: "COWORKING" },
  { num: 38, text: "PRAÇA DE LEITURA SOB PÉRGOLAS" },
  { num: 39, text: "PRAÇA DE CONTEMPLAÇÃO" },
  { num: 40, text: "JARDINS" },
];

export default function SecaoImplantacao() {
  return (
    <section id="implantacao" className="bg-white relative overflow-hidden py-12 lg:py-16">
      
      {/* Cabeçalho */}
      <div className="max-w-[1440px] mx-auto px-6 text-center mb-10">
        <div className="inline-block mb-4">
          <Image src="/img/logo2.png" alt="Ocean Park Logo" width={220} height={80} className="object-contain mx-auto" />
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#006184] font-josefinSlab uppercase leading-tight">
          Planejado para oferecer <br className="hidden sm:inline" />
          <span className="text-[#DD6810]">O QUE A VIDA TEM DE MELHOR.</span>
        </h2>
      </div>

      <div className="max-w-[1920px] mx-auto flex flex-col lg:flex-row items-stretch">
        
        {/* Imagem da Implantação (Esquerda no Desktop) */}
        <div className="w-full lg:w-[60%] px-4 sm:px-8 flex items-center justify-center">
          <a 
            href="/img/Implantacao/01.png" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="relative w-full h-[350px] sm:h-[500px] lg:h-[700px] block cursor-zoom-in"
            aria-label="Ampliar Implantação"
          >
            <Image
              src="/img/Implantacao/01.png"
              alt="Planta de Implantação Ocean Park Osasco"
              fill
              quality={100}
              className="object-contain"
              priority
            />
          </a>
        </div>

        {/* Lista da Implantação Dividida em Térreo e Subsolo (Direita) */}
        <div className="w-full lg:w-[40%] flex flex-col justify-center p-6 sm:p-10 z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 text-[11px] sm:text-[12px] font-semibold text-gray-800">
            
            {/* Pavimento Térreo */}
            <div>
              <h3 className="text-[#006184] font-bold text-sm sm:text-base mb-3 border-b border-[#006184] pb-1 uppercase">
                PAVIMENTO TÉRREO
              </h3>
              <ul className="space-y-1.5">
                {terreoItems.map((item) => (
                  <li key={`t-${item.num}-${item.text}`} className="flex items-start leading-tight">
                    <span className="w-5 h-5 rounded-full bg-[#006184] text-white flex items-center justify-center text-[9px] font-bold shrink-0 mr-2">
                      {item.num}
                    </span>
                    <span className="flex-1 self-center">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 1º Subsolo */}
            <div>
              <h3 className="text-[#DD6810] font-bold text-sm sm:text-base mb-3 border-b border-[#DD6810] pb-1 uppercase">
                1º SUBSOLO
              </h3>
              <ul className="space-y-1.5">
                {subsoloItems.map((item) => (
                  <li key={`s-${item.num}-${item.text}`} className="flex items-start leading-tight">
                    <span className="w-5 h-5 rounded-full bg-[#DD6810] text-white flex items-center justify-center text-[9px] font-bold shrink-0 mr-2">
                      {item.num}
                    </span>
                    <span className="flex-1 self-center">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}