"use client";

export default function BotaoWhatsApp() {
  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // Dispara evento customizado para o GTM capturar a conversão de clique
    if (typeof window !== "undefined" && (window as any).dataLayer) {
      (window as any).dataLayer.push({ event: "clique_whatsapp" });
    }

    // Abre a API do WhatsApp em nova aba mantendo o link original[cite: 2]
    window.open("https://api.whatsapp.com/send?phone=551141644000", "_blank");
  };

  return (
    <button onClick={handleWhatsAppClick} className="bg-green-500 text-white p-3 rounded">
      Falar no WhatsApp
    </button>
  );
}
