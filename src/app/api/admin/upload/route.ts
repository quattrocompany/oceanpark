import { handleUpload, type HandleUploadBody } from "@vercel/blob/client";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        return {
          allowedContentTypes: [
            "image/jpeg",
            "image/png",
            "image/webp",
            "application/pdf",
            "application/zip",
            "application/x-zip-compressed",
            "application/x-rar-compressed",
            "video/mp4",
            "video/quicktime",
          ],
          addRandomSuffix: false,
          tokenPayload: JSON.stringify({}),
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log("Upload do Vercel Blob concluído com sucesso:", blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error("Erro na geração do token de upload:", error);
    return NextResponse.json(
      { error: error?.message || "Erro interno no servidor de upload." },
      { status: 400 }
    );
  }
}