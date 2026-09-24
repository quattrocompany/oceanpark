"use client";

import { useState, useEffect } from "react";
import { formatarDataBrasilia } from "@/lib/utils";

// Evita "CSV injection" ao abrir o arquivo exportado no Excel.
function csvSafe(value: string): string {
  return /^[=+\-@\t\r]/.test(value) ? `'${value}` : value;
}

interface Lead {
  id: string;
  created_at: string;
  nome: string;
  email: string;
  telefone: string;
  mensagem: string;
  origem: string;
}

export default function LeadsInterface() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState("");

  const buscarLeads = async () => {
    setLoading(true);
    setErro("");

    try {
      const res = await fetch("/api/admin/leads");
      const data = await res.json();

      if (res.status === 401) {
        // Sessão expirou ou cookie inválido — volta para a tela de login.
        window.location.replace("/admin");
        return;
      }

      if (!res.ok) {
        throw new Error(data.error || "Erro ao carregar os dados.");
      }

      setLeads(data.leads || []);
    } catch (err: any) {
      setErro(err.message || "Erro de conexão ao carregar os leads.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const exportarCSV = () => {
    if (leads.length === 0) return;

    const cabecalho = ["ID", "Data/Hora (Brasília)", "Nome", "E-mail", "Telefone", "Origem", "Mensagem"];

    const linhas = leads.map((lead) => {
      const dataFormatada = formatarDataBrasilia(lead.created_at);

      return [
        `"${lead.id}"`,
        `"${dataFormatada}"`,
        `"${csvSafe(lead.nome?.replace(/"/g, '""') || "")}"`,
        `"${csvSafe(lead.email?.replace(/"/g, '""') || "")}"`,
        `"${csvSafe(lead.telefone?.replace(/"/g, '""') || "")}"`,
        `"${csvSafe(lead.origem?.replace(/"/g, '""') || "")}"`,
        `"${csvSafe(lead.mensagem?.replace(/\n/g, " ")?.replace(/"/g, '""') || "")}"`,
      ].join(";");
    });

    const conteudoCSV = "﻿" + [cabecalho.join(";"), ...linhas].join("\n");
    const blob = new Blob([conteudoCSV], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `leads_oceanpark_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Leads Ocean Park</h1>
            <p className="text-sm text-gray-500">Total de cadastros: {leads.length}</p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => buscarLeads()}
              disabled={loading}
              className="bg-gray-200 hover:bg-gray-300 disabled:opacity-50 text-gray-700 font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
            >
              {loading ? "Atualizando..." : "Atualizar"}
            </button>
            <button
              onClick={exportarCSV}
              disabled={leads.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-bold px-6 py-2.5 rounded-lg text-sm transition-colors shadow-md cursor-pointer"
            >
              Exportar para Excel (CSV)
            </button>
          </div>
        </div>

        {erro && <p className="text-red-500 text-sm font-medium mb-4">{erro}</p>}

        {loading ? (
          <p className="text-center py-12 text-gray-500 font-medium">Carregando dados...</p>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-100 text-gray-700 uppercase text-xs font-bold border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3">Data/Hora (Brasília)</th>
                  <th className="px-4 py-3">Nome</th>
                  <th className="px-4 py-3">E-mail</th>
                  <th className="px-4 py-3">Telefone</th>
                  <th className="px-4 py-3">Origem</th>
                  <th className="px-4 py-3">Mensagem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">
                      {formatarDataBrasilia(lead.created_at)}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-800 whitespace-nowrap">{lead.nome}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{lead.email}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{lead.telefone}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-md text-xs font-semibold">
                        {lead.origem}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate" title={lead.mensagem}>
                      {lead.mensagem}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
