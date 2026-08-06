import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Credenciais exclusivas da agência
    if (username === "vendrix" && password === "GAuys87H98*71ts") {
      cookies().set("admin_session", "autenticado", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, // Fica logado por 7 dias
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Usuário ou senha incorretos." },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}