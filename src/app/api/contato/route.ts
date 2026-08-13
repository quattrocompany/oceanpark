import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome, email, telefone, mensagem, captcha, via, utms } = body;

    console.log(">>> NOVO LEAD LUMINI 3 RECEBIDO:", { nome, email, telefone, via, utms });

    const isWhatsapp = via === "whatsapp" || via === "modal_whatsapp" || mensagem === "Contato via modal WhatsApp";

    // 1. Validar reCAPTCHA no Google (Ignora se for via WhatsApp)
    if (!isWhatsapp && captcha && process.env.RECAPTCHA_SECRET_KEY) {
      try {
        const params = new URLSearchParams({
          secret: process.env.RECAPTCHA_SECRET_KEY,
          response: captcha,
        });

        const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: params.toString(),
        });

        const recaptchaJson = await recaptchaRes.json();
        console.log(">>> RECAPTCHA GOOGLE:", recaptchaJson);

        if (!recaptchaJson.success) {
          return NextResponse.json(
            { error: "Falha na verificação do reCAPTCHA." },
            { status: 400 }
          );
        }
      } catch (captchaErr) {
        console.error(">>> ERRO CONSULTA RECAPTCHA:", captchaErr);
      }
    }

    const origemTexto = isWhatsapp ? "WhatsApp Modal - Lumini 3" : "Formulário de Contato - Lumini 3";
    const mensagemTexto = mensagem || (isWhatsapp ? "Contato via modal WhatsApp" : "Contato via site Lumini 3");

    // 2. Gravar Lead no Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

    if (!supabaseUrl || !supabaseKey) {
      console.error(">>> ERRO: Variáveis do Supabase não configuradas.");
      return NextResponse.json({ error: "Configuração do banco ausente." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: dbData, error: dbError } = await supabase
      .from("leads")
      .insert([
        {
          nome: nome || "Não informado",
          email: email || "Não informado",
          telefone: telefone || "Não informado",
          mensagem: mensagemTexto,
          origem: origemTexto,
        },
      ])
      .select();

    if (dbError) {
      console.error(">>> ERRO BANCO SUPABASE:", dbError);
      return NextResponse.json({ error: dbError.message }, { status: 500 });
    }

    console.log(">>> LEAD SALVO NO SUPABASE COM SUCESSO:", dbData);

    // 3. Enviar E-mail via Resend API
    if (process.env.RESEND_API_KEY) {
      try {
        const sender = "Site Lumini 3 <contato@lumini3.com.br>";
        const { data: emailData, error: emailErr } = await resend.emails.send({
          from: sender,
          to: ["estandelumini@gmail.com"],
          replyTo: (email && email.includes("@")) ? email : undefined,
          subject: `Novo Lead - Lumini 3 (${isWhatsapp ? "WhatsApp" : "Formulário"}): ${nome}`,
          html: `
            <h2>Novo contato recebido pelo site Lumini 3</h2>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Origem:</strong> ${origemTexto}</p>
            <br/>
            <p><strong>Mensagem:</strong></p>
            <p>${(mensagemTexto || "").replace(/\n/g, "<br/>")}</p>
          `,
        });

        if (emailErr) {
          console.error(">>> ERRO RESEND:", emailErr);
        } else {
          console.log(">>> E-MAIL DISPARADO VIA RESEND COM SUCESSO:", emailData);
        }
      } catch (resendError) {
        console.error(">>> ERRO EXCEÇÃO RESEND:", resendError);
      }
    } else {
      console.warn(">>> AVISO: RESEND_API_KEY ausente nas variáveis de ambiente.");
    }

    // 4. Enviar Lead para o Webhook da Exent (com UTMs)
    try {
      const webhookUrl = "https://hub.exent.com.br/api/webhook/inbound/2f3589584fd671a0cc24";

      const webhookPayload = {
        nome: nome || "Não informado",
        email: email || "Não informado",
        telefone: telefone || "Não informado",
        mensagem: mensagemTexto,
        origem: origemTexto,
        data_cadastro: new Date().toISOString(),
        utm_source: utms?.source || "",
        utm_medium: utms?.medium || "",
        utm_campaign: utms?.campaign || "",
        utm_content: utms?.content || "",
        utm_term: utms?.term || ""
      };

      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(webhookPayload),
      });

      if (webhookRes.ok) {
        console.log(">>> WEBHOOK EXENT DISPARADO COM SUCESSO");
      } else {
        console.error(">>> ERRO NO WEBHOOK EXENT. Status:", webhookRes.status);
      }
    } catch (webhookErr) {
      console.error(">>> ERRO DE EXCEÇÃO NO WEBHOOK EXENT:", webhookErr);
    }

    return NextResponse.json({ success: true, message: "Lead processado com sucesso!", data: dbData }, { status: 200 });
  } catch (error: any) {
    console.error(">>> ERRO GERAL API:", error);
    return NextResponse.json({ error: error?.message || "Erro interno." }, { status: 500 });
  }
}