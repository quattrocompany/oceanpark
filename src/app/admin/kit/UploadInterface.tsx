"use client";

import { useState, useEffect } from "react";
import { storage } from "@/lib/firebase";
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  listAll,
  deleteObject,
  getMetadata,
} from "firebase/storage";

interface ItemKit {
  id: string;
  nome: string;
  categoria: string;
  url: string;
  tamanho: string;
  dataUpload: string;
  fullPath: string;
}

export default function UploadInterface() {
  const [dataSelecao, setDataSelecao] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [itensCadastrados, setItensCadastrados] = useState<ItemKit[]>([]);
  const [novosArquivos, setNovosArquivos] = useState<{ file: File; categoria: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progresso, setProgresso] = useState<number>(0);
  const [loadingList, setLoadingList] = useState(true);
  const [filtroDataAdmin, setFiltroDataAdmin] = useState<string>("todas");

  const carregarArquivos = async () => {
    setLoadingList(true);
    try {
      const rootRef = ref(storage, "kit");
      const listRecursive = async (folderRef: any): Promise<ItemKit[]> => {
        const res = await listAll(folderRef);
        let filesList: ItemKit[] = [];

        for (const folder of res.prefixes) {
          const subFiles = await listRecursive(folder);
          filesList = [...filesList, ...subFiles];
        }

        for (const itemRef of res.items) {
          const url = await getDownloadURL(itemRef);
          const meta = await getMetadata(itemRef);
          const sizeMB = (meta.size / (1024 * 1024)).toFixed(2) + " MB";

          filesList.push({
            id: itemRef.fullPath,
            nome: itemRef.name,
            categoria: meta.customMetadata?.categoria || autoDetectarCategoria(itemRef.name),
            url: url,
            tamanho: sizeMB,
            dataUpload: meta.customMetadata?.dataUpload || meta.timeCreated.split("T")[0],
            fullPath: itemRef.fullPath,
          });
        }
        return filesList;
      };

      const todos = await listRecursive(rootRef);
      setItensCadastrados(todos);
    } catch (e) {
      console.error("Erro ao carregar arquivos do Firebase:", e);
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
    setProgresso(0);

    try {
      const totalArquivos = novosArquivos.length;
      let concluidos = 0;

      for (const item of novosArquivos) {
        const storagePath = `kit/${dataSelecao}/${item.categoria}/${item.file.name}`;
        const fileRef = ref(storage, storagePath);

        const metadata = {
          customMetadata: {
            categoria: item.categoria,
            dataUpload: dataSelecao,
          },
        };

        const uploadTask = uploadBytesResumable(fileRef, item.file, metadata);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const fileProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload ${item.file.name}: ${fileProgress.toFixed(0)}%`);
            },
            (error) => reject(error),
            () => {
              concluidos++;
              setProgresso(Math.round((concluidos / totalArquivos) * 100));
              resolve();
            }
          );
        });
      }

      alert("Arquivos publicados com sucesso no Firebase!");
      setNovosArquivos([]);
      setProgresso(0);
      await carregarArquivos();
    } catch (err: any) {
      console.error("Falha no upload:", err);
      alert(`Atenção: ${err.message || "Erro ao realizar o upload."}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDeletar = async (fullPath: string) => {
    if (confirm("Tem certeza que deseja apagar este arquivo do Firebase?")) {
      try {
        const fileRef = ref(storage, fullPath);
        await deleteObject(fileRef);
        alert("Arquivo excluído com sucesso!");
        await carregarArquivos();
      } catch (err) {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir o arquivo.");
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
            <p className="text-sm text-gray-500">Selecione a data e envie os arquivos para o Firebase Storage.</p>
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

            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-[#0c82a0] h-2.5 rounded-full transition-all duration-300" style={{ width: `${progresso}%` }}></div>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-[#0c82a0] text-white font-bold py-3 rounded-lg hover:bg-[#096a82] transition-colors cursor-pointer disabled:opacity-50"
            >
              {uploading ? `Enviando... ${progresso}%` : "Confirmar e Publicar Todos"}
            </button>
          </div>
        )}
      </div>

      {/* SEÇÃO 2: MATERIAIS PUBLICADOS */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-800">2. Materiais Publicados</h2>
            <p className="text-sm text-gray-500">Gerencie ou exclua arquivos hospedados no Firebase Storage.</p>
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
          <p className="text-sm text-gray-500 text-center py-6">Carregando arquivos do Firebase...</p>
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
                          onClick={() => handleDeletar(item.fullPath)}
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