import { cookies } from "next/headers";
import { NextResponse } from "next/server";

const VALID_USERS: Record<string, string> = {
  vendrix: "GAuys87H98*71ts",
  marketing: "Ricco9885*",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let username = body.username?.toString().trim().toLowerCase();
    const password = body.password?.toString().trim();

    // Remove o domínio se o usuário digitar no formato de e-mail (ex: vendrix@dominio.com -> vendrix)
    if (username && username.includes("@")) {
      username = username.split("@")[0];
    }

    if (username && VALID_USERS[username] === password) {
      const cookieStore = await cookies();

      cookieStore.set("admin_session", "autenticado", {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", 
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, message: "Usuário ou senha incorretos." },
      { status: 401 }
    );
  } catch (error) {
    console.error("Erro no servidor de login:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno no servidor." },
      { status: 500 }
    );
  }
}