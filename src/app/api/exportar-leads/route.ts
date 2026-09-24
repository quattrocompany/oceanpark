import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { isAdminAuthenticated } from "@/lib/adminAuth";

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

// Evita "CSV injection": se um lead preencher o nome/mensagem começando com
// =, +, -, @ etc., o Excel pode interpretar isso como uma fórmula ao abrir
// o arquivo. Prefixamos com aspa simples para neutralizar.
function csvSafe(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

export async function GET() {
  // Exigido pela Exent: essa rota expunha nome, e-mail e telefone de todos os
  // leads para download sem nenhuma verificação de login (risco de LGPD).
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json(
      { error: "Não autorizado. Faça login no painel administrativo para exportar os leads." },
      { status: 401 }
    );
  }

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

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !leads) {
    return NextResponse.json({ error: "Erro ao buscar leads" }, { status: 500 });
  }

  // Adiciona BOM (﻿) para garantir que o Excel abra acentos e caracteres especiais corretamente
  const header = "﻿Nome,Email,Telefone,Origem,Mensagem,Data\n";

  const rows = (leads as Lead[])
    .map(
      (l: Lead) =>
        `"${csvSafe((l.nome || "").replace(/"/g, '""'))}","${csvSafe((l.email || "").replace(/"/g, '""'))}","${csvSafe((l.telefone || "").replace(/"/g, '""'))}","${csvSafe((l.origem || "").replace(/"/g, '""'))}","${csvSafe((l.mensagem || "").replace(/"/g, '""'))}","${l.created_at || ""}"`
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
