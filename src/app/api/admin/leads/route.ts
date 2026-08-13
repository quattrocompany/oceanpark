import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { senha } = body;

    // 1. Valida a senha do Ocean Park
    if (senha !== "Ocean2026!") {
      return NextResponse.json({ error: "Senha incorreta." }, { status: 401 });
    }

    // 2. Conecta ao Supabase usando a chave de administrador (Service Role)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: "Configuração do banco ausente." }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    // 3. Busca todos os leads do Ocean Park
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(">>> ERRO SUPABASE LEADS OCEAN PARK:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, leads: data || [] }, { status: 200 });
  } catch (error: any) {
    console.error(">>> ERRO API ADMIN LEADS:", error);
    return NextResponse.json({ error: error?.message || "Erro interno." }, { status: 500 });
  }
}