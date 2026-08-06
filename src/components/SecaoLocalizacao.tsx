"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function SecaoLocalizacao() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const locais = [
    { name: "PRONTO SOCORRO DR. CONRRADO C. NUVOLINI", src: "/img/Localizacao/PRONTO SOCORRO DR. CONRRADO C. NUVOLINI.jpg" },
    { name: "PONTE METÁLICA", src: "/img/Localizacao/ponte-metalica.jpg" },
    { name: "BARBOSA SUPERMERCADOS", src: "/img/Localizacao/BARBOSA SUPERMERCADOS.jpg" },
    { name: "ATACADÃO", src: "/img/Localizacao/ATACADÃO.jpg" },
    { name: "BRADESCO – CIDADE DE DEUS", src: "/img/Localizacao/BRADESCO – CIDADE DE DEUS.jpg" },
    { name: "CARREFOUR", src: "/img/Localizacao/CARREFOUR.jpg" },
    { name: "CEU JOSÉ SARAMAGO", src: "/img/Localizacao/CEU JOSÉ SARAMAGO.jpg" },
    { name: "CONTINENTAL SHOPPING", src: "/img/Localizacao/CONTINENTAL SHOPPING.jpg" },
    { name: "EMEF BENEDITO ALVES TURIBIO", src: "/img/Localizacao/EMEF BENEDITO ALVES TURIBIO.jpg" },
    { name: "ESCOLA ESTADUAL TARSILA DO AMARAL", src: "/img/Localizacao/ESCOLA ESTADUAL TARSILA DO AMARAL.jpg" },
    { name: "ESTAÇÃO CPTM • COMANDANTE SAMPAIO", src: "/img/Localizacao/ESTAÇÃO CPTM • COMANDANTE SAMPAIO.jpg" },
    { name: "FACULDADE DE OSASCO - UNIESP S.A.", src: "/img/Localizacao/FACULDADE DE OSASCO - UNIESP S.A..jpg" },
    { name: "LOPES SUPERMERCADOS", src: "/img/Localizacao/LOPES SUPERMERCADOS.jpg" },
    { name: "SAM´S CLUB", src: "/img/Localizacao/SAM´S CLUB.jpg" },
    { name: "SHOPPING UNIÃO", src: "/img/Localizacao/SHOPPING UNIÃO.jpg" },
    { name: "SUPERMERCADO ROSSI", src: "/img/Localizacao/SUPERMERCADO ROSSI.jpg" },
    { name: "SUPERSHOPPING OSASCO", src: "/img/Localizacao/SUPERSHOPPING OSASCO.jpg" },
    { name: "UBS GETULINO JOSÉ DIAS", src: "/img/Localizacao/UBS GETULINO JOSÉ DIAS.jpg" },
  ];

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? locais.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === locais.length - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const getItem = (offset: number) => {
    return locais[(currentIndex + offset) % locais.length];
  };

  const handleOpenWhatsapp = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("openWhatsAppModal"));
    }
  };

  return (
    <section id="localizacao" className="w-full bg-[#0C82A0] text-white pt-12 md:pt-16 relative overflow-hidden">
      
      {/* 1. TÍTULO OFICIAL DA SEÇÃO */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-12 text-center mb-8 sm:mb-12">
        <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold font-[family-name:var(--font-josefin-slab)] leading-snug sm:leading-tight">
          A excelente localização do Ocean Park é um convite <br className="hidden sm:inline" />
          para uma vida leve, prática e cheia de possibilidades.
        </h2>
      </div>

      {/* 2. CARROSSEL DE LOCALIZAÇÃO */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 relative z-10 mb-8">
        
        {/* Seta Esquerda Laranja */}
        <button
          onClick={prevSlide}
          aria-label="Anterior"
          className="absolute left-1 sm:left-4 top-[38%] -translate-y-1/2 bg-[#DD6810] hover:bg-[#c45a0d] text-white p-2.5 sm:p-3 rounded-full shadow-lg transition-all z-20 focus:outline-none cursor-pointer"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Grid do Carrossel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="flex flex-col items-center">
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-lg border-2 border-white/20 bg-black/10">
              <Image
                src={getItem(0).src}
                alt={getItem(0).name}
                fill
                quality={90}
                className="object-cover object-center"
              />
            </div>
            <p className="mt-3 text-xs sm:text-sm font-bold uppercase text-center tracking-wider text-white px-2 min-h-[40px] flex items-center justify-center">
              {getItem(0).name}
            </p>
          </div>

          {/* Card 2 (Desktop) */}
          <div className="hidden md:flex flex-col items-center">
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-lg border-2 border-white/20 bg-black/10">
              <Image
                src={getItem(1).src}
                alt={getItem(1).name}
                fill
                quality={90}
                className="object-cover object-center"
              />
            </div>
            <p className="mt-3 text-xs sm:text-sm font-bold uppercase text-center tracking-wider text-white px-2 min-h-[40px] flex items-center justify-center">
              {getItem(1).name}
            </p>
          </div>

          {/* Card 3 (Desktop) */}
          <div className="hidden md:flex flex-col items-center">
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden shadow-lg border-2 border-white/20 bg-black/10">
              <Image
                src={getItem(2).src}
                alt={getItem(2).name}
                fill
                quality={90}
                className="object-cover object-center"
              />
            </div>
            <p className="mt-3 text-xs sm:text-sm font-bold uppercase text-center tracking-wider text-white px-2 min-h-[40px] flex items-center justify-center">
              {getItem(2).name}
            </p>
          </div>

        </div>

        {/* Seta Direita Laranja */}
        <button
          onClick={nextSlide}
          aria-label="Próximo"
          className="absolute right-1 sm:right-4 top-[38%] -translate-y-1/2 bg-[#DD6810] hover:bg-[#c45a0d] text-white p-2.5 sm:p-3 rounded-full shadow-lg transition-all z-20 focus:outline-none cursor-pointer"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Bolinhas Indicadoras (Dots) */}
        <div className="flex justify-center items-center gap-2 mt-6">
          {locais.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? "w-6 bg-[#DD6810]" : "w-2.5 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Ir para a foto ${idx + 1}`}
            />
          ))}
        </div>

      </div>

      {/* 3. ELEMENTO ILUSTRATIVO POLVO NA PRAIA */}
      <div className="w-full relative leading-none z-0">
        <div className="hidden sm:block w-full">
          <Image 
            src="/img/Localizacao/polvopraia.jpg" 
            alt="Ilustração Ocean Park Praia" 
            width={1920}
            height={400}
            quality={100}
            className="w-full h-auto block object-cover" 
          />
        </div>
        <div className="block sm:hidden w-full">
          <Image 
            src="/img/Localizacao/polvopraia-mobile.jpg" 
            alt="Ilustração Ocean Park Praia Mobile" 
            width={768}
            height={350}
            quality={100}
            className="w-full h-auto block object-cover" 
          />
        </div>
      </div>

      {/* 4. FAIXA DE VISITA AOS DECORADOS E PLANTÃO */}
      <div className="w-full bg-[#DE6810] relative z-10 text-white py-8 sm:py-12 px-6 lg:px-12">
        <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center relative">
          
          <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4 md:space-y-6 z-20 w-full sm:px-12 md:px-64">
            
            <h3 className="text-3xl sm:text-5xl lg:text-7xl font-black font-[family-name:var(--font-josefin-slab)] uppercase tracking-tight">
              Visite Decorados
            </h3>
            
            <p className="text-base sm:text-2xl lg:text-4xl font-bold">
              <a 
                href="https://www.google.com.br/maps/dir//Av.+Novo+Osasco,+1010+-+Bussocaba,+Osasco+-+SP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline transition-all"
              >
                Plantão de vendas: Av. Novo Osasco, 1010
              </a>
            </p>

            <p className="text-xs sm:text-base lg:text-xl font-medium opacity-95">
              <a 
                href="https://www.google.com.br/maps/dir//R.+Achiles+Beline,+616+-+Padroeira,+Osasco+-+SP" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline transition-all"
              >
                O empreendimento localiza-se na Rua Aquiles Beline, 616 - Padroeira / Osasco.
              </a>
            </p>

          </div>



        </div>
      </div>

      {/* 5. GOOGLE MAPS EMBED (Com ID para ancoragem do rodapé) */}
      <div id="mapa" className="w-full h-[350px] sm:h-[400px] relative shadow-inner bg-gray-200 z-10">
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

      {/* 6. BOTÕES WAZE E MAPA */}
      <div className="max-w-[1440px] mx-auto px-6 flex flex-col sm:flex-row justify-center items-center gap-4 -mt-12 pb-10 relative z-20">
        <a 
          href="https://www.waze.com/pt-BR/live-map/directions/br/sp/av.-novo-osasco,-1010?to=place.ChIJv0fH3n5VzpQRCVKR7Y5JzrM" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-[#0099FF] text-white hover:bg-[#0088EE] font-bold px-8 py-3.5 rounded-full border-2 border-white shadow-xl flex items-center gap-3 transition-all transform hover:scale-105 text-sm"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.029 20.308c-1.528 0-3.003-.393-4.298-1.127l-5.467 1.48a1.002 1.002 0 0 1-1.242-1.229l1.458-5.263A9.972 9.972 0 0 1 1.25 9.914c0-5.474 4.836-9.914 10.779-9.914 5.942 0 10.779 4.44 10.779 9.914 0 5.475-4.837 9.914-10.779 9.914v.48h0z" fill="#FFF"/>
            <path d="M7.742 11.23a1.455 1.455 0 1 0 0-2.909 1.455 1.455 0 0 0 0 2.91zm8.574 0a1.455 1.455 0 1 0 0-2.909 1.455 1.455 0 0 0 0 2.91zM8.36 14.18c.95 1.157 2.404 1.874 4 1.874 1.597 0 3.05-.717 4-1.874a.885.885 0 0 0-1.378-1.118c-.628.765-1.59 1.238-2.622 1.238s-1.993-.473-2.622-1.238A.885.885 0 0 0 8.36 14.18z" fill="#0099FF"/>
          </svg>
          <span>Veja pelo Waze</span>
        </a>

        <a 
          href="https://www.google.com/maps?ll=-23.567252,-46.789194&z=16&t=h&hl=pt-BR&gl=BR&mapclient=embed&q=Av.+Novo+Osasco,+1010+-+Bussocaba+Osasco+-+SP+06056-000" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="bg-white text-gray-900 hover:bg-gray-100 font-bold px-8 py-3.5 rounded-full border-2 border-[#0099FF] shadow-xl flex items-center gap-3 transition-all transform hover:scale-105 text-sm"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" fill="#EA4335"/>
            <path d="M12 11.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" fill="#B31412"/>
          </svg>
          <span>Ver mapa ampliado</span>
        </a>
      </div>

      {/* 7. CONTATO WHATSAPP */}
      <div className="w-full bg-white py-10 md:py-14 flex items-center justify-center relative z-20 border-b border-gray-100">
        <button
          onClick={handleOpenWhatsapp}
          className="flex items-center justify-center gap-3 sm:gap-5 group cursor-pointer hover:scale-105 transition-transform focus:outline-none"
          aria-label="Abrir Atendimento WhatsApp"
        >
          <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 shrink-0">
            <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-[#25D366] drop-shadow-sm">
              <path
                fill="currentColor"
                d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.931.547 3.743 1.516 5.334L2 22l4.781-1.469a10.02 10.02 0 005.25 1.485c5.535 0 10.031-4.496 10.031-10.031S17.566 2 12.031 2zm0 18.375c-1.634 0-3.188-.415-4.571-1.2l-.328-.188-3.398 1.047 1.062-3.328-.219-.344a8.381 8.381 0 01-1.328-4.516c0-4.634 3.772-8.406 8.406-8.406 4.635 0 8.407 3.772 8.407 8.406s-3.772 8.406-8.407 8.406zm4.61-6.313c-.25-.125-1.484-.734-1.719-.812-.234-.078-.406-.125-.578.125-.172.25-.656.812-.812.984-.156.172-.312.188-.562.063-.25-.125-1.059-.39-2.019-1.246-.747-.669-1.254-1.494-1.406-1.744-.153-.25-.016-.385.109-.509.112-.112.25-.297.375-.447.125-.15.172-.25.25-.422.078-.172.039-.328-.023-.453-.063-.125-.578-1.391-.797-1.906-.211-.502-.422-.434-.578-.442l-.485-.008c-.172 0-.453.063-.688.313-.234.25-.891.875-.891 2.125s.914 2.453 1.047 2.625c.125.172 1.781 2.719 4.313 3.813.601.258 1.07.412 1.437.528.604.192 1.156.164 1.593.1.487-.072 1.484-.606 1.688-1.194.203-.588.203-1.094.14-1.194-.062-.1-.234-.156-.484-.281z"
              />
            </svg>
          </div>

          <span className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-[#0C82A0] tracking-tight group-hover:text-[#DD6810] transition-colors">
            98856.8852
          </span>
        </button>
      </div>

    </section>
  );
}