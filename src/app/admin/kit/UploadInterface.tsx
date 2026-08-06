"use client";

import { useState } from "react";

export default function UploadInterface() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFiles(Array.from(e.target.files));
    }
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) return;
    
    setUploading(true);
    setProgress(0);

    // Simulação do tempo de upload. A agência irá plugar o script de upload real deles (ex: Vercel Blob) aqui depois.
    const interval = setInterval(() => {
      setProgress((old) => {
        if (old >= 100) {
          clearInterval(interval);
          setUploading(false);
          alert("Arquivos enviados com sucesso para o servidor!");
          setSelectedFiles([]);
          return 100;
        }
        return old + 10;
      });
    }, 300);
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Adicionar novos arquivos</h2>
      
      {/* Área de Drag & Drop */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center hover:bg-gray-50 transition-colors relative">
        <input
          type="file"
          multiple
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          title="Selecione vários arquivos"
        />
        <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <p className="text-gray-600 font-medium">Clique ou arraste os arquivos aqui</p>
        <p className="text-xs text-gray-400 mt-2">Suporta .JPG, .PNG, .PDF e .ZIP (Você pode selecionar vários de uma vez)</p>
      </div>

      {/* Lista de Arquivos Selecionados */}
      {selectedFiles.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-bold text-gray-700 mb-3">{selectedFiles.length} arquivo(s) selecionado(s):</h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto mb-6">
            {selectedFiles.map((file, idx) => (
              <li key={idx} className="flex justify-between items-center text-sm bg-gray-50 px-3 py-2 rounded border border-gray-100">
                <span className="truncate text-gray-600 font-medium">{file.name}</span>
                <span className="text-xs text-gray-400">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
              </li>
            ))}
          </ul>

          {uploading && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
              <div className="bg-[#0C82A0] h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
            </div>
          )}

          <button
            onClick={handleUpload}
            disabled={uploading}
            className="w-full sm:w-auto bg-[#DD6810] text-white font-bold py-3 px-8 rounded-lg hover:bg-[#c45a0d] transition-colors disabled:opacity-50"
          >
            {uploading ? `Enviando... ${progress}%` : "Fazer Upload em Lote"}
          </button>
        </div>
      )}
    </div>
  );
}