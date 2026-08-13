"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ModalWhatsappProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalWhatsapp({ isOpen, onClose }: ModalWhatsappProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", whatsapp: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [utms, setUtms] = useState({ source: "", medium: "", campaign: "", content: "", term: "" });

  useEffect(() => {
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

  if (!isOpen) return null;

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

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");

    const emailLimpo = sanitizeEmail(formData.email);

    if (!isValidEmail(emailLimpo)) {
      setEmailError("Insira um e-mail válido (exemplo: nome@dominio.com).");
      return;
    }

    setIsSubmitting(true);

    try {
      await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.name,
          email: emailLimpo,
          telefone: formData.whatsapp,
          mensagem: "Contato via modal WhatsApp",
          via: "whatsapp",
          utms: utms,
        }),
      });
    } catch (err) {
      console.error("Erro ao salvar no Supabase:", err);
    }

    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ 
        event: "clique_whatsapp",
        lead_data: { ...formData, email: emailLimpo } 
      });
    }

    const textoMensagem = 
`Olá! Gostaria de mais informações sobre o Lumini 3.

*Dados de contato:*
• *Nome:* ${formData.name}
• *E-mail:* ${emailLimpo}
• *Telefone:* ${formData.whatsapp}`;

    const mensagemTexto = encodeURIComponent(textoMensagem);
    const waUrl = `https://api.whatsapp.com/send?phone=551141644000&text=${mensagemTexto}`;

    setFormData({ name: "", email: "", whatsapp: "" });
    setIsSubmitting(false);
    onClose();

    // Redireciona para a página intermediária passando a URL do WhatsApp
    router.push(`/confirmacao-whatsapp?waUrl=${encodeURIComponent(waUrl)}`);
  };

  return (
    <div 
      className="fixed inset-0 bg-[#4A137B]/90 z-[9999] flex justify-center items-center p-4 animate-in fade-in duration-300 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl w-full max-w-md max-h-[92vh] overflow-y-auto relative shadow-2xl [::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onClick={(e) => e.stopPropagation()} 
      >
        <button 
          onClick={onClose} 
          className="absolute top-4 right-5 text-3xl text-gray-400 hover:text-[#4A137B] transition-colors focus:outline-none"
          aria-label="Fechar Modal"
        >
          &times;
        </button>

        <div className="text-center mb-6">
          <h3 className="text-2xl font-black text-[#4A137B] uppercase tracking-wide">
            Atendimento
            <br />
            WhatsApp
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 mt-2">
            Preencha seus dados para iniciarmos o atendimento.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 max-w-sm mx-auto">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Nome *</label>
            <input 
              type="text" 
              required
              placeholder="Seu nome"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7629BB]/50 transition-all text-gray-800 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email *</label>
            <input 
              type="email" 
              required
              placeholder="Seu e-mail"
              value={formData.email}
              onChange={(e) => {
                setEmailError("");
                setFormData({ ...formData, email: sanitizeEmail(e.target.value) });
              }}
              onBlur={(e) => setFormData({ ...formData, email: sanitizeEmail(e.target.value) })}
              className={`w-full bg-gray-50 border ${emailError ? "border-red-500" : "border-gray-200"} rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7629BB]/50 transition-all text-gray-800 placeholder-gray-400`}
            />
            {emailError && <p className="text-red-500 text-xs font-semibold mt-1">{emailError}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">WhatsApp *</label>
            <input 
              type="tel" 
              required
              placeholder="(11) 9 9999-9999"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: maskPhone(e.target.value) })}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7629BB]/50 transition-all text-gray-800 placeholder-gray-400"
            />
          </div>

          <p className="text-[10px] text-gray-400 italic pt-1">* Dados obrigatórios</p>

          <div className="pt-3 flex flex-col gap-2.5">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-[#25D366] hover:bg-[#1DA851] disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-full transition-colors uppercase tracking-wider text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {!isSubmitting && (
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 2C6.496 2 2 6.496 2 12.031c0 1.931.547 3.743 1.516 5.334L2 22l4.781-1.469a10.02 10.02 0 005.25 1.485c5.535 0 10.031-4.496 10.031-10.031S17.566 2 12.031 2zm0 18.375c-1.634 0-3.188-.415-4.571-1.2l-.328-.188-3.398 1.047 1.062-3.328-.219-.344a8.381 8.381 0 01-1.328-4.516c0-4.634 3.772-8.406 8.406-8.406 4.635 0 8.407 3.772 8.407 8.406s-3.772 8.406-8.407 8.406zm4.61-6.313c-.25-.125-1.484-.734-1.719-.812-.234-.078-.406-.125-.578.125-.172.25-.656.812-.812.984-.156.172-.312.188-.562.063-.25-.125-1.059-.39-2.019-1.246-.747-.669-1.254-1.494-1.406-1.744-.153-.25-.016-.385.109-.509.112-.112.25-.297.375-.447.125-.15.172-.25.25-.422.078-.172.039-.328-.023-.453-.063-.125-.578-1.391-.797-1.906-.211-.502-.422-.434-.578-.442l-.485-.008c-.172 0-.453.063-.688.313-.234.25-.891.875-.891 2.125s.914 2.453 1.047 2.625c.125.172 1.781 2.719 4.313 3.813.601.258 1.07.412 1.437.528.604.192 1.156.164 1.593.1.487-.072 1.484-.606 1.688-1.194.203-.588.203-1.094.14-1.194-.062-.1-.234-.156-.484-.281z"/>
                </svg>
              )}
              {isSubmitting ? "Iniciando atendimento..." : "Ir para WhatsApp"}
            </button>
            <button 
              type="button" 
              onClick={onClose}
              className="w-full bg-[#EF4444] hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition-colors uppercase tracking-wider text-sm shadow-md cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}