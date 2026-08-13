"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";

export default function SecaoContato() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });

  const [utms, setUtms] = useState({ source: "", medium: "", campaign: "", content: "", term: "" });

  useEffect(() => {
    setIsMounted(true);

    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setUtms({
        source: params.get("utm_source") || "",
        medium: params.get("utm_medium") || "",
        campaign: params.get("utm_campaign") || "",
        content: params.get("utm_content") || "",
        term: params.get("utm_term") || "",
      });
    }
  }, []);

  const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6LedSHgtAAAAAPcAN_QO8ylKsyE3iJ7wH7X_gn37";

  const maskPhone = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (!digits) return "";
    if (digits.length <= 2) return `(${digits}`;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const sanitizeEmail = (email: string) => {
    return email.trim().toLowerCase().replace(/,/g, ".");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "telefone") {
      setFormData((prev) => ({ ...prev, telefone: maskPhone(value) }));
    } else if (name === "email") {
      setFormData((prev) => ({ ...prev, email: sanitizeEmail(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      alert("Por favor, confirme que você não é um robô.");
      return;
    }

    setStatus("loading");
    const emailLimpo = sanitizeEmail(formData.email);

    const payload = {
      nome: formData.nome,
      email: emailLimpo,
      telefone: formData.telefone,
      mensagem: formData.mensagem,
      captcha: captchaToken,
      via: "formulario",
      utms: utms,
    };

    try {
      const response = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        if (typeof window !== "undefined" && (window as any).dataLayer) {
          (window as any).dataLayer.push({ 
            event: "form_contato", 
            lead_data: {
              nome: payload.nome,
              email: payload.email,
              telefone: payload.telefone
            }
          });
        }

        setFormData({ nome: "", email: "", telefone: "", mensagem: "" });
        recaptchaRef.current?.reset();
        setCaptchaToken(null);

        // Redireciona para a página de confirmação
        router.push("/confirmacao-contato");
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Erro no envio do formulário:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contato" className="py-8 md:py-16 bg-white relative z-10 overflow-visible">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 overflow-visible">
        
        <div className="relative bg-gradient-to-b from-[#FFBA00] via-[#FFBA00] via-40% to-[#87CEEB] to-90% lg:bg-gradient-to-r lg:from-[#87CEEB] lg:from-10% lg:via-[#FF9E00] lg:via-50% lg:to-[#FFBA00] lg:to-90% rounded-[2.5rem] shadow-xl flex flex-col lg:flex-row items-stretch justify-between lg:mt-1 overflow-visible">
          
          <div className="w-full lg:w-6/12 flex flex-col justify-center p-6 pb-2 sm:p-10 sm:pb-4 lg:p-12 xl:pr-16 xl:pl-8 z-10 order-1 lg:order-2">
            <h3 className="font-medium text-[#4A137B] text-[22px] sm:text-2xl lg:text-3xl uppercase leading-[1.2] mb-6 drop-shadow-sm text-left lg:text-left text-balance break-words">
              CADASTRE-SE E RECEBA EM PRIMEIRA MÃO TODAS AS INFORMAÇÕES:
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 w-full">
              <div>
                <label htmlFor="lead-nome" className="sr-only">Nome*</label>
                <input 
                  id="lead-nome"
                  name="nome"
                  type="text" 
                  placeholder="Nome*" 
                  required 
                  value={formData.nome}
                  onChange={handleChange}
                  className="w-full bg-white border-none rounded-full px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#7629BB]/30 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="lead-email" className="sr-only">E-mail*</label>
                <input 
                  id="lead-email"
                  name="email"
                  type="email" 
                  placeholder="E-mail*" 
                  required 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white border-none rounded-full px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#7629BB]/30 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="lead-tel" className="sr-only">Telefone*</label>
                <input 
                  id="lead-tel"
                  name="telefone"
                  type="tel" 
                  placeholder="Telefone*" 
                  required 
                  value={formData.telefone}
                  onChange={handleChange}
                  className="w-full bg-white border-none rounded-full px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#7629BB]/30 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm"
                />
              </div>

              <div>
                <label htmlFor="lead-msg" className="sr-only">Mensagem*</label>
                <textarea 
                  id="lead-msg"
                  name="mensagem"
                  rows={4}
                  placeholder="Mensagem*" 
                  required 
                  value={formData.mensagem}
                  onChange={handleChange}
                  className="w-full bg-white border-none rounded-3xl px-6 py-4 text-sm outline-none focus:ring-4 focus:ring-[#7629BB]/30 transition-all font-medium text-gray-800 placeholder-gray-400 shadow-sm resize-none"
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
                  className="w-full sm:w-auto bg-[#7629BB] hover:bg-[#4A137B] disabled:bg-gray-400 disabled:cursor-not-allowed text-[#FFFFFF] font-black text-base uppercase tracking-widest px-12 py-4 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl active:scale-95 h-[78px] cursor-pointer"
                >
                  {status === "loading" ? "ENVIANDO..." : "ENVIAR"}
                </button>
              </div>
              {status === "error" && (
                <p className="text-red-600 text-sm font-bold text-center mt-2">
                  Ocorreu um erro ao enviar. Tente novamente.
                </p>
              )}
            </form>
          </div>

          <div className="relative w-full lg:w-5/12 flex flex-col justify-end overflow-visible min-h-[300px] sm:min-h-[400px] lg:min-h-[320px] order-2 lg:order-1 mt-0">
            <div className="relative lg:absolute lg:bottom-0 lg:left-0 w-full lg:w-[115%] lg:-mt-80 z-20 pointer-events-none rounded-b-[2.5rem] lg:rounded-bl-[2.5rem] lg:rounded-br-none overflow-hidden">
              <Image 
                src="/img/edificios.png" 
                alt="Edifício Lumini 3 - Arquitetura Moderna" 
                width={1200} 
                height={1400} 
                quality={100}
                className="w-full h-auto object-contain block rounded-b-[2.5rem] lg:rounded-bl-[2.5rem] lg:rounded-br-none mix-blend-normal"
                priority
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}