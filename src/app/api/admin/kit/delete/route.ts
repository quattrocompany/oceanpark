import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getAdminBucket } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const EMPREENDIMENTO_ID = "ocean-park";

export async function POST(request: Request) {
  try {
    // Este era o ponto citado pela Exent: exclusão de arquivos do Kit
    // Corretor era feita direto do navegador via SDK público do Firebase,
    // sem nenhuma verificação de login no servidor.
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const body = await request.json();
    const paths: string[] = Array.isArray(body.paths) ? body.paths : body.fullPath ? [body.fullPath] : [];

    if (paths.length === 0) {
      return NextResponse.json({ error: "Nenhum arquivo informado." }, { status: 400 });
    }

    // Só permite apagar dentro da pasta do empreendimento, nunca fora dela.
    const invalido = paths.find((p) => typeof p !== "string" || !p.startsWith(`${EMPREENDIMENTO_ID}/`));
    if (invalido) {
      return NextResponse.json({ error: "Caminho de arquivo inválido." }, { status: 400 });
    }

    const bucket = getAdminBucket();
    await Promise.all(paths.map((p) => bucket.file(p).delete({ ignoreNotFound: true })));

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(">>> ERRO AO EXCLUIR ARQUIVOS DO KIT (ADMIN):", error);
    return NextResponse.json({ error: error?.message || "Erro ao excluir arquivo(s)." }, { status: 500 });
  }
}
