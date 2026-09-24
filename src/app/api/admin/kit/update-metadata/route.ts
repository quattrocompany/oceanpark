import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getAdminBucket } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const EMPREENDIMENTO_ID = "ocean-park";

/**
 * Endpoint novo: antes a edição de categoria em massa do painel chamava
 * updateMetadata() direto do navegador via SDK público do Firebase, sem
 * nenhuma verificação de login. Agora passa pelo mesmo gate de autenticação
 * das outras rotas administrativas e só altera arquivos dentro da pasta do
 * próprio empreendimento.
 */
export async function POST(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const body = await request.json();
    const paths: string[] = Array.isArray(body.paths) ? body.paths : [];
    const categoria = typeof body.categoria === "string" ? body.categoria.trim().toLowerCase() : "";

    if (paths.length === 0) {
      return NextResponse.json({ error: "Nenhum arquivo informado." }, { status: 400 });
    }
    if (!categoria) {
      return NextResponse.json({ error: "Categoria é obrigatória." }, { status: 400 });
    }

    const invalido = paths.find((p) => typeof p !== "string" || !p.startsWith(`${EMPREENDIMENTO_ID}/`));
    if (invalido) {
      return NextResponse.json({ error: "Caminho de arquivo inválido." }, { status: 400 });
    }

    const bucket = getAdminBucket();
    await Promise.all(
      paths.map((p) =>
        bucket.file(p).setMetadata({
          metadata: { categoria },
        })
      )
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error(">>> ERRO AO ATUALIZAR CATEGORIA DO KIT (ADMIN):", error);
    return NextResponse.json({ error: error?.message || "Erro ao atualizar categoria." }, { status: 500 });
  }
}
