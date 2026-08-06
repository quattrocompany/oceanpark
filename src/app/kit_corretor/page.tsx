import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Kit Corretor | Ocean Park",
  description: "Materiais de vendas e mídias para corretores parceiros.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function KitCorretorPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      
      <div>
        {/* TESTEIRA / BANNER SUPERIOR */}
        <div className="w-full relative z-10 pt-20 sm:pt-24 bg-[#0C82A0]">
          <div className="relative w-full max-w-[1920px] mx-auto">
            <Image
              src="/img/kit/testeira.jpg"
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
              Kit Corretor
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Faça o download de todos os materiais oficiais do Ocean Park para enviar aos seus clientes e postar nas redes sociais.
            </p>
          </div>

          {/* Cards de Downloads */}
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
        </div>
      </div>

      {/* RODAPÉ ILUSTRATIVO POLVO E PRAIA */}
      <div className="w-full relative leading-none bg-[#0C82A0] mt-12">
        <Image
          src="/img/kit/polvopraia.jpg"
          alt="Ilustração Ocean Park Praia"
          width={1920}
          height={300}
          quality={100}
          className="w-full h-auto block object-cover"
        />
      </div>

    </main>
  );
}