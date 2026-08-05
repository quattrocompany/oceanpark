import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { nome, email, telefone, mensagem, captcha } = await request.json();

    // 1. Validar reCAPTCHA
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captcha}`;
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
    const recaptchaJson = await recaptchaRes.json();

    if (!recaptchaJson.success) {
      return NextResponse.json({ error: "Falha na verificação do reCAPTCHA." }, { status: 400 });
    }

    // 2. Configurar o transportador SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: true, // true para 465, false para outras portas
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // 3. Estruturar o E-mail
    const mailOptions = {
      from: `"Site Lumini 3" <${process.env.SMTP_USER}>`, // Remetente autenticado
      to: process.env.SMTP_USER, // Destinatário (pode ser o mesmo ou outro)
      replyTo: email, // Permite clicar em "Responder" e ir pro e-mail do cliente
      subject: `Novo Lead - Lumini 3: ${nome}`,
      html: `
        <h2>Novo contato recebido pelo site Lumini 3</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${telefone}</p>
        <br/>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem.replace(/\n/g, '<br/>')}</p>
      `,
    };

    // 4. Enviar
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "E-mail enviado com sucesso!" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return NextResponse.json({ error: "Erro interno ao processar o envio." }, { status: 500 });
  }
}