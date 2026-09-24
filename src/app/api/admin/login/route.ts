import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, createAdminSessionToken, verifyAdminCredentials } from "@/lib/adminAuth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    let username = body.username?.toString().trim().toLowerCase();
    const password = body.password?.toString().trim();

    // Remove o sufixo de e-mail caso o usuário digite com @ (ex: marketing@vendrix.com -> marketing)
    if (username && username.includes("@")) {
      username = username.split("@")[0];
    }

    if (!username || !password) {
      return NextResponse.json(
        { success: false, message: "Usuário ou senha incorretos." },
        { status: 401 }
      );
    }

    const authenticatedUser = verifyAdminCredentials(username, password);

    if (authenticatedUser) {
      const cookieStore = await cookies();

      cookieStore.set(ADMIN_SESSION_COOKIE, createAdminSessionToken(authenticatedUser), {
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
