"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function SecaoContato() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

  // Máscara dinâmica de telefone: (11) 4164-4000 ou (11) 9 9999-9999
  const maskPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) {
      return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    }
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  // Limpeza de e-mail (remove espaços, minusculas e troca vírgula por ponto)
  const sanitizeEmail = (email: string) => {
    return email.trim().toLowerCase().replace(/,/g, ".");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!captchaToken) {
      alert("Por favor, confirme que você não é um robô.");
      return;
    }

    setStatus("loading");
    const emailLimpo = sanitizeEmail(formData.email);

    const data = {
      nome: formData.nome,
      email: emailLimpo,
      telefone: formData.telefone,
      mensagem: formData.mensagem,
      captcha: captchaToken,
      config: "ocean_park_osasco",
      token: "NTZmQzZGY5NDY2Mjg0ODRhYjNiZjNhZG",
      via: "formulario",
    };

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        
        // Disparo do GTM
        if (typeof window !== "undefined" && (window as any).dataLayer) {
          (window as any).dataLayer.push({ 
            event: "form_contato", 
            lead_data: {
              nome: data.nome,
              email: data.email,
              telefone: data.telefone
            }
          });
        }

        setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
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
    <section id="contato" className="pt-0 pb-12 md:pb-20 bg-white relative z-10 overflow-visible">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 overflow-visible">
        
        {/* Card Principal */}
        <div className="relative bg-[#DD6810] rounded-b-[2.5rem] shadow-2xl flex flex-col lg:flex-row items-stretch justify-between overflow-hidden min-h-[600px] lg:min-h-[680px]">
          
          {/* Lado Esquerdo / Imagem Ilustrativa Fachada */}
          <div className="relative w-full lg:w-1/2 flex flex-col justify-end overflow-hidden order-2 lg:order-1 min-h-[400px] sm:min-h-[500px] lg:min-h-[650px]">
            <Image 
              src="/img/Mobilidade e Praticidade/01.jpg" 
              alt="Ocean Park Osasco - Condomínio Clube" 
              fill
              quality={100}
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Lado Direito / Formulário */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-14 xl:px-16 py-10 sm:py-12 lg:py-16 xl:py-20 z-10 order-1 lg:order-2">
            
            <h3 className="font-bold text-white text-xl sm:text-2xl lg:text-[28px] uppercase leading-tight mb-8 drop-shadow-sm text-left font-[family-name:var(--font-josefin-slab)] tracking-wide">
              CADASTRE-SE E RECEBA EM 1ª MÃO TODAS AS INFORMAÇÕES:
            </h3>

            {status === "success" ? (
              <div className="bg-white p-10 rounded-3xl text-center shadow-md my-auto">
                <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                <h4 className="text-xl font-bold text-[#0C82A0] mb-2 uppercase">Mensagem enviada!</h4>
                <p className="text-gray-600 font-medium text-sm">Em breve entraremos em contato com você.</p>
                <button 
                  onClick={() => setStatus("idle")} 
                  className="mt-6 text-[#DD6810] font-bold hover:underline cursor-pointer"
                >
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
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onBlur={(e) => setFormData({ ...formData, email: sanitizeEmail(e.target.value) })}
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
                    value={formData.telefone}
                    onChange={(e) => setFormData({ ...formData, telefone: maskPhone(e.target.value) })}
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
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    className="w-full bg-white border-none rounded-3xl px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#0C82A0]/50 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm resize-none"
                  />
                </div>

                <div className="flex flex-col xl:flex-row items-center justify-between gap-4 pt-2">
                  <div className="w-full xl:w-auto flex justify-center min-h-[78px] min-w-[304px]">
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
                    className="w-full xl:w-auto bg-[#0C82A0] hover:bg-[#096a83] disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-black text-base uppercase tracking-widest px-12 py-4 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl active:scale-95 h-[78px]"
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

        </div>
      </div>
    </section>
  );
}