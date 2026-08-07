import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "Token do Vercel Blob não encontrado (.env.local)." },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const categoria = formData.get("categoria") as string;
    const dataUpload = formData.get("dataUpload") as string;

    if (!file || !categoria || !dataUpload) {
      return NextResponse.json(
        { error: "Arquivo ou informações pendentes na requisição." },
        { status: 400 }
      );
    }

    const pathname = `kit/${dataUpload}/${categoria}/${file.name}`;
    
    const blob = await put(pathname, file, {
      access: "public",
      addRandomSuffix: false,
      token: token, 
    });

    return NextResponse.json(blob);
  } catch (error: any) {
    console.error("Erro no upload do Vercel Blob:", error);
    return NextResponse.json(
      { error: error?.message || "Erro interno no servidor de upload." },
      { status: 500 }
    );
  }
}