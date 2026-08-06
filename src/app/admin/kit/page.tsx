import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import UploadInterface from "./UploadInterface";

export default function AdminKitPage() {
  const session = cookies().get("admin_session");
  
  if (!session?.value) {
    redirect("/admin");
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col justify-between pt-28">
      <div className="max-w-[1000px] mx-auto px-6 w-full flex-1 pb-16">
        <div className="flex justify-between items-end mb-8 border-b pb-4">
          <div>
            <h1 className="text-3xl font-black text-[#0C82A0]">Gestão do Kit Corretor</h1>
            <p className="text-gray-500">Faça upload em lote dos materiais para a página pública.</p>
          </div>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
            Agência Logada
          </span>
        </div>
        
        <UploadInterface />
      </div>

      {/* RODAPÉ ILUSTRATIVO POLVO E PRAIA */}
      <div className="w-full relative leading-none bg-[#0C82A0]">
        <Image
          src="/img/kit/polvopraia.jpg"
          alt="Ilustração Ocean Park Praia Admin"
          width={1920}
          height={300}
          quality={100}
          className="w-full h-auto block object-cover"
        />
      </div>
    </main>
  );
}