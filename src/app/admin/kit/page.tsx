import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import UploadInterface from "./UploadInterface";

export default function AdminKitPage() {
  // Verifica se a agência fez o login através do cookie
  const session = cookies().get("admin_session");
  
  if (!session?.value) {
    redirect("/admin"); // Expulsa de volta para o login se não tiver permissão
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-[1000px] mx-auto px-6">
        <div className="flex justify-between items-end mb-8 border-b pb-4">
          <div>
            <h1 className="text-3xl font-black text-[#0C82A0]">Gestão do Kit Corretor</h1>
            <p className="text-gray-500">Faça upload em lote dos materiais para a página pública.</p>
          </div>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
            Agência Logada
          </span>
        </div>
        
        {/* Chama o componente visual de Upload */}
        <UploadInterface />

      </div>
    </main>
  );
}