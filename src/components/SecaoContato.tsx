"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function SecaoContato() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Chave pública reCAPTCHA oficial do Ocean Park (com fallback da variável de ambiente)
  const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lfd8pQrAAAAAGVj_aDG9H9VGq5H3Gi-iAMlpeX5";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!captchaToken) {
      alert("Por favor, confirme que você não é um robô.");
      return;
    }

    setStatus("loading");
    const formData = new FormData(e.currentTarget);
    const data = {
      nome: formData.get("nome"),
      email: formData.get("email"),
      telefone: formData.get("telefone"),
      mensagem: formData.get("mensagem"),
      captcha: captchaToken,
      config: "ocean_park_osasco",
      token: "NTZmQzZGY5NDY2Mjg0ODRhYjNiZjNhZG",
    };

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        e.currentTarget.reset();
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="py-8 md:py-16 bg-white relative z-10 overflow-visible">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 overflow-visible">
        
        {/* Card Principal com Fundo Laranja Oficial Ocean Park (#DD6810) */}
        <div className="relative bg-[#DD6810] rounded-[2.5rem] shadow-2xl flex flex-col lg:flex-row items-stretch justify-between overflow-visible">
          
          {/* Lado Direito / Formulário */}
          <div className="w-full lg:w-6/12 flex flex-col justify-center p-6 sm:p-10 lg:p-12 xl:pr-16 xl:pl-8 z-10 order-1 lg:order-2">
            
            <h3 className="font-bold text-white text-xl sm:text-2xl lg:text-3xl uppercase leading-snug mb-6 drop-shadow-sm text-left font-josefinSans tracking-wide">
              CADASTRE-SE E RECEBA EM 1ª MÃO TODAS AS INFORMAÇÕES:
            </h3>

            {status === "success" ? (
              <div className="bg-white p-8 rounded-3xl text-center shadow-md">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <h4 className="text-xl font-bold text-[#0C82A0] mb-2 uppercase">Mensagem enviada!</h4>
                <p className="text-gray-600 font-medium text-sm">Em breve entraremos em contato com você.</p>
                <button onClick={() => setStatus("idle")} className="mt-6 text-[#DD6810] font-bold hover:underline">
                  Enviar nova mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 w-full">
                <div>
                  <label htmlFor="lead-nome" className="sr-only">NOME (*):</label>
                  <input 
                    id="lead-nome"
                    name="nome"
                    type="text" 
                    placeholder="NOME (*):" 
                    required 
                    className="w-full bg-white border-none rounded-full px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#0C82A0]/50 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="lead-email" className="sr-only">E-MAIL (*):</label>
                  <input 
                    id="lead-email"
                    name="email"
                    type="email" 
                    placeholder="E-MAIL (*):" 
                    required 
                    className="w-full bg-white border-none rounded-full px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#0C82A0]/50 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="lead-tel" className="sr-only">TELEFONE (*):</label>
                  <input 
                    id="lead-tel"
                    name="telefone"
                    type="tel" 
                    placeholder="TELEFONE (*):" 
                    required 
                    className="w-full bg-white border-none rounded-full px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#0C82A0]/50 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="lead-msg" className="sr-only">INFORMAÇÕES:</label>
                  <textarea 
                    id="lead-msg"
                    name="mensagem"
                    rows={4}
                    placeholder="INFORMAÇÕES:" 
                    className="w-full bg-white border-none rounded-3xl px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#0C82A0]/50 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm resize-none"
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="w-full sm:w-auto flex justify-center min-h-[78px] min-w-[304px]">
                    {isMounted && (
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={SITE_KEY}
                        onChange={(token) => setCaptchaToken(token)}
                        hl="pt-BR"
                      />
                    )}
                  </div>

                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className="w-full sm:w-auto bg-[#0C82A0] hover:bg-[#096a83] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-black text-base uppercase tracking-widest px-12 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 h-[78px]"
                  >
                    {status === "loading" ? "ENVIANDO..." : "ENVIAR"}
                  </button>
                </div>

                {status === "error" && (
                  <p className="text-white bg-red-600/90 py-2 px-4 rounded-xl text-sm font-bold text-center mt-2">
                    Ocorreu um erro ao enviar. Tente novamente.
                  </p>
                )}
              </form>
            )}
          </div>

          {/* Lado Esquerdo / Imagem Ilustrativa Fachada */}
          <div className="relative w-full lg:w-5/12 flex flex-col justify-end overflow-hidden rounded-b-[2.5rem] lg:rounded-bl-[2.5rem] lg:rounded-tr-none order-2 lg:order-1 min-h-[300px] sm:min-h-[400px] lg:min-h-[500px]">
            <Image 
              src="/img/Conforto absoluto/01.jpg" 
              alt="Ocean Park Osasco - Condomínio Clube" 
              fill
              quality={100}
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

        </div>
      </div>
    </section>
  );
}