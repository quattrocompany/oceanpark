"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface ItemKit {
  id: string;
  nome: string;
  categoria: string;
  url: string;
  tamanho: string;
  dataUpload: string;
}

const imagensPadraoFallback: ItemKit[] = [
  { id: "f1", url: "/img/01.jpg", nome: "Fachada", categoria: "imagem_avulsa", tamanho: "3.2 MB", dataUpload: "2026-08-07" },
  { id: "f2", url: "/img/02.jpg", nome: "Portaria Central", categoria: "imagem_avulsa", tamanho: "2.8 MB", dataUpload: "2026-08-07" },
  { id: "f3", url: "/img/03.jpg", nome: "Lazer", categoria: "imagem_avulsa", tamanho: "4.1 MB", dataUpload: "2026-08-07" },
  { id: "f4", url: "/img/04.jpg", nome: "Planta", categoria: "imagem_avulsa", tamanho: "3.5 MB", dataUpload: "2026-08-07" },
];

export default function KitCorretorPage() {
  const [itens, setItens] = useState<ItemKit[]>([]);
  const [dataFiltro, setDataFiltro] = useState<string>("todas");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarKit() {
      try {
        const res = await fetch("/api/kit");
        const data = await res.json();
        
        if (data.items && data.items.length > 0) {
          setItens(data.items);
          const datas = Array.from(new Set(data.items.map((i: ItemKit) => i.dataUpload))).sort().reverse();
          if (datas.length > 0) {
            setDataFiltro(datas[0] as string);
          }
        } else {
          setItens(imagensPadraoFallback);
        }
      } catch (e) {
        console.error("Erro ao carregar do servidor, utilizando imagens padrão:", e);
        setItens(imagensPadraoFallback);
      } finally {
        setLoading(false);
      }
    }
    carregarKit();
  }, []);

  const datasDisponiveis = Array.from(new Set(itens.map((i) => i.dataUpload))).sort().reverse();

  const itensFiltrados = itens.filter((i) => {
    if (dataFiltro === "todas") return true;
    return i.dataUpload === dataFiltro;
  });

  const pacotesZip = itensFiltrados.filter((i) => i.categoria === "pacote_zip");
  const laminasPdf = itensFiltrados.filter((i) => i.categoria === "lamina_pdf");
  const videos = itensFiltrados.filter((i) => i.categoria === "video");
  const imagensAvulsas = itensFiltrados.filter((i) => i.categoria === "imagem_avulsa");

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      
      <div>
        {/* BANNER SUPERIOR OCEAN */}
        <div className="w-full relative z-10 pt-16 sm:pt-0 bg-[#0c82a0]">
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
            <h1 className="text-3xl md:text-5xl font-black text-[#1E293B] uppercase tracking-tight mb-4">
              Kit Corretor
            </h1>
            <p className="text-gray-600 text-base max-w-2xl mx-auto">
              Reunimos todo o conteúdo de apoio em um só lugar para você ter sempre à mão. Use sem moderação!
            </p>
          </div>

          {/* BOTÃO DE DOWNLOAD TOTAL */}
          {pacotesZip.length > 0 && (
            <div className="mb-10 text-center bg-white p-8 rounded-2xl shadow-sm border border-gray-200 max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left">
                <span className="bg-[#0c82a0]/10 text-[#0c82a0] text-xs font-bold uppercase px-3 py-1 rounded-full">
                  Download Completo
                </span>
                <h2 className="text-xl md:text-2xl font-black text-gray-800 mt-2">
                  Baixar Todo o Kit de Vendas
                </h2>
                <p className="text-xs text-gray-500">Inclui todas as imagens HD, lâmina comercial e vídeos em 1 só arquivo.</p>
              </div>
              
              <a
                href={pacotesZip[0].url}
                download
                className="w-full sm:w-auto bg-[#0c82a0] hover:bg-[#096a82] text-white font-black py-4 px-8 rounded-full shadow-lg hover:scale-105 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Baixar Kit Completo (.ZIP)
              </a>
            </div>
          )}

          {/* BOXES DE DOWNLOADS SEPARADOS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Box 1: ZIP */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#0c82a0]/10 text-[#0c82a0] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Imagens e Perspectivas</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">Renders em alta resolução da fachada, lazer e decorado.</p>
              {pacotesZip.length > 0 ? (
                <a href={pacotesZip[0].url} download className="w-full bg-[#0c82a0] text-white font-bold py-3 rounded-full hover:bg-[#096a82] transition-colors text-sm text-center">
                  Baixar Pacote (.ZIP)
                </a>
              ) : (
                <button disabled className="w-full bg-gray-200 text-gray-400 font-bold py-3 rounded-full text-sm">
                  Indisponível
                </button>
              )}
            </div>

            {/* Box 2: PDF */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#0c82a0]/10 text-[#0c82a0] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Lâmina e Plantas</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">Apresentação comercial e todas as plantas baixas cotadas.</p>
              {laminasPdf.length > 0 ? (
                <a href={laminasPdf[0].url} download className="w-full bg-[#0c82a0] text-white font-bold py-3 rounded-full hover:bg-[#096a82] transition-colors text-sm text-center">
                  Baixar Caderno (.PDF)
                </a>
              ) : (
                <button disabled className="w-full bg-gray-200 text-gray-400 font-bold py-3 rounded-full text-sm">
                  Indisponível
                </button>
              )}
            </div>

            {/* Box 3: VÍDEOS */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#0c82a0]/10 text-[#0c82a0] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Vídeos e Reels</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">Vídeos promocionais prontos para postar no Instagram e WhatsApp.</p>
              {videos.length > 0 ? (
                <a href={videos[0].url} download className="w-full bg-[#1E293B] text-white font-bold py-3 rounded-full hover:bg-[#0f172a] transition-colors text-sm text-center">
                  Baixar Vídeos (.MP4)
                </a>
              ) : (
                <button disabled className="w-full bg-gray-200 text-gray-400 font-bold py-3 rounded-full text-sm">
                  Indisponível
                </button>
              )}
            </div>

          </div>

          {/* GALERIA DE IMAGENS AVULSAS (PROPORÇÃO 9:16) */}
          <div className="mt-20 border-t border-gray-200 pt-16">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
              <div className="text-center sm:text-left">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1E293B] uppercase tracking-wide">
                  Imagens Avulsas
                </h2>
                <p className="text-gray-500 text-sm">Baixe perspectivas individuais diretamente para o seu dispositivo.</p>
              </div>

              {datasDisponiveis.length > 0 && (
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-gray-200 shadow-sm">
                  <span className="text-xs font-bold text-gray-600">Histórico de Atualizações:</span>
                  <select
                    value={dataFiltro}
                    onChange={(e) => setDataFiltro(e.target.value)}
                    className="text-xs font-bold text-[#1E293B] bg-transparent focus:outline-none cursor-pointer"
                  >
                    <option value="todas">Exibir Todas as Datas</option>
                    {datasDisponiveis.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {loading ? (
              <p className="text-center py-10 text-gray-400 font-medium">Carregando imagens...</p>
            ) : imagensAvulsas.length === 0 ? (
              <p className="text-center py-10 text-gray-400 font-medium">Nenhuma imagem avulsa encontrada para esta data.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {imagensAvulsas.map((img) => (
                  <div key={img.id} className="group relative aspect-[9/16] rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-200 bg-gray-100">
                    <Image
                      src={img.url}
                      alt={img.nome}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                      <span className="text-white font-bold mb-4 text-center text-xs md:text-sm px-2 truncate w-full">
                        {img.nome}
                      </span>
                      <a
                        href={img.url}
                        download
                        className="bg-[#0c82a0] text-white p-3 rounded-full hover:bg-white hover:text-[#0c82a0] transition-colors transform hover:scale-110 shadow-lg"
                        title={`Baixar ${img.nome}`}
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* RODAPÉ */}
      <div className="w-full bg-[#064b5d] pt-12 md:pt-16 text-white mt-16 md:mt-24">
        <div className="w-full bg-[#0c82a0] py-8 px-6 text-center text-white">
          <p className="text-xs sm:text-sm font-medium tracking-wide text-white/95">
            © 2026 Ocean Park | Termos de Uso e Política de Privacidade
          </p>
        </div>
      </div>

    </main>
  );
}