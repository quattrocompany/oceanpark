"use client";

import { useState } from "react";
import Image from "next/image";

const galeriaImagens = [
  { src: "/img/Mobilidade e Praticidade/01.jpg", title: "Fachada", data: "2026-08-07" },
  { src: "/img/Mobilidade e Praticidade/02.jpg", title: "Portaria Central", data: "2026-08-07" },
  { src: "/img/Mobilidade e Praticidade/14.jpg", title: "Piscina Adulto", data: "2026-08-07" },
  { src: "/img/Mobilidade e Praticidade/06.jpg", title: "Espaço Grill", data: "2026-08-07" },
  { src: "/img/Mobilidade e Praticidade/11.jpg", title: "Quadra Esportiva", data: "2026-08-01" },
  { src: "/img/Mobilidade e Praticidade/19.jpg", title: "Salão de Festas", data: "2026-08-01" },
  { src: "/img/Mobilidade e Praticidade/20.jpg", title: "Coworking", data: "2026-08-01" },
  { src: "/img/Mobilidade e Praticidade/16.jpg", title: "Solário e Spa", data: "2026-08-01" },
];

export default function KitCorretorPage() {
  const [dataFiltro, setDataFiltro] = useState<string>("2026-08-07");

  const imagensExibidas = galeriaImagens.filter((img) => {
    if (dataFiltro === "todas") return true;
    return img.data === dataFiltro;
  });

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      
      <div>
        {/* TESTEIRA / BANNER SUPERIOR */}
        <div className="w-full relative z-10 pt-20 sm:pt-0 bg-[#0C82A0]">
          <div className="relative w-full max-w-[1920px] mx-auto">
            <Image
              src="/img/Hero/hero_novo3.png"
              alt="Kit Corretor Ocean Park"
              width={1920}
              height={350}
              quality={100}
              className="w-full h-auto block object-cover"
              priority
            />
          </div>
        </div>

        {/* CONTEÚDO PRINCIPAL */}
        <div className="max-w-[1200px] mx-auto px-6 py-12">
          
  
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-black text-[#0C82A0] font-[family-name:var(--font-josefin-slab)] uppercase tracking-tight mb-4">
              Kit do Corretor
            </h1>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Reunimos todo o conteúdo de apoio em um só lugar para você ter sempre à mão. Use sem moderação!
            </p>
          </div>
        {/* BOTÃO DE DOWNLOAD TOTAL DE DESTAQUE NO TOPO */}
          <div className="mb-10 text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left">
              <span className="bg-[#0C82A0]/10 text-[#0C82A0] text-xs font-bold uppercase px-3 py-1 rounded-full">
                Download Completo
              </span>
              <h2 className="text-xl md:text-2xl font-black text-gray-800 mt-2">
                Baixar Todo o Kit de Vendas
              </h2>
              <p className="text-xs text-gray-500">Inclui todas as imagens HD, lâmina comercial e vídeos em 1 só arquivo.</p>
            </div>
            
            <a
              href="/img/Mobilidade e Praticidade/01.jpg"
              download
              className="w-full sm:w-auto bg-[#DD6810] hover:bg-[#c45a0d] text-white font-black py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer whitespace-nowrap"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Baixar Kit Completo (.ZIP)
            </a>
          </div>

          {/* 1. BOXES DE DOWNLOADS SEPARADOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#0C82A0]/10 text-[#0C82A0] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Imagens e Perspectivas</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">Renders em alta resolução da fachada, lazer e decorado.</p>
              <button className="w-full bg-[#DD6810] text-white font-bold py-3 rounded-full hover:bg-[#c45a0d] transition-colors text-sm cursor-pointer">
                Baixar Pacote (.ZIP)
              </button>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#0C82A0]/10 text-[#0C82A0] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Lâmina e Plantas</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">Apresentação comercial e todas as plantas baixas cotadas.</p>
              <button className="w-full bg-[#DD6810] text-white font-bold py-3 rounded-full hover:bg-[#c45a0d] transition-colors text-sm cursor-pointer">
                Baixar Caderno (.PDF)
              </button>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#0C82A0]/10 text-[#0C82A0] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Vídeos e Reels</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">Vídeos promocionais prontos para postar no Instagram e WhatsApp.</p>
              <button className="w-full bg-[#0C82A0] text-white font-bold py-3 rounded-full hover:bg-[#096b85] transition-colors text-sm cursor-pointer">
                Acessar Google Drive
              </button>
            </div>

          </div>

          {/* 2. GALERIA DE IMAGENS AVULSAS COM FILTRO DE DATA */}
          <div className="mt-20 border-t border-gray-200 pt-16">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-[#0C82A0] font-[family-name:var(--font-josefin-slab)] uppercase tracking-wide">
                  Imagens Avulsas
                </h2>
                <p className="text-gray-500 text-sm">Faça o download dos arquivos individuais diretamente para o seu dispositivo.</p>
              </div>

              {/* Filtro de Histórico de Semanas */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                <span className="text-xs font-bold text-gray-600">Histórico de Atualizações:</span>
                <select
                  value={dataFiltro}
                  onChange={(e) => setDataFiltro(e.target.value)}
                  className="text-xs font-bold text-[#0C82A0] bg-transparent focus:outline-none cursor-pointer"
                >
                  <option value="2026-08-07">Semana Atual (07/08/2026)</option>
                  <option value="2026-08-01">Semana Anterior (01/08/2026)</option>
                  <option value="todas">Exibir Todas as Semanas</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {imagensExibidas.map((img, idx) => (
                <div key={idx} className="group relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200">
                  <Image
                    src={img.src}
                    alt={img.title}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  
                  {/* Overlay escura no Hover */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <span className="text-white font-bold mb-4 text-center text-sm md:text-base px-2">
                      {img.title}
                    </span>
                    <a
                      href={img.src}
                      download
                      className="bg-[#DD6810] text-white p-3 rounded-full hover:bg-white hover:text-[#DD6810] transition-colors transform hover:scale-110 shadow-lg"
                      title={`Baixar ${img.title}`}
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </div>

      {/* RODAPÉ EM AZUL SÓLIDO (#0C82A0) */}
      <div className="w-full bg-[#0C82A0] pt-12 md:pt-16 text-white mt-16 md:mt-24">
        <div className="max-w-[1200px] mx-auto px-6 flex flex-col items-center justify-center gap-6 mb-8">
          <a 
            href="https://www.oceanosasco.com.br" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-2xl sm:text-3xl md:text-4xl font-black font-[family-name:var(--font-josefin-slab)] tracking-wider hover:text-[#DD6810] transition-colors drop-shadow-sm text-center"
          >
            www.oceanosasco.com.br
          </a>

          <div className="flex items-center justify-center gap-5">
            <a 
              href="https://www.instagram.com/oceanparkosasco/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram Ocean Park"
              className="w-12 h-12 bg-white/10 hover:bg-[#DD6810] rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-md border border-white/20"
            >
              <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            <a 
              href="https://www.facebook.com/oceanparkosasco/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook Ocean Park"
              className="w-12 h-12 bg-white/10 hover:bg-[#DD6810] rounded-full flex items-center justify-center transition-all transform hover:scale-110 shadow-md border border-white/20"
            >
              <svg className="w-6 h-6 fill-current text-white" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="w-full relative leading-none">
          <Image
            src="/img/kit/polvopraia.jpg"
            alt="Ilustração Ocean Park Praia"
            width={1920}
            height={300}
            quality={100}
            className="w-full h-auto block object-cover"
          />
        </div>

        <div className="w-full bg-[#DD6810] py-8 px-6 text-center text-white">
          <p className="text-xs sm:text-sm font-medium tracking-wide text-white/95">
            © 2026 | Ocean Park Osasco | Termos de Uso e Política de Privacidade
          </p>
        </div>
      </div>

    </main>
  );
}