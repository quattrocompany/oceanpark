"use client";

import { useState, useEffect } from "react";
import { upload } from "@vercel/blob/client";

interface ItemKit {
  id: string;
  nome: string;
  categoria: string;
  url: string;
  tamanho: string;
  dataUpload: string;
}

export default function UploadInterface() {
  const [dataSelecao, setDataSelecao] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  
  const [itensCadastrados, setItensCadastrados] = useState<ItemKit[]>([]);
  const [novosArquivos, setNovosArquivos] = useState<{ file: File; categoria: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const [filtroDataAdmin, setFiltroDataAdmin] = useState<string>("todas");

  const carregarArquivos = async () => {
    setLoadingList(true);
    try {
      const res = await fetch("/api/kit");
      const data = await res.json();
      if (res.ok && data.items) {
        setItensCadastrados(data.items);
      }
    } catch (e) {
      console.error("Erro ao carregar arquivos:", e);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    carregarArquivos();
  }, []);

  const autoDetectarCategoria = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase();
    if (ext === "zip" || ext === "rar") return "pacote_zip";
    if (ext === "pdf") return "lamina_pdf";
    if (["jpg", "jpeg", "png", "webp"].includes(ext || "")) return "imagem_avulsa";
    if (["mp4", "mov"].includes(ext || "")) return "video";
    return "imagem_avulsa";
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((file) => ({
        file,
        categoria: autoDetectarCategoria(file.name),
      }));
      setNovosArquivos((prev) => [...prev, ...filesArray]);
    }
  };

  const handleUpload = async () => {
    if (novosArquivos.length === 0) return;
    setUploading(true);

    try {
      for (const item of novosArquivos) {
        const pathname = `kit/${dataSelecao}/${item.categoria}/${item.file.name}`;

        // Realiza o envio direto do navegador para o Vercel Blob sem passar pelo limite de 4.5MB da Vercel
        await upload(pathname, item.file, {
          access: "public",
          handleUploadUrl: "/api/admin/upload",
        });
      }

      alert("Arquivos publicados e salvos com sucesso!");
      setNovosArquivos([]);
      await carregarArquivos();
    } catch (err: any) {
      console.error("Falha no upload:", err);
      alert(`Atenção: ${err.message || "Erro ao realizar o upload."}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeletar = async (url: string) => {
    if (confirm("Tem certeza que deseja apagar este arquivo do servidor?")) {
      try {
        const res = await fetch("/api/admin/delete", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
        });
        if (res.ok) {
          await carregarArquivos();
        } else {
          alert("Erro ao excluir o arquivo.");
        }
      } catch (err) {
        alert("Erro de conexão ao tentar excluir.");
      }
    }
  };

  const datasDisponiveis = Array.from(new Set(itensCadastrados.map((i) => i.dataUpload)));

  const itensFiltradosAdmin = itensCadastrados.filter((item) => {
    if (filtroDataAdmin === "todas") return true;
    return item.dataUpload === filtroDataAdmin;
  });

  return (
    <div className="space-y-10">
      
      {/* SEÇÃO 1: UPLOAD */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">1. Novo Upload em Lote</h2>
            <p className="text-sm text-gray-500">Selecione a data e envie os arquivos para a Vercel.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700">Data da Versão:</label>
            <input
              type="date"
              value={dataSelecao}
              onChange={(e) => setDataSelecao(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0c82a0]"
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-[#1E293B]/40 hover:border-[#0c82a0] rounded-xl p-8 text-center hover:bg-[#0c82a0]/5 transition-colors relative cursor-pointer">
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-12 h-12 bg-[#0c82a0]/10 text-[#0c82a0] rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-gray-700 font-bold">Arraste os arquivos aqui ou clique para selecionar</p>
          <p className="text-xs text-gray-400 mt-1">Identificação automática de ZIP, PDF, JPG e MP4.</p>
        </div>

        {novosArquivos.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3">
              {novosArquivos.length} arquivo(s) pronto(s) para enviar:
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
              {novosArquivos.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700 truncate">{item.file.name}</span>
                  <span className="bg-[#1E293B] text-white px-2 py-1 rounded text-[10px] font-bold uppercase">
                    {item.categoria.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-[#0c82a0] text-white font-bold py-3 rounded-lg hover:bg-[#096a82] transition-colors cursor-pointer disabled:opacity-50"
            >
              {uploading ? "Publicando no Vercel Blob..." : "Confirmar e Publicar Todos"}
            </button>
          </div>
        )}
      </div>

      {/* SEÇÃO 2: MATERIAIS PUBLICADOS */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">2. Materiais Publicados</h2>
            <p className="text-sm text-gray-500">Gerencie ou exclua arquivos do histórico no servidor.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Filtrar Histórico:</span>
            <select
              value={filtroDataAdmin}
              onChange={(e) => setFiltroDataAdmin(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 focus:outline-none"
            >
              <option value="todas">Todas as Datas</option>
              {datasDisponiveis.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>

        {loadingList ? (
          <p className="text-sm text-gray-500 text-center py-6">Carregando arquivos do servidor...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Nome do Arquivo</th>
                  <th className="p-3">Categoria</th>
                  <th className="p-3">Data</th>
                  <th className="p-3">Tamanho</th>
                  <th className="p-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {itensFiltradosAdmin.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-400">
                      Nenhum arquivo publicado até o momento.
                    </td>
                  </tr>
                ) : (
                  itensFiltradosAdmin.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="p-3 font-semibold text-gray-800 truncate max-w-[200px]">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#0c82a0]">
                          {item.nome}
                        </a>
                      </td>
                      <td className="p-3">
                        <span className="bg-[#0c82a0]/10 text-[#0c82a0] px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                          {item.categoria.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-gray-500">{item.dataUpload}</td>
                      <td className="p-3 text-gray-400">{item.tamanho}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeletar(item.url)}
                          className="text-red-500 hover:text-red-700 font-bold hover:underline cursor-pointer"
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}