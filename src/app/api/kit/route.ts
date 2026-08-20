import { NextResponse } from "next/server";
import { storage } from "@/lib/firebase";
import { ref, listAll, getDownloadURL, getMetadata } from "firebase/storage";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rootRef = ref(storage, "kit");

    // Função recursiva para varrer as pastas no Firebase Storage
    const listRecursive = async (folderRef: any) => {
      const res = await listAll(folderRef);
      let filesList: any[] = [];

      for (const folder of res.prefixes) {
        const subFiles = await listRecursive(folder);
        filesList = [...filesList, ...subFiles];
      }

      for (const itemRef of res.items) {
        const url = await getDownloadURL(itemRef);
        const meta = await getMetadata(itemRef);
        const sizeMB = (meta.size / (1024 * 1024)).toFixed(2) + " MB";

        const ext = itemRef.name.split(".").pop()?.toLowerCase();
        let categoria = meta.customMetadata?.categoria;
        if (!categoria) {
          if (ext === "zip" || ext === "rar") categoria = "pacote_zip";
          else if (ext === "pdf") categoria = "lamina_pdf";
          else if (["jpg", "jpeg", "png", "webp"].includes(ext || "")) categoria = "imagem_avulsa";
          else if (["mp4", "mov"].includes(ext || "")) categoria = "video";
          else categoria = "imagem_avulsa";
        }

        filesList.push({
          id: itemRef.fullPath,
          nome: itemRef.name,
          categoria: categoria,
          url: url,
          tamanho: sizeMB,
          dataUpload: meta.customMetadata?.dataUpload || meta.timeCreated.split("T")[0],
        });
      }
      return filesList;
    };

    const items = await listRecursive(rootRef);

    return NextResponse.json({ items }, { status: 200 });
  } catch (error: any) {
    console.error(">>> ERRO AO LISTAR KIT DO FIREBASE:", error);
    return NextResponse.json(
      { error: error?.message || "Erro ao buscar arquivos." },
      { status: 500 }
    );
  }
}