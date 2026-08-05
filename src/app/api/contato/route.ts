import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(request: Request) {
  try {
    const { nome, email, telefone, mensagem, captcha, via } = await request.json();

    console.log("--- INÍCIO DO PROCESSAMENTO DE LEAD ---");
    console.log("Lead:", { nome, email, telefone, via });

    // 1. Validar reCAPTCHA no Google (Formato application/x-www-form-urlencoded)
    if (captcha && process.env.RECAPTCHA_SECRET_KEY) {
      const params = new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: captcha,
      });

      const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      const recaptchaJson = await recaptchaRes.json();
      console.log("Resposta do reCAPTCHA:", recaptchaJson);

      if (!recaptchaJson.success) {
        console.error("Erro no reCAPTCHA:", recaptchaJson["error-codes"]);
        return NextResponse.json(
          { error: "Falha na verificação do reCAPTCHA." },
          { status: 400 }
        );
      }
    }

    // 2. Gravar Lead no Supabase
    const { error: dbError } = await supabase.from("leads").insert([
      {
        nome,
        email,
        telefone,
        mensagem: mensagem || "Contato via site",
        origem: via === "whatsapp" ? "WhatsApp Modal" : "Formulário de Contato",
      },
    ]);

    if (dbError) {
      console.error("Erro ao salvar no Supabase:", dbError);
    } else {
      console.log("Lead gravado com sucesso no Supabase!");
    }

    // 3. Tentar enviar e-mail por Nodemailer (se configurado)
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 465,
          secure: true,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"Site Ocean Park" <${process.env.SMTP_USER}>`,
          to: process.env.SMTP_USER,
          replyTo: email,
          subject: `Novo Lead - Ocean Park: ${nome}`,
          html: `
            <h2>Novo contato recebido pelo site Ocean Park</h2>
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Origem:</strong> ${via === "whatsapp" ? "Atendimento WhatsApp" : "Formulário de Contato"}</p>
            <br/>
            <p><strong>Mensagem:</strong></p>
            <p>${(mensagem || "").replace(/\n/g, '<br/>')}</p>
          `,
        });
        console.log("E-mail de notificação enviado!");
      } catch (emailErr) {
        console.error("Erro no e-mail (Lead salvo no banco):", emailErr);
      }
    }

    return NextResponse.json({ success: true, message: "Lead processado com sucesso!" }, { status: 200 });

  } catch (error) {
    console.error("Erro interno no servidor:", error);
    return NextResponse.json({ error: "Erro interno ao processar o envio." }, { status: 500 });
  }
}