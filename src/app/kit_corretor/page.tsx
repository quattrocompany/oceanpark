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

// Esvaziado para não exibir imagens quebradas enquanto o banco estiver vazio
const imagensPadraoFallback: ItemKit[] = [];

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
        console.error("Erro ao carregar do servidor:", e);
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-[#0c82a0]/10 text-[#0c82a0] rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Tabela de Preços</h3>
              <p className="text-sm text-gray-500 mb-6 flex-1">Tabela de vendas oficial com fluxos de pagamento e valores das unidades.</p>
              <a
                href="/pdf/OceanPark Torres-AeB.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#0c82a0] text-white font-bold py-3 rounded-full hover:bg-[#096a82] transition-colors text-sm text-center"
              >
                Baixar Tabela (.PDF)
              </a>
            </div>

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
                <button disabled className="w-full bg-gray-200 text-gray-400 font-bold py-3 rounded-full text-sm cursor-not-allowed">
                  Indisponível
                </button>
              )}
            </div>

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
                <button disabled className="w-full bg-gray-200 text-gray-400 font-bold py-3 rounded-full text-sm cursor-not-allowed">
                  Indisponível
                </button>
              )}
            </div>

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
                <button disabled className="w-full bg-gray-200 text-gray-400 font-bold py-3 rounded-full text-sm cursor-not-allowed">
                  Indisponível
                </button>
              )}
            </div>

          </div>

          {/* GALERIA DE IMAGENS AVULSAS */}
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
              <p className="text-center py-10 text-gray-400 font-medium">Nenhum arquivo publicado até o momento.</p>
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

      {/* RODAPÉ E CONTATOS */}
      <div className="w-full mt-16 md:mt-24 flex flex-col">
        <div className="w-full bg-[#0c82a0] py-16 px-6 text-center text-white">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            <h3 className="text-3xl md:text-4xl font-black mb-4 uppercase tracking-wide">
              Ocean Park
            </h3>
            <p className="text-white/95 mb-8 text-sm md:text-base max-w-lg font-medium">
              Acompanhe nossas redes sociais oficiais e acesse o site para ficar por dentro de todas as novidades!
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center">
              <a
                href="https://www.oceanosasco.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#064b5d] hover:bg-[#043643] text-white px-8 py-3.5 rounded-full font-bold text-sm transition-all shadow-lg flex items-center gap-2 hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                Acessar Site Oficial
              </a>

              <div className="flex items-center gap-3 mt-2 sm:mt-0">
                <a href="https://www.instagram.com/oceanparkosasco/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#064b5d] flex items-center justify-center transition-all hover:scale-110 shadow-lg" title="Instagram">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                  </svg>
                </a>
                <a href="https://www.facebook.com/oceanparkosasco/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/10 hover:bg-[#064b5d] flex items-center justify-center transition-all hover:scale-110 shadow-lg" title="Facebook">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full relative">
          <Image
            src="/img/polvopraia.jpg"
            alt="Ocean Park Polvo"
            width={1920}
            height={600}
            quality={100}
            className="w-full h-auto block object-cover"
            priority
          />
        </div>

        <div className="w-full bg-[#e06311] py-8 px-6 text-center text-white relative z-10">
          <p className="text-xs sm:text-sm font-bold tracking-wide text-white">
            © 2026 Ocean Park | Termos de Uso e Política de Privacidade
          </p>
        </div>
      </div>

    </main>
  );
}