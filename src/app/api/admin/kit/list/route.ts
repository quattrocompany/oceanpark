import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import { getAdminBucket } from "@/lib/firebaseAdmin";

export const dynamic = "force-dynamic";

const EMPREENDIMENTO_ID = "ocean-park";

interface ItemKit {
  id: string;
  nome: string;
  categoria: string;
  url: string;
  tamanho: string;
  dataUpload: string;
  fullPath: string;
}

function autoDetectarCategoria(nome: string): string {
  const ext = nome.split(".").pop()?.toLowerCase() || "";
  if (ext === "zip" || ext === "rar") return "pacote_zip";
  if (ext === "pdf") return nome.toLowerCase().includes("tabela") ? "tabela_precos" : "lamina_pdf";
  if (["mp4", "mov", "webm", "avi", "m4v"].includes(ext)) return "video";
  return "imagem_avulsa";
}

export async function GET() {
  try {
    if (!(await isAdminAuthenticated())) {
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    const bucket = getAdminBucket();
    const [files] = await bucket.getFiles({ prefix: `${EMPREENDIMENTO_ID}/` });

    const itens: ItemKit[] = await Promise.all(
      files
        .filter((f) => !f.name.endsWith("/"))
        .map(async (file) => {
          const [meta] = await file.getMetadata();
          const [url] = await file.getSignedUrl({
            action: "read",
            expires: Date.now() + 60 * 60 * 1000, // 1 hora
          });

          const customMetadata = (meta.metadata || {}) as Record<string, string>;
          const sizeBytes = Number(meta.size || 0);
          const sizeMB = (sizeBytes / (1024 * 1024)).toFixed(1) + " MB";

          return {
            id: file.name,
            nome: file.name.split("/").pop() || file.name,
            categoria: customMetadata.categoria || autoDetectarCategoria(file.name),
            url,
            tamanho: sizeMB,
            dataUpload: customMetadata.dataUpload || (meta.timeCreated || "").split("T")[0] || "Data Desconhecida",
            fullPath: file.name,
          };
        })
    );

    return NextResponse.json({ items: itens });
  } catch (error: any) {
    console.error(">>> ERRO AO LISTAR KIT (ADMIN):", error);
    return NextResponse.json({ error: error?.message || "Erro ao buscar arquivos." }, { status: 500 });
  }
}
