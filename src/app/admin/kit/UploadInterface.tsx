"use client";

import { useState, useEffect, useRef, DragEvent } from "react";

interface ItemKit {
  id: string;
  nome: string;
  categoria: string;
  url: string;
  tamanho: string;
  dataUpload: string;
  fullPath: string;
}

const EMPREENDIMENTO_ID = "ocean-park";

// Filtro estrito de extensão: libera PDFs, ZIPs e Vídeos sem passar pelo FileReader
const comprimirImagem = (file: File, maxWidth = 1920, quality = 0.8): Promise<File> => {
  return new Promise((resolve) => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    if (!["jpg", "jpeg", "png", "webp"].includes(ext)) {
      return resolve(file);
    }

    const timer = setTimeout(() => resolve(file), 4000);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = document.createElement("img");
      img.src = event.target?.result as string;
      img.onload = () => {
        clearTimeout(timer);
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx?.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              const nomeSemExt = file.name.substring(0, file.name.lastIndexOf(".")) || file.name;
              const novoArquivo = new File([blob], `${nomeSemExt}.webp`, {
                type: "image/webp",
                lastModified: Date.now(),
              });
              resolve(novoArquivo);
            } else {
              resolve(file);
            }
          },
          "image/webp",
          quality
        );
      };
      img.onerror = () => {
        clearTimeout(timer);
        resolve(file);
      };
    };
    reader.onerror = () => {
      clearTimeout(timer);
      resolve(file);
    };
  });
};

// Envia o arquivo direto para a URL assinada do Cloud Storage via XHR (permite
// acompanhar o progresso, diferente de fetch). Os cabeçalhos "x-goog-meta-*"
// precisam ser exatamente os mesmos usados para gerar a assinatura no servidor.
function enviarArquivoComProgresso(
  uploadUrl: string,
  file: File,
  metadataHeaders: Record<string, string>,
  onProgress: (pct: number) => void
): Promise<void> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", uploadUrl, true);
    xhr.setRequestHeader("Content-Type", file.type);
    for (const [key, value] of Object.entries(metadataHeaders)) {
      xhr.setRequestHeader(key, value);
    }

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        onProgress((event.loaded / event.total) * 100);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve();
      } else {
        reject(new Error(`Falha no upload (status ${xhr.status}).`));
      }
    };
    xhr.onerror = () => reject(new Error("Erro de rede ao enviar o arquivo."));

    xhr.send(file);
  });
}

export default function UploadInterface() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dataSelecao, setDataSelecao] = useState<string>(
    new Date().toISOString().split("T")[0]
  );

  const [itensCadastrados, setItensCadastrados] = useState<ItemKit[]>([]);
  const [novosArquivos, setNovosArquivos] = useState<{ file: File; categoria: string }[]>([]);
  const [uploading, setUploading] = useState(false);
  const [statusTexto, setStatusTexto] = useState<string>("");
  const [progresso, setProgresso] = useState<number>(0);
  const [loadingList, setLoadingList] = useState(true);
  const [filtroDataAdmin, setFiltroDataAdmin] = useState<string>("todas");
  const [selecionados, setSelecionados] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  const autoDetectarCategoria = (file: File, relativePath = ""): string => {
    const name = file.name.toLowerCase();
    const path = (relativePath || file.webkitRelativePath || "").toLowerCase();
    const ext = name.split(".").pop() || "";

    if (ext === "zip" || ext === "rar") return "pacote_zip";

    if (ext === "pdf") {
      if (name.includes("tabela") || path.includes("tabela")) return "tabela_precos";
      return "lamina_pdf";
    }

    if (["mp4", "mov", "webm", "avi", "m4v"].includes(ext) || path.includes("video") || path.includes("vídeo") || name.includes("video")) {
      return "video";
    }

    if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) {
      if (path.includes("story") || name.includes("story")) return "imagem_story";
      if (path.includes("feed") || name.includes("feed")) return "imagem_feed";
      return "imagem_avulsa";
    }

    return "imagem_avulsa";
  };

  const escanearEntrada = async (entry: any, path = ""): Promise<{ file: File; relativePath: string }[]> => {
    if (entry.isFile) {
      return new Promise((resolve) => {
        entry.file(
          (f: File) => {
            if (f.size > 0) {
              resolve([{ file: f, relativePath: path + f.name }]);
            } else {
              resolve([]);
            }
          },
          () => resolve([])
        );
      });
    } else if (entry.isDirectory) {
      const dirReader = entry.createReader();
      const lerTodasEntradas = async (): Promise<any[]> => {
        let entradas: any[] = [];
        let ler = async () => {
          const res = await new Promise<any[]>((resolve) =>
            dirReader.readEntries((e: any[]) => resolve(e), () => resolve([]))
          );
          if (res.length > 0) {
            entradas = entradas.concat(res);
            await ler();
          }
        };
        await ler();
        return entradas;
      };

      const entradas = await lerTodasEntradas();
      let arquivos: { file: File; relativePath: string }[] = [];
      for (const child of entradas) {
        const subArquivos = await escanearEntrada(child, `${path}${entry.name}/`);
        arquivos = [...arquivos, ...subArquivos];
      }
      return arquivos;
    }
    return [];
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const items = e.dataTransfer.items;
    let arquivosEncontrados: { file: File; categoria: string }[] = [];

    if (items) {
      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.kind === "file") {
          const entry = item.webkitGetAsEntry();
          if (entry) {
            const arquivosEscaneados = await escanearEntrada(entry);
            for (const itemScanned of arquivosEscaneados) {
              if (itemScanned.file && itemScanned.file.size > 0) {
                arquivosEncontrados.push({
                  file: itemScanned.file,
                  categoria: autoDetectarCategoria(itemScanned.file, itemScanned.relativePath),
                });
              }
            }
          }
        }
      }
    }

    if (arquivosEncontrados.length > 0) {
      setNovosArquivos((prev) => [...prev, ...arquivosEncontrados]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
        .filter((file) => file.size > 0)
        .map((file) => ({
          file,
          categoria: autoDetectarCategoria(file),
        }));
      setNovosArquivos((prev) => [...prev, ...filesArray]);
    }
  };

  const carregarArquivos = async () => {
    setLoadingList(true);
    try {
      const res = await fetch("/api/admin/kit/list");

      if (res.status === 401) {
        window.location.replace("/admin");
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao carregar arquivos.");

      setItensCadastrados(data.items || []);
    } catch (e) {
      console.error("Erro ao carregar arquivos do Kit Corretor:", e);
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    carregarArquivos();
  }, []);

  const handleUpload = async () => {
    if (novosArquivos.length === 0) return;
    setUploading(true);
    setProgresso(0);

    try {
      const totalArquivos = novosArquivos.length;
      let concluidos = 0;

      for (let i = 0; i < novosArquivos.length; i++) {
        const item = novosArquivos[i];
        const tamanhoMB = (item.file.size / (1024 * 1024)).toFixed(1);
        setStatusTexto(`Enviando (${i + 1}/${totalArquivos}): "${item.file.name}" (${tamanhoMB} MB)...`);

        const arquivoParaUpload = await comprimirImagem(item.file);

        // 1. Pede ao servidor uma URL assinada (exige login) para este arquivo.
        const urlRes = await fetch("/api/admin/kit/upload-url", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: arquivoParaUpload.name,
            contentType: arquivoParaUpload.type,
            data: dataSelecao,
            categoria: item.categoria,
          }),
        });

        if (urlRes.status === 401) {
          window.location.replace("/admin");
          return;
        }

        const urlData = await urlRes.json();
        if (!urlRes.ok) throw new Error(urlData.error || "Erro ao preparar upload.");

        // 2. Envia o arquivo direto para o Cloud Storage usando a URL assinada.
        await enviarArquivoComProgresso(urlData.uploadUrl, arquivoParaUpload, urlData.metadataHeaders || {}, (pct) => {
          setStatusTexto(`Enviando (${i + 1}/${totalArquivos}): "${item.file.name}" - ${pct.toFixed(0)}%`);
        });

        concluidos++;
        setProgresso(Math.round((concluidos / totalArquivos) * 100));
      }

      alert("Arquivos do Ocean Park publicados com sucesso!");
      setNovosArquivos([]);
      setProgresso(0);
      setStatusTexto("");
      await carregarArquivos();
    } catch (err: any) {
      console.error("Falha no upload:", err);
      alert(`Atenção: ${err.message || "Erro ao realizar o upload."}`);
    } finally {
      setUploading(false);
      setStatusTexto("");
    }
  };

  const excluirNoServidor = async (paths: string[]) => {
    const res = await fetch("/api/admin/kit/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths }),
    });

    if (res.status === 401) {
      window.location.replace("/admin");
      throw new Error("Sessão expirada.");
    }

    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Erro ao excluir arquivo(s).");
  };

  const handleDeletar = async (fullPath: string) => {
    if (confirm("Tem certeza que deseja apagar este arquivo?")) {
      try {
        await excluirNoServidor([fullPath]);
        alert("Arquivo excluído com sucesso!");
        setSelecionados((prev) => prev.filter((p) => p !== fullPath));
        await carregarArquivos();
      } catch (err) {
        console.error("Erro ao excluir:", err);
        alert("Erro ao excluir o arquivo.");
      }
    }
  };

  const handleDeletarEmMassa = async () => {
    if (confirm(`Tem certeza que deseja excluir os ${selecionados.length} arquivo(s) selecionado(s)?`)) {
      setLoadingList(true);
      try {
        await excluirNoServidor(selecionados);
        alert("Arquivos excluídos com sucesso!");
        setSelecionados([]);
        await carregarArquivos();
      } catch (err) {
        console.error("Erro ao excluir arquivos em massa:", err);
        alert("Erro ao excluir alguns arquivos. Tente novamente.");
        setLoadingList(false);
      }
    }
  };

  const handleEditarEmMassa = async () => {
    const novaCategoria = prompt(
      "Digite a nova categoria para os arquivos selecionados:\nEx: tabela_precos, lamina_pdf, imagem_feed, imagem_story, imagem_avulsa, video, pacote_zip"
    );

    if (!novaCategoria || novaCategoria.trim() === "") return;

    setLoadingList(true);
    try {
      const res = await fetch("/api/admin/kit/update-metadata", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paths: selecionados, categoria: novaCategoria.trim().toLowerCase() }),
      });

      if (res.status === 401) {
        window.location.replace("/admin");
        return;
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erro ao atualizar categoria.");

      alert("Categorias atualizadas com sucesso!");
      setSelecionados([]);
      await carregarArquivos();
    } catch (err) {
      console.error("Erro ao editar arquivos em massa:", err);
      alert("Erro ao atualizar os arquivos. Tente novamente.");
      setLoadingList(false);
    }
  };

  const toggleSelectAll = (checked: boolean, itensAtuais: ItemKit[]) => {
    if (checked) {
      setSelecionados(itensAtuais.map((i) => i.fullPath));
    } else {
      setSelecionados([]);
    }
  };

  const toggleSelect = (fullPath: string) => {
    setSelecionados((prev) =>
      prev.includes(fullPath)
        ? prev.filter((p) => p !== fullPath)
        : [...prev, fullPath]
    );
  };

  const datasDisponiveis = Array.from(new Set(itensCadastrados.map((i) => i.dataUpload)));

  const itensFiltradosAdmin = itensCadastrados.filter((item) => {
    if (filtroDataAdmin === "todas") return true;
    return item.dataUpload === filtroDataAdmin;
  });

  return (
    <div className="space-y-6 sm:space-y-10">
      <input
        ref={fileInputRef}
        type="file"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* SEÇÃO 1: UPLOAD EM LOTE */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">1. Novo Upload em Lote (Ocean Park)</h2>
            <p className="text-xs sm:text-sm text-gray-500">Selecione a data e envie arquivos ou pastas organizadas.</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <label className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">Data da Versão:</label>
            <input
              type="date"
              value={dataSelecao}
              onChange={(e) => setDataSelecao(e.target.value)}
              className="px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-bold text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#0c82a0]"
            />
          </div>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-colors cursor-pointer ${
            isDragging
              ? "border-[#0c82a0] bg-[#0c82a0]/5"
              : "border-[#1E293B]/40 hover:border-[#0c82a0] hover:bg-[#0c82a0]/5"
          }`}
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#0c82a0]/10 text-[#0c82a0] rounded-full flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>
          <p className="text-sm sm:text-base text-gray-700 font-bold">
            Arraste as pastas (feed, story, vídeos) ou arquivos aqui
          </p>
          <p className="text-[11px] sm:text-xs text-gray-400 mt-1">
            Classificação automática (Tabelas, Book, Feed, Story e Vídeos). Imagens convertidas para WebP.
          </p>
        </div>

        {novosArquivos.length > 0 && (
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs sm:text-sm font-bold text-gray-700">
                {novosArquivos.length} arquivo(s) pronto(s) para enviar:
              </h3>
              <button
                onClick={() => setNovosArquivos([])}
                className="text-xs text-red-500 hover:underline font-bold cursor-pointer"
              >
                Limpar lista
              </button>
            </div>

            <div className="space-y-2 max-h-56 overflow-y-auto mb-4">
              {novosArquivos.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs bg-gray-50 p-2.5 sm:p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-2 truncate max-w-md">
                    <span className="font-semibold text-gray-700 truncate">{item.file.name}</span>
                    <span className="text-[10px] text-gray-400 shrink-0">
                      ({(item.file.size / (1024 * 1024)).toFixed(1)} MB)
                    </span>
                  </div>

                  {/* Seletor de Categoria Manual Antes do Upload */}
                  <select
                    value={item.categoria}
                    onChange={(e) => {
                      const novaCat = e.target.value;
                      setNovosArquivos((prev) =>
                        prev.map((f, i) => (i === idx ? { ...f, categoria: novaCat } : f))
                      );
                    }}
                    className="px-2 py-1 text-[11px] font-bold uppercase rounded border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-[#0c82a0] cursor-pointer"
                  >
                    <option value="tabela_precos">Tabela de Preços</option>
                    <option value="lamina_pdf">Book / Lâmina PDF</option>
                    <option value="imagem_feed">Imagem Feed</option>
                    <option value="imagem_story">Imagem Story</option>
                    <option value="imagem_avulsa">Imagem Avulsa</option>
                    <option value="video">Vídeo</option>
                    <option value="pacote_zip">Pacote ZIP</option>
                  </select>
                </div>
              ))}
            </div>

            {statusTexto && (
              <p className="text-xs font-bold text-[#0c82a0] mb-2 animate-pulse truncate">
                {statusTexto}
              </p>
            )}

            {uploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-[#0c82a0] h-2.5 rounded-full transition-all duration-300" style={{ width: `${progresso}%` }}></div>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full bg-[#0c82a0] hover:bg-[#096a82] text-white font-bold py-2.5 sm:py-3 text-xs sm:text-sm rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              {uploading ? `Publicando... ${progresso}%` : "Confirmar e Publicar Todos"}
            </button>
          </div>
        )}
      </div>

      {/* SEÇÃO 2: MATERIAIS PUBLICADOS */}
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 pb-4 border-b border-gray-100">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">2. Materiais Publicados</h2>
            <p className="text-xs sm:text-sm text-gray-500">Gerencie ou exclua arquivos hospedados no Firebase Storage.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
            {selecionados.length > 0 && (
              <div className="flex items-center justify-between sm:justify-start gap-2 bg-sky-50 px-3 py-1.5 rounded-lg border border-sky-200 shadow-sm">
                <span className="text-xs font-bold text-[#0c82a0] whitespace-nowrap">
                  {selecionados.length} selecionado(s)
                </span>
                <select
                  onChange={(e) => {
                    if (e.target.value === "editar") handleEditarEmMassa();
                    if (e.target.value === "excluir") handleDeletarEmMassa();
                    e.target.value = "";
                  }}
                  className="px-2 py-1 text-xs border border-gray-300 rounded cursor-pointer bg-white text-gray-700 outline-none hover:border-[#0c82a0]"
                >
                  <option value="">Escolher ação...</option>
                  <option value="editar">Editar Categoria</option>
                  <option value="excluir">Excluir Selecionados</option>
                </select>
              </div>
            )}

            <div className="flex items-center justify-between sm:justify-start gap-2">
              <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">Filtrar Histórico:</span>
              <select
                value={filtroDataAdmin}
                onChange={(e) => {
                  setFiltroDataAdmin(e.target.value);
                  setSelecionados([]);
                }}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-xs font-bold text-gray-700 focus:outline-none bg-white cursor-pointer"
              >
                <option value="todas">Todas as Datas</option>
                {datasDisponiveis.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loadingList ? (
          <p className="text-xs sm:text-sm text-gray-500 text-center py-6">Carregando arquivos do Ocean Park...</p>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0">
            <table className="w-full text-left text-xs text-gray-600 min-w-[600px]">
              <thead className="bg-gray-100 text-gray-700 uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3 w-10 text-center">
                    <input
                      type="checkbox"
                      className="cursor-pointer accent-[#0c82a0] w-4 h-4"
                      checked={
                        itensFiltradosAdmin.length > 0 &&
                        selecionados.length === itensFiltradosAdmin.length
                      }
                      onChange={(e) => toggleSelectAll(e.target.checked, itensFiltradosAdmin)}
                    />
                  </th>
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
                    <td colSpan={6} className="p-6 text-center text-gray-400">
                      Nenhum arquivo publicado até o momento.
                    </td>
                  </tr>
                ) : (
                  itensFiltradosAdmin.map((item) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-gray-50 transition-colors ${
                        selecionados.includes(item.fullPath) ? "bg-sky-50/50" : ""
                      }`}
                    >
                      <td className="p-3 text-center">
                        <input
                          type="checkbox"
                          className="cursor-pointer accent-[#0c82a0] w-4 h-4"
                          checked={selecionados.includes(item.fullPath)}
                          onChange={() => toggleSelect(item.fullPath)}
                        />
                      </td>
                      <td className="p-3 font-semibold text-gray-800 truncate max-w-[180px] sm:max-w-[220px]">
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:underline text-[#0c82a0]">
                          {item.nome}
                        </a>
                      </td>
                      <td className="p-3">
                        <span className="bg-[#0c82a0]/10 text-[#0c82a0] px-2 py-0.5 rounded text-[10px] font-bold uppercase whitespace-nowrap">
                          {item.categoria.replace("_", " ")}
                        </span>
                      </td>
                      <td className="p-3 font-medium text-gray-500 whitespace-nowrap">{item.dataUpload}</td>
                      <td className="p-3 text-gray-400 whitespace-nowrap">{item.tamanho}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleDeletar(item.fullPath)}
                          className="text-red-500 hover:text-red-700 font-bold hover:underline cursor-pointer whitespace-nowrap"
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
