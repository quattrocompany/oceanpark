"use client";

import { useState } from "react";

interface ItemKit {
  id: string;
  nome: string;
  categoria: "pacote_zip" | "lamina_pdf" | "imagem_avulsa" | "video";
  url: string;
  tamanho: string;
  dataUpload: string;
}

export default function UploadInterface() {
  const [dataSelecao, setDataSelecao] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  
  // Lista simulada de arquivos existentes no servidor
  const [itensCadastrados, setItensCadastrados] = useState<ItemKit[]>([
    {
      id: "1",
      nome: "Imagens_Perspectivas_HD.zip",
      categoria: "pacote_zip",
      url: "/img/Mobilidade e Praticidade/01.jpg",
      tamanho: "45.2 MB",
      dataUpload: "2026-08-07",
    },
    {
      id: "2",
      nome: "Lamina_Comercial_OceanPark.pdf",
      categoria: "lamina_pdf",
      url: "#",
      tamanho: "12.8 MB",
      dataUpload: "2026-08-07",
    },
    {
      id: "3",
      nome: "Fachada_Residencial.jpg",
      categoria: "imagem_avulsa",
      url: "/img/Mobilidade e Praticidade/01.jpg",
      tamanho: "3.1 MB",
      dataUpload: "2026-08-01",
    },
  ]);

  const [novosArquivos, setNovosArquivos] = useState<
    { file: File; categoria: string }[]
  >([]);
  const [uploading, setUploading] = useState(false);
  const [filtroDataAdmin, setFiltroDataAdmin] = useState<string>("todas");

  // Detecta a extensão do arquivo e categoriza automaticamente
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

  const handleUpload = () => {
    if (novosArquivos.length === 0) return;
    setUploading(true);

    setTimeout(() => {
      const novosItensCadastrados: ItemKit[] = novosArquivos.map((item, index) => ({
        id: Date.now().toString() + index,
        nome: item.file.name,
        categoria: item.categoria as any,
        url: "#",
        tamanho: `${(item.file.size / 1024 / 1024).toFixed(1)} MB`,
        dataUpload: dataSelecao,
      }));

      setItensCadastrados((prev) => [...novosItensCadastrados, ...prev]);
      setNovosArquivos([]);
      setUploading(false);
      alert("Arquivos enviados e vinculados à data com sucesso!");
    }, 1200);
  };

  const handleDeletar = (id: string) => {
    if (confirm("Tem certeza que deseja excluir este arquivo do Kit Corretor?")) {
      setItensCadastrados((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const itensFiltradosAdmin = itensCadastrados.filter((item) => {
    if (filtroDataAdmin === "todas") return true;
    return item.dataUpload === filtroDataAdmin;
  });

  return (
    <div className="space-y-10">
      
      {/* SEÇÃO 1: ÁREA DE UPLOAD E SELEÇÃO DE DATA */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-xl font-bold text-gray-800">1. Novo Upload em Lote</h2>
            <p className="text-sm text-gray-500">Selecione a data de publicação da semana e suba os arquivos.</p>
          </div>
          <div className="flex items-center gap-3">
            <label className="text-sm font-semibold text-gray-700">Data da Versão:</label>
            <input
              type="date"
              value={dataSelecao}
              onChange={(e) => setDataSelecao(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-bold text-[#0C82A0] focus:outline-none focus:ring-2 focus:ring-[#0C82A0]"
            />
          </div>
        </div>

        {/* Zona Drag & Drop */}
        <div className="border-2 border-dashed border-[#0C82A0]/40 hover:border-[#0C82A0] rounded-xl p-8 text-center hover:bg-[#0C82A0]/5 transition-colors relative cursor-pointer">
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-12 h-12 bg-[#0C82A0]/10 text-[#0C82A0] rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-gray-700 font-bold">Arraste os arquivos aqui ou clique para selecionar</p>
          <p className="text-xs text-gray-400 mt-1">O sistema identifica automaticamente ZIPs, PDFs e Imagens.</p>
        </div>

        {/* Pré-visualização antes de confirmar upload */}
        {novosArquivos.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <h3 className="text-sm font-bold text-gray-700 mb-3">
              {novosArquivos.length} arquivo(s) pronto(s) para subir na data ({dataSelecao}):
            </h3>
            <div className="space-y-2 max-h-48 overflow-y-auto mb-4">
              {novosArquivos.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <span className="font-semibold text-gray-700 truncate">{item.file.name}</span>
                  <span className="bg-[#0C82A0] text-white px-2 py-1 rounded text-[10px] font-bold uppercase">
                    {item.categoria.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-[#DD6810] text-white font-bold py-3 rounded-lg hover:bg-[#c45a0d] transition-colors cursor-pointer disabled:opacity-50"
            >
              {uploading ? "Publicando Arquivos..." : "Confirmar e Publicar Todos"}
            </button>
          </div>
        )}
      </div>

      {/* SEÇÃO 2: GERENCIADOR DE ATIVOS (HISTÓRICO E EXCLUSÃO) */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">2. Materiais Publicados</h2>
            <p className="text-sm text-gray-500">Gerencie, exclua ou consulte versões anteriores.</p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Filtrar Histórico:</span>
            <select
              value={filtroDataAdmin}
              onChange={(e) => setFiltroDataAdmin(e.target.value)}
              className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 focus:outline-none"
            >
              <option value="todas">Todas as Datas</option>
              <option value="2026-08-07">2026-08-07 (Atual)</option>
              <option value="2026-08-01">2026-08-01</option>
            </select>
          </div>
        </div>

        {/* Tabela de Arquivos */}
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
              {itensFiltradosAdmin.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="p-3 font-semibold text-gray-800 truncate max-w-[200px]">{item.nome}</td>
                  <td className="p-3">
                    <span className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-[10px] font-bold uppercase">
                      {item.categoria.replace("_", " ")}
                    </span>
                  </td>
                  <td className="p-3 font-medium text-gray-500">{item.dataUpload}</td>
                  <td className="p-3 text-gray-400">{item.tamanho}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeletar(item.id)}
                      className="text-red-500 hover:text-red-700 font-bold hover:underline cursor-pointer"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}