"use client";

import Image from "next/image";

export default function SecaoMobilidadeUrbana() {
  return (
    <section id="localizacao" className="w-full bg-[#0A81A1] text-white py-16 relative">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 text-center mb-12">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-josefinSlab uppercase leading-tight tracking-wide">
          A EXCELENTE LOCALIZAÇÃO DO OCEAN PARK É UM CONVITE <br className="hidden sm:inline" />
          PARA UMA VIDA LEVE, PRÁTICA E CHEIA DE POSSIBILIDADES.
        </h2>
      </div>

      {/* Imagem Ilustrativa de Localização */}
      <div className="max-w-[1440px] mx-auto px-6 mb-12">
        <div className="relative w-full h-[300px] sm:h-[450px] rounded-3xl overflow-hidden shadow-2xl">
          <Image 
            src="/img/polvopraia.jpg" 
            alt="Localização Ocean Park" 
            fill 
            className="object-cover" 
          />
        </div>
      </div>

      {/* Faixa / Banners de Plantão e Visita aos Decorados */}
      <div className="w-full bg-[#DE6810] py-10 px-6 my-8">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
          
          <div className="flex-1 space-y-4">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-black font-josefinSans text-white uppercase tracking-tight">
              VISITE DECORADOS
            </h3>
            
            <p className="text-xl sm:text-2xl font-bold">
              <a 
                href="https://www.google.com.br/maps/dir//Av.+Novo+Osasco,+1010+-+Bussocaba,+Osasco+-+SP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline transition-all"
              >
                Plantão de vendas: Av. Novo Osasco, 1010
              </a>
            </p>

            <p className="text-xs sm:text-sm font-semibold uppercase opacity-90">
              <a 
                href="https://www.google.com.br/maps/dir//R.+Achiles+Beline,+616+-+Padroeira,+Osasco+-+SP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline transition-all"
              >
                O EMPREENDIMENTO LOCALIZA-SE NA RUA AQUILES BELINE, 616 - PADROEIRA / OSASCO.
              </a>
            </p>
          </div>

          <div className="relative w-48 h-24 shrink-0">
            <Image 
              src="/img/Visite/mcmv-plantas.png" 
              alt="Minha Casa Minha Vida" 
              fill 
              className="object-contain" 
            />
          </div>

        </div>
      </div>

      {/* Google Maps Embed */}
      <div className="w-full h-[400px] relative shadow-inner my-8">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3547.512782712201!2d-46.79176892470415!3d-23.567247061808462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce557edec747bf%3A0xb3ce498eed915209!2sAv.%20Novo%20Osasco%2C%201010%20-%20Bussocaba%2C%20Osasco%20-%20SP%2C%2006056-000!5e1!3m2!1spt-BR!2sbr!4v1769616169975!5m2!1spt-BR!2sbr" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Mapa Plantão de Vendas Ocean Park"
        />
      </div>

      {/* Botões de Acesso Rápido ao Mapa */}
      <div className="max-w-[1440px] mx-auto px-6 flex flex-col sm:flex-row justify-center items-center gap-4 -mt-12 relative z-10">
        <a 
          href="https://www.waze.com/pt-BR/live-map/directions/br/sp/av.-novo-osasco,-1010?to=place.ChIJv0fH3n5VzpQRCVKR7Y5JzrM" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-[#0099FF] text-white hover:bg-[#0088EE] font-bold px-8 py-3.5 rounded-full border-2 border-white shadow-xl flex items-center gap-3 transition-all transform hover:scale-105 text-sm"
        >
          <Image src="/img/Localizacao/ico-waze.gif" alt="Waze" width={24} height={24} />
          <span>Veja pelo Waze</span>
        </a>

        <a 
          href="https://www.google.com/maps?ll=-23.567252,-46.789194&z=16&t=h&hl=pt-BR&gl=BR&mapclient=embed&q=Av.+Novo+Osasco,+1010+-+Bussocaba+Osasco+-+SP+06056-000" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-3.5 rounded-full border-2 border-[#0099FF] shadow-xl flex items-center gap-3 transition-all transform hover:scale-105 text-sm"
        >
          <Image src="/img/Localizacao/ico-mapa.gif" alt="Mapa" width={24} height={24} />
          <span>Ver mapa ampliado</span>
        </a>
      </div>

    </section>
  );
}