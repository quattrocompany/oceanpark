import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Força o Next.js a tratar essa rota como dinâmica no build
export const dynamic = "force-dynamic";

interface Lead {
  nome?: string;
  email?: string;
  telefone?: string;
  origem?: string;
  mensagem?: string;
  created_at?: string;
}

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json(
      { error: "Variáveis de ambiente do Supabase não encontradas." },
      { status: 500 }
    );
  }

  // Instancia o cliente do Supabase com segurança dentro da requisição
  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !leads) {
    return NextResponse.json({ error: "Erro ao buscar leads" }, { status: 500 });
  }

  // Adiciona BOM (\uFEFF) para garantir que o Excel abra acentos e caracteres especiais corretamente
  const header = "\uFEFFNome,Email,Telefone,Origem,Mensagem,Data\n";
  
  const rows = (leads as Lead[])
    .map(
      (l: Lead) =>
        `"${(l.nome || "").replace(/"/g, '""')}","${(l.email || "").replace(/"/g, '""')}","${(l.telefone || "").replace(/"/g, '""')}","${(l.origem || "").replace(/"/g, '""')}","${(l.mensagem || "").replace(/"/g, '""')}","${l.created_at || ""}"`
    )
    .join("\n");

  const csvContent = header + rows;

  return new Response(csvContent, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="leads_ocean_park_${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}