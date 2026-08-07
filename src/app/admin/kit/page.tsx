import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import UploadInterface from "./UploadInterface";

export default function AdminKitPage() {
  const session = cookies().get("admin_session");
  
  if (!session?.value) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        {/* TESTEIRA / BANNER SUPERIOR COM A LOGO DO EMPREENDIMENTO MAIOR */}
        <div className="w-full relative z-10 pt-16 sm:pt-20 bg-[#0C82A0] pb-8 flex items-center justify-center shadow-md">
          <div className="relative w-64 sm:w-80 md:w-96 h-24 sm:h-32">
            <Image
              src="/img/logo2.png"
              alt="Ocean Park Osasco"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>

        {/* CONTEÚDO DO PAINEL ADMIN */}
        <div className="max-w-[1000px] mx-auto px-6 py-12 w-full">
          <div className="flex justify-between items-end mb-8 border-b pb-4">
            <div>
              <h1 className="text-3xl font-black text-[#0C82A0]">Gestão do Kit Corretor</h1>
              <p className="text-gray-500 text-sm">Faça upload em lote dos materiais para a página pública.</p>
            </div>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
              Agência Logada
            </span>
          </div>
          
          <UploadInterface />
        </div>
      </div>

      {/* RODAPÉ EM AZUL SÓLIDO (#0C82A0) COM SITE, REDES SOCIAIS E POLVO */}
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
            {/* Instagram */}
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

            {/* Facebook */}
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
            alt="Ilustração Ocean Park Praia Admin"
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