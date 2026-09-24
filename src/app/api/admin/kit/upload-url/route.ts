import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getAdminBucket } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const EMPREENDIMENTO_ID = "ocean-park";
const ALLOWED_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/zip",
  "application/x-zip-compressed",
  "application/x-rar-compressed",
  "video/mp4",
  "video/quicktime",
  "video/webm",
]);

function sanitizeSegment(segment: string): string {
  return segment.replace(/\.\./g, "").replace(/[^a-zA-Z0-9._-]/g, "_");
}

/**
 * Gera uma URL assinada (v4, curta duração) para o navegador enviar o
 * arquivo DIRETO para o Cloud Storage. Isso evita o limite de tamanho de
 * corpo das funções serverless da Vercel (arquivos grandes como vídeos/ZIP
 * continuam funcionando), mas exige login válido para ser emitida —
 * diferente do fluxo antigo, que deixava o app gravar em qualquer caminho
 * do bucket usando só a config pública do Firebase.
 *
 * A categoria/data/empreendimento são gravados como metadados customizados
 * do próprio arquivo no Cloud Storage (equivalente ao customMetadata usado
 * antes pelo SDK cliente do Firebase), para preservar a listagem, o filtro
 * por data e a edição de categoria em massa do painel. Como a URL assinada
 * "trava" os cabeçalhos usados na assinatura, o navegador precisa reenviar
 * EXATAMENTE os mesmos cabeçalhos "x-goog-meta-*" retornados aqui.
 */
export async function POST(request: Request) {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const { fileName, contentType, data, categoria } = await request.json();

    if (!fileName || typeof fileName !== "string") {
      return NextResponse.json({ error: "fileName é obrigatório." }, { status: 400 });
    }
    if (!contentType || !ALLOWED_CONTENT_TYPES.has(contentType)) {
      return NextResponse.json({ error: "Tipo de arquivo não permitido." }, { status: 400 });
    }
    if (!data || typeof data !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
      return NextResponse.json({ error: "Data da versão inválida." }, { status: 400 });
    }

    const safeCategoria = sanitizeSegment(categoria || "imagem_avulsa");
    const safeFileName = sanitizeSegment(fileName);
    const path = `${EMPREENDIMENTO_ID}/${data}/${safeCategoria}/${safeFileName}`;

    const metadataHeaders: Record<string, string> = {
      "x-goog-meta-categoria": safeCategoria,
      "x-goog-meta-dataupload": data,
      "x-goog-meta-empreendimento": EMPREENDIMENTO_ID,
    };

    const bucket = getAdminBucket();
    const file = bucket.file(path);

    const [uploadUrl] = await file.getSignedUrl({
      version: "v4",
      action: "write",
      expires: Date.now() + 10 * 60 * 1000, // 10 minutos
      contentType,
      extensionHeaders: metadataHeaders,
    });

    return NextResponse.json({ uploadUrl, path, metadataHeaders });
  } catch (error: any) {
    console.error(">>> ERRO AO GERAR URL DE UPLOAD (ADMIN):", error);
    return NextResponse.json({ error: error?.message || "Erro ao preparar upload." }, { status: 500 });
  }
}
