import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Força a rota a ser dinâmica (evita pré-renderização no build)
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey =
      process.env.SUPABASE_SERVICE_ROLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    // Garante que o Supabase só seja instanciado se as chaves existirem
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: "Variáveis do Supabase não configuradas na Vercel." },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data: leads, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ leads }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Erro interno no servidor." },
      { status: 500 }
    );
  }
}