import type { Metadata, Viewport } from "next";
import { Montserrat, Josefin_Sans, Josefin_Slab } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import ScrollToTop from "@/components/ScrollToTop";
// @ts-ignore: allow importing global CSS without type declarations
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-josefin-sans",
  display: "swap",
});

const josefinSlab = Josefin_Slab({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-josefin-slab",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OCEAN PARK Condomínio Clube - Residencial | 55 e 34m² | Terraço Gourmet • 1 Vaga",
  description: "OCEAN PARK Condomínio Clube - Residencial em Osasco. Apartamentos de 55 e 34m² com Terraço Gourmet e 1 Vaga.",
  keywords: ["OCEAN PARK", "Osasco", "apartamento Osasco", "Padroeira Osasco", "Quattro Inc", "Minha Casa Minha Vida"],
  authors: [{ name: "CaioCom" }],
  openGraph: {
    title: "OCEAN PARK Condomínio Clube - Residencial | 55 e 34m²",
    description: "OCEAN PARK Condomínio Clube - Residencial | 55 e 34m² | Terraço Gourmet • 1 Vaga",
    siteName: "OCEAN PARK",
    locale: "pt_BR",
    type: "website",
    url: "https://www.oceanparkosasco.com.br",
    images: ["/img/logotipo-link.jpg"],
  },
  verification: {
    other: {
      "google-site-verification": ["H9PjxARWIJKw4osugNwlLTnGAFN4wzPxl254f4QPBW8"],
      "facebook-domain-verification": ["44o5be08i1rdoijq0nigsqimonicx7"],
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0C82A0",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${josefinSans.variable} ${josefinSlab.variable} scroll-smooth`}>
      <head>
        <Script 
          id="gtm-script" 
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-WRLQ2JWB');
            `
          }}
        />
      </head>
      <body className="min-h-screen bg-white text-[#333333] antialiased selection:bg-[#DD6810] selection:text-white">
        <ScrollToTop />
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRLQ2JWB"
            height="0" 
            width="0" 
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
        <Analytics />
      </body>
    </html>
  );
}